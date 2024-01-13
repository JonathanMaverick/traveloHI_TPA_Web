package route

import (
	"github.com/JonathanMaverickTPA_Web/controller"
	"github.com/gin-gonic/gin"
)

func RoomRoute(r *gin.Engine){
	room := r.Group("/room")
	{
		room.GET("/", controller.GetRooms)
		room.GET("/type", controller.GetBedTypes)
	}
}