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
	api.Get("/category/:id", controllers.GetDetailCategory)
	api.Post("/category", controllers.CreateCategory)
	api.Put("/category/:id", controllers.UpdateCategory)
	api.Put("/category/upload/:id", controllers.UploadImageCategory)
	api.Delete("/category/:id", controllers.DeleteCategory)

	auth.Post("/register", controllers.RegisterUser)
	auth.Post("/login", controllers.LoginUser)
}
