package route

import (
	"github.com/JonathanMaverickTPA_Web/controller"
	"github.com/gin-gonic/gin"
)

func FlightTransactionRoute(r *gin.Engine) {
	flight := r.Group("/flight-transaction")
	{
		flight.POST("/", controller.AddFlightTransaction)
		flight.GET("/user/:id", controller.GetUserFlightTransaction)
	}
}
