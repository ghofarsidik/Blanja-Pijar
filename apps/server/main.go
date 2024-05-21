package main

import (
	"fmt"
	"log"
	"server/src/configs"
	_"server/src/helpers"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}
	PORT := 3000
	app := fiber.New()
	app.Get("/api", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": fmt.Sprintf("Server running on port %d", PORT),
		})
	})
	configs.InitDB()
	// helpers.Migration()
	app.Listen(":" + strconv.Itoa(PORT))
}
