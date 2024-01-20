package route

import (
	"github.com/JonathanMaverickTPA_Web/controller"
	"github.com/gin-gonic/gin"
)
func HotelRoute(r *gin.Engine) {
	hotel := r.Group("/hotel")
	{
		hotel.GET("/",controller.GetHotel)
		hotel.GET("/:hotelId/rooms", controller.GetHotelRooms)

		hotel.GET("/facilities", controller.GetFacilities)
	}
}