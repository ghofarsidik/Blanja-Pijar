package controllers

import (
	"fmt"
	"server/src/middlewares"
	"server/src/models"

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
func GetCartByUserId(c *fiber.Ctx) error {
	claims := middlewares.GetUserClaims(c)
	userID := claims["ID"].(float64)
	res := models.GetCartByUserId(uint(userID))
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":    "OK",
		"statusCode": fiber.StatusOK,
		"data":       res,
	})

}
func AddToCart(c *fiber.Ctx) error {
	var request models.AddToCartRequest
	claims := middlewares.GetUserClaims(c)
	userID := uint(claims["ID"].(float64))

	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message":    "Failed to parse request body",
			"statusCode": fiber.StatusBadRequest,
		})
	}

	results, err := models.AddToCart(userID, &request)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message":    fmt.Sprintf("Failed to add to cart, %v", err.Error()),
			"statusCode": fiber.StatusInternalServerError,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message":    "Added to cart successfully",
		"cart":       results,
		"statusCode": fiber.StatusCreated,
	})
}

func DeleteCartItems(c *fiber.Ctx) error {
	claims := middlewares.GetUserClaims(c)
	userID := uint(claims["ID"].(float64))

	var request models.DeleteCartRequest
	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message":    "Failed to parse request body",
			"statusCode": fiber.StatusBadRequest,
		})
	}

	err := models.DeleteCartItems(userID, request.ProductIDs)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message":    fmt.Sprintf("Failed to delete cart items, %v", err.Error()),
			"statusCode": fiber.StatusInternalServerError,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":    "Deleted items successfully",
		"statusCode": fiber.StatusOK,
	})
}