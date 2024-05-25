package controllers

import (
	"fmt"
	"server/src/helpers"
	"server/src/middlewares"
	"server/src/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetAllStore(c *fiber.Ctx) error {
	store := models.GetAllStore()
	count := helpers.CountData("stores")
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Successfully retrieved all store",
		"data":    store,
		"count":   count,
	})
}

func GetDetailStore(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	foundStore := models.GetDetailStore(id)
	if foundStore.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Store not found",
		})
	}
	return c.JSON(foundStore)
}

func CreateStore(c *fiber.Ctx) error {
	claims := middlewares.GetUserClaims(c)
	if claims == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Tidak dapat mengakses",
		})
	}
	fmt.Println("claims", claims)
	userRole := claims["role"]
	userID := claims["ID"].(float64)

	if userRole != "seller" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Anda login sebagai customer tidak diperbolehkan untuk membuat store",
			"role":    userRole,
		})
	}
	var newStore models.Store
	if err := c.BodyParser(&newStore); err != nil {
		c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid request body",
		})
		return err
	}
	createStore := map[string]interface{}{
		"name":        newStore.Name,
		"description": newStore.Description,
		"address":     newStore.Address,
		"user_id":     uint(userID),
	}
	models.CreateStore(createStore)
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "success created new store",
	})
}

func UpdateStore(c *fiber.Ctx) error {
	var newStore models.Store
	id, _ := strconv.Atoi(c.Params("id"))
	if err := c.BodyParser(&newStore); err != nil {
		c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
		return err
	}

	err := models.UpdateStore(id, &newStore)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": fmt.Sprintf("Failed to update store with ID %d", id),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": fmt.Sprintf("Successfully updated store with ID %d", id),
	})
}

func DeleteStore(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	err := models.DeleteStore(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": fmt.Sprintf("Failed to delete store with ID %d", id),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": fmt.Sprintf("Successfully deleted store with ID %d", id),
	})
}
