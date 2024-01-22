package route

import (
	"github.com/JonathanMaverickTPA_Web/controller"
	"github.com/gin-gonic/gin"
)
func FlightRoute(r *gin.Engine) {
	flight := r.Group("/flight")
	{
		//Airline
		flight.POST("/airline", controller.AddAirline)
		flight.GET("/airline", controller.GetAirlines)

		//Plane
		flight.POST("/plane", controller.AddPlane)
	}
}