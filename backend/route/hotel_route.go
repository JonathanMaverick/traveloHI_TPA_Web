package route

import (
	"github.com/JonathanMaverickTPA_Web/controller"
	"github.com/gin-gonic/gin"
)
func HotelRoute(r *gin.Engine) {
	hotel := r.Group("/hotel")
	{
		hotel.GET("/",controller.GetHotel)
		hotel.POST("/", controller.AddHotel)

		hotel.POST("/add_hotel_picture", controller.AddHotelPicture)
		hotel.POST("/add_hotel_facilities", controller.AddHotelFacilities)		

		hotel.GET("/facilities", controller.GetFacilities)

		hotel.POST("/add_hotel_room", controller.AddHotelRoom)
		hotel.POST("/add_hotel_room_picture", controller.AddHotelRoomPicture)
	}
}