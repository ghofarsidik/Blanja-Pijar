package routes

import (
	"server/src/controllers"

	"github.com/gofiber/fiber/v2"
)

func Router(app *fiber.App) {
	api := app.Group("/v1")
	auth := api.Group("/auth")
	api.Get("/users", controllers.GetAllUser)

	api.Get("/categories", controllers.GetAllCategories)

	auth.Post("/register", controllers.RegisterUser)
	auth.Post("/login", controllers.LoginUser)
}
