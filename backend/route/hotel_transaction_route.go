package route
import (
	"github.com/JonathanMaverickTPA_Web/controller"
	"github.com/gin-gonic/gin"
)

func HotelTransactionRoute(r *gin.Engine) {
	hotel := r.Group("/hotel-transaction")
	{
		hotel.POST("/", controller.AddHotelTransaction)
		hotel.GET("/user/ongoing/:id", controller.GetUserOngoingHotelTransaction)
		hotel.GET("/user/history/:id", controller.GetUserHistoryHotelTransaction)

		hotel.POST("/hotel-cart", controller.AddHotelCart)
		hotel.PUT("/hotel-cart/:id", controller.UpdateHotelCart)
		hotel.GET("/hotel-cart/user/:id", controller.GetUserHotelCart)

		hotel.GET("/user/total/:id", controller.GetUserOnGoingTotalHotelTransaction)

		hotel.GET("/top", controller.GetTop5HotelTransaction)
		hotel.POST("/add-hotel-transaction-from-cart/", controller.AddHotelTransactionByCart)
	}
}