package main

import (
	"log"
	"os"
	"server/src/configs"
	"server/src/helpers"
	"server/src/services"

	"server/src/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func getPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	return "0.0.0.0:" + port
}

func main() {
	if _, err := os.Stat(".env"); err == nil {
		if err := godotenv.Load(); err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	app := fiber.New()

	// CORS middleware configuration
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "https://blanja-kelompok-1.vercel.app",
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders:     "*",
		ExposeHeaders:    "Content-Length",
		AllowCredentials: true,
	}))

	configs.InitDB()
	services.InitMidtrans()
	helpers.Migration()
	routes.Router(app)

	// Log error if app fails to listen
	if err := app.Listen(getPort()); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
