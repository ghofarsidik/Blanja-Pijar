package controllers

import (
	"fmt"
	"os"
	"server/src/helpers"
	"server/src/models"

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
	if err := models.CreateUser(&newUser); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message":    fmt.Sprintf("Failed to create new user, %v", err.Error()),
			"statusCode": fiber.StatusInternalServerError,
		})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message":    "Register successfully",
		"statusCode": fiber.StatusCreated,
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
