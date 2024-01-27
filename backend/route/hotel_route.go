package route

import (
	"github.com/JonathanMaverickTPA_Web/controller"
	"github.com/gin-gonic/gin"
)
func HotelRoute(r *gin.Engine) {
	hotel := r.Group("/hotel")
	{
		//Hotel
		hotel.GET("/",controller.GetHotel)
		hotel.POST("/", controller.AddHotel)

		//Hotel Search
		hotel.GET("/search/:query", controller.SearchHotel)

		//Hotel Attributes
		hotel.POST("/add_hotel_picture", controller.AddHotelPicture)
		hotel.POST("/add_hotel_facilities", controller.AddHotelFacilities)		

		//Facilities
		hotel.GET("/facilities", controller.GetFacilities)

		//Room
		hotel.POST("/add_hotel_room", controller.AddHotelRoom)
		hotel.POST("/add_hotel_room_picture", controller.AddHotelRoomPicture)
	}
}