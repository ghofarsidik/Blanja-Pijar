package main

import (
	"log"
	"server/src/configs"

	"server/src/helpers"
	"server/src/routes"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}
	PORT := 3000
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:  "http://localhost:5173",
		AllowMethods:  "GET,POST,PUT,DELETE",
		AllowHeaders:  "*",
		ExposeHeaders: "Content-Length",
	}))
	configs.InitDB()
	helpers.Migration()
	routes.Router(app)
	app.Listen(":" + strconv.Itoa(PORT))
}
