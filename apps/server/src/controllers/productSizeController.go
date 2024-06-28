package controllers

import (
	"server/src/models"

	"github.com/gofiber/fiber/v2"
)

func GetAllSize(c *fiber.Ctx) error {
	sizes := models.GetAllSize()
	// count := helpers.CountData("product_color")
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Successfully retrieved all size",
		"data":    sizes,
		// "count":   count,
	})
}

func CreateProductSize(c *fiber.Ctx) error {
	var newProductSize []models.ProductSize
	if err := c.BodyParser(&newProductSize); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message":    "Invalid request body",
			"statusCode": fiber.StatusBadRequest,
		})
	}
	if err := models.CreateSizeProduct(newProductSize); err != nil {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{
			"message":    err.Error(),
			"statusCode": fiber.StatusNotAcceptable,
		})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message":     "Product size created successfully",
		"statusCoded": fiber.StatusOK,
	})
}
