package main

import (
	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/controller"
	_ "github.com/JonathanMaverickTPA_Web/docs"
	"github.com/gin-gonic/gin"
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
// @BasePath  /api/v1

// @externalDocs.description  OpenAPI
// @externalDocs.url          https://swagger.io/resources/open-api/
func main() {

	r := gin.Default()
	db := config.Connect()
	
	user := r.Group("/user")
	{
		user.GET("/", func(c *gin.Context) {
			controller.GetUsers(db, c)
		})
		user.POST("/", func(c *gin.Context) {
			controller.PostUser(db, c)
		})
	}
	
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	r.Run(":8080")
}