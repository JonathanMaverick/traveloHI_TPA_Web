package main

import (
	"fmt"
	"net/http"

	"github.com/JonathanMaverickTPA_Web/config"
	_ "github.com/JonathanMaverickTPA_Web/docs"
	"github.com/JonathanMaverickTPA_Web/route"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title           TPA-Website
// @version         1.0
// @description    	VK TPA Website API Documentation
// @termsOfService  http://swagger.io/terms/

// @contact.name   API Support
// @contact.url    http://www.swagger.io/support
// @contact.email  support@swagger.io

// @license.name  Apache 2.0
// @license.url   http://www.apache.org/licenses/LICENSE-2.0.html

// @host      localhost:8080

// @externalDocs.description  OpenAPI
// @externalDocs.url          https://swagger.io/resources/open-api/
func main() {
	r := gin.Default()
	config.Connect()

	if err := godotenv.Load(); err != nil {
        fmt.Println("Error loading .env file")
        return
    }

	// Seeding Backup >//<
	// seed.Seed()

	opts := cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowCredentials: true,
	}

	handler := cors.New(opts).Handler(r)

	route.UserRoute(r)
	route.HotelRoute(r)
	route.RoomRoute(r)
	route.FlightRoute(r)

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	http.ListenAndServe(":8080", handler)
}
