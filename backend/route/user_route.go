package route

import (
	"github.com/JonathanMaverickTPA_Web/controller"
	"github.com/JonathanMaverickTPA_Web/middleware"
	"github.com/gin-gonic/gin"
)

func UserRoute(r *gin.Engine) {
	user := r.Group("/user")
	{
		user.GET("/", controller.GetUsers)
		user.GET("/:userId", controller.GetUser)
		user.POST("/", controller.CreateUser)

		user.POST("/login", controller.Login)
		user.POST("/authenticate",middleware.RequireAuthentication, controller.Authenticate)

		user.POST("/request-otp", controller.RequestOTP)
		user.POST("/login-otp", controller.LoginOTP)

		user.POST("/get-user-security-question", controller.GetUserSecurityQuestion)
		user.POST("/validate-security-question", controller.ValidateSecurityAnswer)
		user.POST("/change-password", controller.ChangePassword)
	}
}