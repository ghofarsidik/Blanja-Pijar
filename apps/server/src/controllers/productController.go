package controllers

import (
	"fmt"
	"math"
	"server/src/helpers"
	"server/src/models"
	"server/src/services"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func GetAllProducts(c *fiber.Ctx) error {
	keyword := c.Query("search")
	pageOld := c.Query("page")
	limitOld := c.Query("limit")
	page, _ := strconv.Atoi(pageOld)
	limit, _ := strconv.Atoi(limitOld)
	sort := c.Query("sort")
	sortBy := c.Query("orderBy")
	if page == 0 {
		page = 1
	}
	if limit == 0 {
		limit = 5
	}
	offset := (page - 1) * limit
	if sort == "" {
		sort = "ASC"
	}
	if sortBy == "" {
		sortBy = "name"
	}
	sort = sortBy + " " + strings.ToLower(sort)
	products := models.GetAllProducts(sort, keyword, limit, offset)
	count := helpers.CountData("products")
	totalPage := math.Ceil(float64(count) / float64(limit))
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":   "Successfully retrieved all products",
		"data":      products,
		"totalData": count,
		"totalPage": totalPage,
		"limit":     limit,
		"page":      page,
	})
}
func FilterProducts(c *fiber.Ctx) error {
	filter := c.Query("condition")
	pageOld := c.Query("page")
	limitOld := c.Query("limit")
	page, _ := strconv.Atoi(pageOld)
	limit, _ := strconv.Atoi(limitOld)
	if page == 0 {
		page = 1
	}
	if limit == 0 {
		limit = 5
	}
	offset := (page - 1) * limit
	products := models.FilterProducts(filter, limit, offset)
	// fmt.Println("product", products)
	count := helpers.CountData("products")
	totalPage := math.Ceil(float64(count) / float64(limit))
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":   "Successfully retrieved all products",
		"data":      products,
		"totalData": count,
		"totalPage": totalPage,
		"limit":     limit,
		"page":      page,
	})
}

func GetDetailProduct(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	foundProduct := models.GetDetailProduct(id)
	if foundProduct == nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Product not found",
		})
	}
	return c.JSON(foundProduct)
}

func CreateProduct(c *fiber.Ctx) error {
	var newProduct models.Product
	if err := c.BodyParser(&newProduct); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message":    "Invalid request body",
			"statusCode": fiber.StatusBadRequest,
		})
	}
	if err := models.CreateProduct(&newProduct); err != nil {
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

func UpdateProduct(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	var updatedProduct models.Product
	if err := c.BodyParser(&updatedProduct); err != nil {
		c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
		return err
	}

	err := models.UpdateProduct(id, &updatedProduct)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": fmt.Sprintf("Failed to update product with ID %d", id),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": fmt.Sprintf("Product with ID %d updated successfully", id),
	})
}

func DeleteProduct(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	err := models.DeleteProduct(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": fmt.Sprintf("Failed to delete product with ID %d", id),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": fmt.Sprintf("Product with ID %d deleted successfully", id),
	})
}
func UploadImageProductServer(c *fiber.Ctx) error {
	file, err := c.FormFile("file")
	id, _ := strconv.Atoi(c.Params("id"))
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
		"image":      uploadResult.URL,
		"product_id": id,
	}
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := models.UploadPhotoProduct(uploadPhoto); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Gagal mengunggah file" + err.Error(),
			"image":   uploadPhoto,
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":    fmt.Sprintf("Sukses mengunggah photo product dengan ID %d", id),
		"statusCode": fiber.StatusOK,
	})
}
