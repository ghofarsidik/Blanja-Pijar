package controllers

import (
	"server/src/models"

	"github.com/gofiber/fiber/v2"
)

func GetAllUser(c *fiber.Ctx) error {
	users := models.GetAllUser()
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Successfully retrieved all users",
		"data":    users,
	})
}
