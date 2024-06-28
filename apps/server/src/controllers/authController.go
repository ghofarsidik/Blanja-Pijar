package controllers

import (
	"fmt"
	"log"
	"os"
	"server/src/helpers"
	"server/src/models"
	"server/src/services"

	"github.com/gofiber/fiber/v2"
	"github.com/mitchellh/mapstructure"
	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(c *fiber.Ctx) error {
	var input map[string]interface{}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message":    "Failed to parse request body",
			"statusCode": fiber.StatusBadRequest,
		})
	}
	input = helpers.XssMiddleware(input)
	var newUser models.User
	mapstructure.Decode(input, &newUser)

	errors := helpers.ValidateStruct(newUser)
	if len(errors) > 0 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(errors)
	}
	user, _ := models.GetUserByEmail(newUser.Email)
	if user.Email != "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message":    fmt.Sprintf("User with email %v already exist", newUser.Email),
			"statusCode": fiber.StatusNotAcceptable,
		})
	}
	err := helpers.ValidatePassword(newUser.Password)
	if err != nil {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{
			"message":    err.Error(),
			"statusCode": fiber.StatusNotAcceptable,
		})
	}
	hashPassword, _ := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
	newUser.Password = string(hashPassword)
	token, err := services.GenerateToken()
	if err != nil {
		log.Fatalf("Failed to generate token: %v", err)
	}
	err = services.SendVerificationEmail(newUser.Name, newUser.Email, token)
	if err != nil {
		log.Fatalf("Failed to send verification email: %v", err)
	}
	if err := models.CreateUser(&newUser); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message":    fmt.Sprintf("Failed to create new user, %v", err.Error()),
			"statusCode": fiber.StatusInternalServerError,
		})
	}
	verification := models.UserVerification{
		UserID: uint64(newUser.ID),
		Token:  token,
	}
	if err := models.VerifyUser(&verification); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to create user verification",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message":    "Register successfully, please check your email for verification",
		"statusCode": fiber.StatusCreated,
	})
}

func VerifyEmail(c *fiber.Ctx) error {
	token := c.Params("token")
	isExist, err := models.CheckUsersVerification(token)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "You have already verified",
		})
	}
	if err := models.UpdateAccountVerification(uint(isExist.UserID)); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to update account verification",
			"error":   err.Error(),
		})
	}
	if err := models.DeleteUsersVerification(isExist.ID, token); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to delete account verification",
			"error":   err.Error(),
		})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Account verification successfully",
	})
}

func LoginUser(c *fiber.Ctx) error {
	var input models.User

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"statusCode": fiber.StatusBadRequest,
			"message":    "Failed to parse request body",
		})
	}
	user, err := models.GetUserByEmail(input.Email)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"statusCode": fiber.StatusNotFound,
			"message":    "Email unregistered",
		})
	}
	if !user.IsVerified {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{
			"statusCode": fiber.StatusNotAcceptable,
			"message":    "Your account is not verified",
		})
	}
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"statusCode": fiber.StatusUnauthorized,
			"message":    "Incorrect password",
		})
	}
	jwtKey := os.Getenv("JWT_KEY")
	payload := map[string]interface{}{
		"ID":   user.ID,
		"role": user.Role,
	}
	token, err := helpers.GenerateToken(jwtKey, payload)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"statusCode": fiber.StatusInternalServerError,
			"message":    "Failed to generate Token",
		})
	}
	refreshToken, err := helpers.GenerateRefreshToken(jwtKey, payload)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":      "Could not generate refresh token",
			"statusCode": fiber.StatusInternalServerError,
		})
	}
	item := map[string]interface{}{
		"Token":        token,
		"RefreshToken": refreshToken,
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"statusCode": fiber.StatusOK,
		"message":    "Login successful",
		"data":       item,
	})
}
func RefreshToken(c *fiber.Ctx) error {
	var input struct {
		RefreshToken string `json:"refreshToken"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":      "Failed to parse request body",
			"statusCode": fiber.StatusBadRequest,
		})
	}

	jwtKey := os.Getenv("JWT_KEY")
	token, err := helpers.GenerateToken(jwtKey, map[string]interface{}{"refreshToken": input.RefreshToken})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":      "Could not generate access token",
			"statusCode": fiber.StatusInternalServerError,
		})
	}

	refreshToken, err := helpers.GenerateRefreshToken(jwtKey, map[string]interface{}{"refreshToken": input.RefreshToken})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":      "Could not generate refresh token",
			"statusCode": fiber.StatusInternalServerError,
		})
	}
	item := map[string]string{
		"Token":        token,
		"RefreshToken": refreshToken,
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"statusCode": fiber.StatusCreated,
		"message":    "Refresh successfully",
		"data":       item,
	})
}
