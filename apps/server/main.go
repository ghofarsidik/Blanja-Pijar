package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"server/src/configs"
	"server/src/services"

	"server/src/helpers"
	"server/src/routes"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"golang.ngrok.com/ngrok"
	"golang.ngrok.com/ngrok/config"
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
	services.InitMidtrans()
	helpers.Migration()
	routes.Router(app)
	app.Listen(":" + strconv.Itoa(PORT))

}
func run(ctx context.Context) error {
	listener, err := ngrok.Listen(ctx,
		config.HTTPEndpoint(),
		ngrok.WithAuthtokenFromEnv(),
	)
	if err != nil {
		return err
	}

	log.Println("App URL", listener.URL())
	return http.Serve(listener, http.HandlerFunc(handler))
}

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "<h1>Hello from ngrok-go!</h1>")
}
