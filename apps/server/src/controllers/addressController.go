package controllers

import (
	"fmt"
	"server/src/helpers"
	"server/src/middlewares"
	"server/src/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetAllAddresses(c *fiber.Ctx) error {
	address := models.GetAllAddress()
	count := helpers.CountData("addresses")
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Successfully retrieved all user address",
		"data":    address,
		"count":   count,
	})
}

func GetDetailAddress(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	foundAddress := models.GetDetailAddress(id)
	if foundAddress.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Address not found",
		})
	}
	return c.JSON(foundAddress)
}

func GetPrimaryAddress(c *fiber.Ctx) error {
	claims := middlewares.GetUserClaims(c)
	id := claims["ID"].(float64)
	address, err := models.GetPrimaryAddress(uint(id))
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Address not found",
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Successfully get primary address",
		"data":    address,
	})
}

func CreateAddress(c *fiber.Ctx) error {
	claims := middlewares.GetUserClaims(c)
	id := claims["ID"].(float64)
	var newAddress models.Address
	if err := c.BodyParser(&newAddress); err != nil {
		c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message":    "invalid request body",
			"statusCode": fiber.StatusBadRequest,
		})
		return err
	}
	fmt.Println("primary", newAddress.PrimaryAddress)
	if newAddress.PrimaryAddress {
		isPrimary, err := models.GetPrimaryAddress(uint(id))
		if err == nil {
			deletePrimary := models.Address{
				PrimaryAddress: false,
			}
			if err := models.UpdatePrimaryAddress(int(isPrimary.ID), &deletePrimary); err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"error": err.Error(),
				})
			}
		}
	}
	createAddress := models.Address{
		UserID:         uint(id),
		Label:          newAddress.Label,
		Address:        newAddress.Address,
		ReceivedName:   newAddress.ReceivedName,
		ContactNumber:  newAddress.ContactNumber,
		PostalCode:     newAddress.PostalCode,
		City:           newAddress.City,
		PrimaryAddress: newAddress.PrimaryAddress,
		Latitude:       newAddress.Latitude,
		Longitude:      newAddress.Longitude,
	}
	addressExist := models.GetAddressByNameAndAddress(newAddress.ReceivedName, newAddress.Address, uint(newAddress.UserID))
	if addressExist.ID != 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Address already exists",
		})
	}
	models.CreateAddress(&createAddress)
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "success created new address",
		// "data":    newAddress,
	})
}

func UpdateAddress(c *fiber.Ctx) error {
	var newAddress models.Address
	id, _ := strconv.Atoi(c.Params("id"))
	claims := middlewares.GetUserClaims(c)
	userId := claims["ID"].(float64)
	if err := c.BodyParser(&newAddress); err != nil {
		c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
		return err
	}
	if newAddress.PrimaryAddress {
		isPrimary, err := models.GetPrimaryAddress(uint(userId))
		if err == nil {
			deletePrimary := models.Address{
				PrimaryAddress: false,
			}
			if err := models.UpdatePrimaryAddress(int(isPrimary.ID), &deletePrimary); err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"error": err.Error(),
				})
			}
		}
	}
	err := models.UpdateAddress(id, &newAddress)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": fmt.Sprintf("Failed to update user address with ID %d", id),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": fmt.Sprintf("Successfully updated user address with ID %d", id),
	})
}

func DeleteAddress(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	err := models.DeleteAddress(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": fmt.Sprintf("Failed to delete user address with ID %d", id),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": fmt.Sprintf("Successfully deleted user address with ID %d", id),
	})
}
