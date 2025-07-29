package main

import (
	"fmt"
	"log"
	"os"

	"github.com/amavis442/til-frontend/internal/config"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	config.LoadEnv()

	port := fmt.Sprint(os.Getenv("PORT"))
	if port == "" {
		port = "3000"
	}

	log.Printf("Frontend server running at http://localhost:%s", port)

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*", // Or specify like "http://localhost:8080"
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Use(logger.New(logger.Config{
		Format:     "${pid} ${status} - ${method} ${path}\n",
		TimeFormat: "02-Jan-2006",
		TimeZone:   "Europe/Amsterdam",
	}))

	dir, _ := os.Getwd()
	log.Printf("Workdir is %s", dir)

	app.Static("/", "./build")

	app.Get("/*", func(c *fiber.Ctx) error {
		return c.SendFile("./build/index.html")
	})

	log.Fatal(app.Listen(":" + port))
}
