package controllers

import (
	"server/src/models"

	"github.com/gofiber/fiber/v2"
)

func GetAllCategories(c *fiber.Ctx) error{
	categories := models.GetAllCategories()
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data":categories,
		"message": "Successfully retrieved all users",
	})
}
