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
		flight.GET("/user/ongoing/:id", controller.GetUserOnGoingFlightTransaction)

		flight.GET("/user/history/:id", controller.GetUserHistoryFlightTransaction)

		flight.GET("/user/total/:id", controller.GetUserOnGoingTotalFlightTransaction)

		flight.POST("/flight-cart/", controller.AddFlightCart)
		flight.GET("/flight-cart/:id", controller.GetUserFlightCart)
		flight.GET("/flight-cart/expired/:id", controller.GetUserExpiredFlightCart)
		flight.POST("/add-flight-transaction-from-cart/", controller.AddFlightTransactionFromCart)
	}
}
