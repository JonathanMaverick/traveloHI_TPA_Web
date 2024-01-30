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
	}
}