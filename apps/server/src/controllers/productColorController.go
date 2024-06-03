package controllers

import (
	"server/src/models"

	"github.com/gofiber/fiber/v2"
)

func GetAllColors(c *fiber.Ctx) error {
	colors := models.GetAllColors()
	// count := helpers.CountData("product_color")
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Successfully retrieved all color",
		"data":    colors,
		// "count":   count,
	})
}

func CreateProductColor(c *fiber.Ctx) error {
	var newProductColor models.ProductColor
	if err := c.BodyParser(&newProductColor); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message":    "Invalid request body",
			"statusCode": fiber.StatusBadRequest,
		})
	}
	if err := models.CreateProductColor(&newProductColor); err != nil {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{
			"message":    err.Error(),
			"statusCode": fiber.StatusNotAcceptable,
		})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message":     "Product created successfully",
		"statusCoded": fiber.StatusOK,
	})
}
