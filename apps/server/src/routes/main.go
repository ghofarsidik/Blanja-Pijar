package routes

import (
	"server/src/controllers"
	"server/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

func Router(app *fiber.App) {
	api := app.Group("/v1")
	auth := api.Group("/auth")
	api.Get("/users", controllers.GetAllUser)
	api.Get("/user", middlewares.JwtMiddleware(), controllers.GetDetailUser)
	api.Post("/refreshToken", controllers.RefreshToken)
	api.Put("/user", middlewares.JwtMiddleware(), controllers.UpdateUser)
	api.Delete("/user/:id", controllers.DeleteUser)

	api.Get("/address", controllers.GetAllAddresses)
	api.Get("/address/:id", controllers.GetDetailAddress)
	api.Post("/address", controllers.CreateAddress)
	api.Put("/address/:id", controllers.UpdateAddress)
	api.Delete("/address/:id", controllers.DeleteAddress)

	api.Get("/products", controllers.GetAllProducts)
	api.Get("/product/:id", controllers.GetDetailProduct)
	api.Post("/product", controllers.CreateProduct)
	api.Put("/product/uploadServer/:id", controllers.UploadImageProductServer)
	api.Put("/product/upload/:id", controllers.UploadImageProduct)
	api.Put("/product/:id", controllers.UpdateProduct)
	api.Delete("/product/:id", controllers.DeleteProduct)

	api.Get("/categories", controllers.GetAllCategories)
	api.Get("/category/:id", controllers.GetDetailCategory)
	api.Post("/category", controllers.CreateCategory)
	api.Put("/category/:id", controllers.UpdateCategory)
	api.Put("/category/upload/:id", controllers.UploadImageCategory)
	api.Delete("/category/:id", controllers.DeleteCategory)

	api.Get("/stores", controllers.GetAllStore)
	api.Get("/store/:id", controllers.GetDetailStore)
	api.Post("/store", middlewares.JwtMiddleware(), controllers.CreateStore)
	api.Put("/store/:id", controllers.UpdateStore)
	// api.Put("/store/upload/:id", controllers.UploadImagestore)
	api.Delete("/store/:id", controllers.DeleteStore)

	auth.Post("/register", controllers.RegisterUser)
	auth.Post("/login", controllers.LoginUser)
}
