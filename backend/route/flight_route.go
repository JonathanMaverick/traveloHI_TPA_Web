package route

import (
	"github.com/JonathanMaverickTPA_Web/controller"
	"github.com/gin-gonic/gin"
)
func FlightRoute(r *gin.Engine) {
	flight := r.Group("/flight")
	{
		//Flight Schedule
		flight.POST("/schedule", controller.AddFlightSchedule)

		//Airline
		flight.POST("/airline", controller.AddAirline)
		flight.GET("/airline", controller.GetAirlines)

		//Plane
		flight.POST("/plane", controller.AddPlane)
		flight.GET("/plane", controller.GetPlanes)

		flight.GET("/airline/plane/:airlineID", controller.GetPlanesByAirline)

		//Airport
		flight.GET("/airports", controller.GetAirports)
	}
}