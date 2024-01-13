package route

import (
	"github.com/JonathanMaverickTPA_Web/controller"
	"github.com/gin-gonic/gin"
)

func UserRoute(r *gin.Engine) {
	user := r.Group("/user")
	{
		user.GET("/", controller.GetUsers)
		user.GET("/:userId", controller.GetUser)
		user.POST("/", controller.CreateUser)
	}
}