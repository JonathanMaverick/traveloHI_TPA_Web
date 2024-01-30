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
		flight.GET("/schedule", controller.GetFlightSchedules)
		flight.GET("/schedule/:flightID", controller.GetFlightScheduleByID)
		flight.GET("/search/:query", controller.SearchFlightSchedule)
		flight.PUT("/schedule/", controller.UpdateFlightSchedule)

		flight.GET("/schedule/top-5", controller.GetTop5FlightSchedule)

		//Airline
		flight.POST("/airline", controller.AddAirline)
		flight.GET("/airline", controller.GetAirlines)

		//Plane
		flight.POST("/plane", controller.AddPlane)
		flight.GET("/plane", controller.GetPlanes)
		flight.DELETE("/plane/:planeID", controller.DeletePlane)

		flight.GET("/airline/plane/:airlineID", controller.GetPlanesByAirline)

		//Airport
		flight.GET("/airports", controller.GetAirports)

	}
}