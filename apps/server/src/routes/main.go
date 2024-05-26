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
	api.Put("/user", middlewares.JwtMiddleware(), controllers.UploadPhotoUser)
	api.Put("/user", middlewares.JwtMiddleware(), controllers.UpdateUser)
	api.Delete("/user/:id", controllers.DeleteUser)

	api.Get("/address", controllers.GetAllAddresses)
	api.Get("/address/:id", controllers.GetDetailAddress)
	api.Post("/address", middlewares.JwtMiddleware(), controllers.CreateAddress)
	api.Put("/address/:id", middlewares.JwtMiddleware(), controllers.UpdateAddress)
	api.Delete("/address/:id", controllers.DeleteAddress)

	api.Get("/products", controllers.GetAllProducts)
	api.Get("/products/filter", controllers.FilterProducts)
	api.Get("/product/:id", controllers.GetDetailProduct)
	api.Post("/product", middlewares.JwtMiddleware(), middlewares.ValidateSellerRole(), controllers.CreateProduct)
	api.Post("/product/uploadServer/:id", middlewares.JwtMiddleware(), controllers.UploadImageProductServer)
	api.Put("/product/:id", middlewares.JwtMiddleware(), middlewares.ValidateSellerRole(), controllers.UpdateProduct)
	api.Delete("/product/:id", middlewares.JwtMiddleware(), middlewares.ValidateSellerRole(), controllers.DeleteProduct)

	api.Get("/color", controllers.GetAllColors)
	api.Post("/color", controllers.CreateProductColor)

	api.Get("/categories", controllers.GetAllCategories)
	api.Get("/category/:id", controllers.GetDetailCategory)
	api.Post("/category", controllers.CreateCategory)
	api.Put("/category/:id", controllers.UpdateCategory)
	api.Put("/category/upload/:id", controllers.UploadImageCategory)
	api.Delete("/category/:id", controllers.DeleteCategory)

	api.Get("/stores", controllers.GetAllStore)
	api.Get("/store/:id", controllers.GetDetailStore)
	api.Post("/store", middlewares.JwtMiddleware(), middlewares.ValidateSellerRole(), controllers.CreateStore)
	api.Put("/store/:id", middlewares.JwtMiddleware(), middlewares.ValidateSellerRole(), controllers.UpdateStore)
	api.Delete("/store/:id", middlewares.JwtMiddleware(), middlewares.ValidateSellerRole(), controllers.DeleteStore)

	api.Get("/carts", controllers.GetAllCarts)
	api.Get("/cart", middlewares.JwtMiddleware(), controllers.GetCartByUserId)
	api.Post("/cart", middlewares.JwtMiddleware(), controllers.AddToCart)
	api.Get("/carts/details", controllers.GetAllCartDetails)

	auth.Post("/register", controllers.RegisterUser)
	auth.Post("/login", controllers.LoginUser)
}
