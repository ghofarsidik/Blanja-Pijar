package controllers

import (
	"server/src/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetAllCarts(c *fiber.Ctx) error {
	carts := models.GetAllCarts()
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"statusCode": fiber.StatusOK,
		"message":    "Successfully retrieved all carts",
		"data":       carts,
	})
}
func GetAllCartDetails(c *fiber.Ctx) error {
	carts_details := models.GetAllCartDetails()
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"statusCode": fiber.StatusOK,
		"message":    "Successfully retrieved all carts_details",
		"data":       carts_details,
	})
}

func AddToCart(c *fiber.Ctx) error {
	var addToCartRequest models.AddToCartRequest
	if err := c.BodyParser(&addToCartRequest); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message":    "invalid request body",
			"statusCode": fiber.StatusBadRequest,
		})
	}

	results, err := models.AddToCart(addToCartRequest)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"cart": results,
	})
}

func UpdateCartQuantity(c *fiber.Ctx) error {
	userID, err := strconv.Atoi(c.Params("user_id"))

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid user ID",
		})
	}

	productID, err := strconv.Atoi(c.Params("product_id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid product ID",
		})
	}

	quantityChange, err := strconv.Atoi(c.Params("quantity_change"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid quantity change",
		})
	}

	results, err := models.UpdateCartQuantity(uint(userID), uint(productID), quantityChange)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"cart": results,
	})
}
