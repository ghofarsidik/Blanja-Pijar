package controllers

import (
	"fmt"
	"server/src/helpers"
	"server/src/models"
	"server/src/services"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetAllCategories(c *fiber.Ctx) error {
	categories := models.GetAllCategories()
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data":       categories,
		"message":    "Successfully retrieved all users",
		"statusCode": fiber.StatusOK,
	})
}

func GetDetailCategory(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	detailCategory := models.GetDetailCategory(id)
	if detailCategory.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message":    "Category not found",
			"statusCode": fiber.StatusNotFound,
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":    "Success retrived category",
		"data":       detailCategory,
		"statusCode": fiber.StatusOK,
	})

}

func GetNameCategory(c *fiber.Ctx) error {
	name := c.Query("name")
	category := models.GetNameCategory(name)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Successfully retrieved Category",
		"data":    category,
	})
}

func CreateCategory(c *fiber.Ctx) error {
	var newCategory models.Category
	if err := c.BodyParser(&newCategory); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message":    "Invalid request body",
			"statusCode": fiber.StatusBadRequest,
		})
	}
	models.CreateCategory(&newCategory)
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message":    "Category has been created",
		"statusCode": fiber.StatusOK,
	})
}

func UpdateCategory(c *fiber.Ctx) error {
	var newCategory models.Category
	id, _ := strconv.Atoi(c.Params("id"))
	if err := c.BodyParser(&newCategory); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"statusCode": fiber.StatusBadRequest,
			"message":    "Invalid request body",
		})
	}
	err := models.UpdateCategory(id, &newCategory)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"statusCode": fiber.StatusInternalServerError,
			"message":    fmt.Sprintf("Failed to update category with ID %d", id),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"statusCode": fiber.StatusOK,
		"message":    fmt.Sprintf("Success to update category with ID %d", id),
	})
}

func DeleteCategory(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	err := models.DeleteCategory(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"statusCode": fiber.StatusInternalServerError,
			"message":    fmt.Sprintf("Failed to delete category with ID %d", id),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": fmt.Sprintf("Category with ID %d deleted successfully", id),
	})
}

func UploadImageCategory(c *fiber.Ctx) error {
	file, err := c.FormFile("file")
	id, _ := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": fmt.Sprintf("Gagal mengunggah file %v", err.Error()),
		})
	}
	maxFileSize := int64(2 << 20)
	validate := helpers.ValidateFile()
	sizeValidate := validate["SizeUploadValidation"].(func(int64, int64) error)
	if err := sizeValidate(file.Size, maxFileSize); err != nil {
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
	validFileTypes := []string{"image/png", "image/jpeg", "image/jpg", "application/pdf"}
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

	if err := models.UploadPhotoCategory(id, uploadPhoto); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Gagal mengunggah file" + err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":    fmt.Sprintf("Sukses mengunggah photo product dengan ID %d", id),
		"statusCode": fiber.StatusOK,
	})
}
