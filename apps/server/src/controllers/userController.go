package controllers

import (
	"fmt"
	"server/src/helpers"
	"server/src/middlewares"
	"server/src/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/mitchellh/mapstructure"
	"golang.org/x/crypto/bcrypt"
)

func GetAllUser(c *fiber.Ctx) error {
	users := models.GetAllUser()
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Successfully retrieved all users",
		"data":    users,
	})
}

func GetDetailUser(c *fiber.Ctx) error {
	claims := middlewares.GetUserClaims(c)
	if claims == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Tidak dapat mengakses",
		})
	}
	userId := claims["ID"]
	foundUser := models.GetDetailUser(userId)
	if foundUser.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "User not found",
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data":    foundUser,
		"message": "Successfully found",
	})
}

func UpdateUser(c *fiber.Ctx) error {
	claims := middlewares.GetUserClaims(c)
	userID := claims["ID"].(float64)
	var input map[string]interface{}
	if err := c.BodyParser(&input); err != nil {
		c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
		return err
	}
	input = helpers.XssMiddleware(input)
	var updateUser models.User
	mapstructure.Decode(input, &updateUser)

	errors := helpers.ValidateStruct(updateUser)
	if len(errors) > 0 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(errors)
	}
	user, _ := models.GetUserByEmail(updateUser.Email)
	if input["email"] != user.Email {
		if user.Email != "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": fmt.Sprintf("User with email %v already exist", updateUser.Email),
			})
		}
	}
	if input["password"] != "" {
		err := helpers.ValidatePassword(updateUser.Password)
		if err != nil {
			return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{
				"message": err.Error(),
			})
		}
		hashPassword, _ := bcrypt.GenerateFromPassword([]byte(updateUser.Password), bcrypt.DefaultCost)
		updateUser.Password = string(hashPassword)
	}

	err := models.UpdateUser(uint(userID), &updateUser)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": fmt.Sprintf("Failed to update user with ID %d", user.ID),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": fmt.Sprintf("User with ID %d updated successfully", user.ID),
	})
}

func DeleteUser(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	err := models.DeleteUser(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": fmt.Sprintf("Failed to delete user with ID %d", id),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": fmt.Sprintf("Success to delete user with ID %d", id),
	})
}
