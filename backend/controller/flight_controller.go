package controller

import (
	"fmt"
	"net/http"

	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/model"
	"github.com/gin-gonic/gin"
)

// AddAirline creates a new airline
// @Summary Add airline
// @Description Add a new airline
// @Tags Airline
// @Accept json
// @Produce json
// @Param airline body string true "Airline"
// @Success 200 {string} string "Airline created successfully!"
// @Router /airline [post]
func AddAirline(c *gin.Context){
	var airline model.Airline
	c.BindJSON(&airline)

	if(airline.AirlineName == ""){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Airline name can't be empty!"})
		return
	}

	if(airline.AirlineLogo == ""){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Airline logo can't be empty!"})
		return
	}

	fmt.Println(airline)
	result := config.DB.Create(&airline)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Failed to add airline!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Airline added successfully!"})
	
}

// GetAirline gets an airline
// @Summary Get airline
// @Description Get an airline
// @Tags Airline
// @Accept json
// @Produce json
// @Param airline body string true "Airline"
// @Success 200 {string} string "Airline found successfully!"
// @Router /airline [get]
func GetAirlines(c *gin.Context){
	var airlines []model.Airline
	config.DB.Find(&airlines)
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "airlines": airlines})
}

//GetAirports lists all existing airports
// @Summary List airports
// @Description Get a list of airports
// @Tags Flight
// @Accept json
// @Produce json
// @Success 200 {array} model.Airport
// @Router /flight/airport [get]
func GetAirports(c *gin.Context) {
	var airports []model.Airport
	result := config.DB.Find(&airports)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "No airports found!"})
		return
	}
	c.AsciiJSON(http.StatusOK, airports)
} 

//AddSchedule creates a new flight schedule
// @Summary Add flight schedule
// @Description Add a new flight schedule
// @Tags Flight
// @Accept json
// @Produce json
// @Param flightSchedule body string true "Flight Schedule"
// @Success 200 {string} string "Flight schedule created successfully!"
// @Router /flight/schedule [post]
func AddFlightSchedule(c *gin.Context){
	var flightSchedule model.FlightSchedule
	c.BindJSON(&flightSchedule)

	if(flightSchedule.PlaneID == 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Plane ID can't be empty!"})
		return
	}

	if(flightSchedule.OriginAirportID == 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Origin airport ID can't be empty!"})
		return
	}

	if(flightSchedule.DestinationAirportID == 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Destination airport ID can't be empty!"})
		return
	}

	if(flightSchedule.OriginAirportID == flightSchedule.DestinationAirportID){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Origin and destination airport can't be the same!"})
		return
	}

	if(flightSchedule.BusinessPrice == 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Business seats price can't be empty!"})
		return
	}

	if(flightSchedule.EconomyPrice == 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Economy seats price can't be empty!"})
		return
	}

	if(flightSchedule.ArrivalTime == ""){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Arrival time can't be empty!"})
		return
	}

	if(flightSchedule.DepartureTime == ""){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Departure time can't be empty!"})
		return
	}

	result := config.DB.Create(&flightSchedule)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Failed to add flight schedule!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Flight schedule added successfully!"})
}

//GetFlightSchedules lists all existing flight schedules
// @Summary List flight schedules
// @Description Get a list of flight schedules
// @Tags Flight
// @Accept json
// @Produce json
// @Success 200 {array} model.FlightSchedule
// @Router /flight/schedule [get]
func GetFlightSchedules(c *gin.Context) {
	var flightSchedules []model.FlightSchedule
	result := config.DB.
	Preload("Plane").
	Preload("Plane.Airline").
	Preload("OriginAirport").
	Preload("DestinationAirport").
	Find(&flightSchedules)

	fmt.Println(flightSchedules)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "No flight schedules found!"})
		return
	}
	c.AsciiJSON(http.StatusOK, flightSchedules)
}
