package main

import (
	"log"
	"os"
	"server/src/configs"
	"server/src/services"

	"server/src/helpers"
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
	// PORT := 3000
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:  "https://blanja-kelompok-1.vercel.app",
		AllowMethods:  "GET,POST,PUT,DELETE",
		AllowHeaders:  "*",
		ExposeHeaders: "Content-Length",
	}))
	configs.InitDB()
	services.InitMidtrans()
	helpers.Migration()
	routes.Router(app)
	app.Listen(getPort())

}

// func run(ctx context.Context) error {
// 	listener, err := ngrok.Listen(ctx,
// 		config.HTTPEndpoint(),
// 		ngrok.WithAuthtokenFromEnv(),
// 	)
// 	if err != nil {
// 		return err
// 	}

// 	log.Println("App URL", listener.URL())
// 	return http.Serve(listener, http.HandlerFunc(handler))
// }

// func handler(w http.ResponseWriter, r *http.Request) {
// 	fmt.Fprintln(w, "<h1>Hello from ngrok-go!</h1>")
// }
