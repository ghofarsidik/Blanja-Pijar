package controllers

import (
	"fmt"
	"server/src/helpers"
	"server/src/middlewares"
	"server/src/models"
	"server/src/services"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/mitchellh/mapstructure"
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

	user, _ := models.GetUserByEmail(updateUser.Email)
	if input["email"] != user.Email {
		if user.Email != "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": fmt.Sprintf("User with email %v already exist", updateUser.Email),
			})
		}
	}
	// if input["password"] != "" {
	// 	err := helpers.ValidatePassword(updateUser.Password)
	// 	if err != nil {
	// 		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{
	// 			"message": err.Error(),
	// 		})
	// 	}
	// 	hashPassword, _ := bcrypt.GenerateFromPassword([]byte(updateUser.Password), bcrypt.DefaultCost)
	// 	updateUser.Password = string(hashPassword)
	// }
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

func UploadPhotoUser(c *fiber.Ctx) error {
	file, err := c.FormFile("file")
	claims := middlewares.GetUserClaims(c)
	userID := claims["ID"].(float64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": fmt.Sprintf("Gagal mengunggah file %v", err.Error()),
		})
	}
	maxSizeFile := int64(2 << 20)
	validate := helpers.ValidateFile()
	sizeValidate := validate["SizeUploadValidation"].(func(int64, int64) error)
	if err := sizeValidate(file.Size, maxSizeFile); err != nil {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{
			"statusCode": fiber.StatusNotAcceptable,
			"message":    "Ukuran file melebihi 2MB",
		})
	}
	fileHeader, err := file.Open()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Gagal membuka file: " + err.Error())
	}
	defer fileHeader.Close()
	buffer := make([]byte, 512)
	if _, err := fileHeader.Read(buffer); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Gagal membaca file: " + err.Error())
	}
	typeValidate := validate["TypeUploadValidation"].(func([]byte, []string) error)
	validFileTypes := []string{"image/png", "image/jpeg", "image/jpg", "application/pdf", "image/webp"}
	if err := typeValidate(buffer, validFileTypes); err != nil {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{
			"statusCode": fiber.StatusNotAcceptable,
			"message":    "Format file harus png, jpeg, jpg, pdf dan webp",
		})
	}

	uploadResult, err := services.UploadCloudinary(c, file)
	uploadPhoto := map[string]interface{}{
		"Image": uploadResult.URL,
	}
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := models.UploadPhotoUser(uint(userID), uploadPhoto); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Gagal mengunggah file" + err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":    fmt.Sprintf("Sukses mengunggah photo"),
		"statusCode": fiber.StatusOK,
	})
}
