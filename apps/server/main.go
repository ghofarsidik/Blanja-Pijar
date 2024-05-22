package main

import (
	"log"
	"server/src/configs"
	_ "server/src/helpers"
	"server/src/routes"
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
	configs.InitDB()
	// helpers.Migration()
	routes.Router(app)
	app.Listen(":" + strconv.Itoa(PORT))
}
