package controller

import (
	"fmt"
	"net/http"
	"strings"
	"time"

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


func createSeatsForPlaneAndFlightSchedule(plane model.Plane, flightSchedule model.FlightSchedule) ([]model.Seat, error) {
	var seats []model.Seat

	for i := uint(1); i <= plane.BusinessSeats; i++ {
		seat := model.Seat{
			PlaneID:           	plane.ID,
			FlightScheduleID:  	flightSchedule.ID,
			SeatType: 			"business",
			SeatStatus: 		"available",
			SeatNumber:        	fmt.Sprintf("B%d", i),
		}
		seats = append(seats, seat)
	}
	
	for i := uint(1); i <= plane.EconomySeats; i++ {
		seat := model.Seat{
			PlaneID:           	plane.ID,
			FlightScheduleID:  	flightSchedule.ID,
			SeatType: 			"economy",
			SeatStatus: 		"available",
			SeatNumber:        	fmt.Sprintf("E%d", i),
		}
		seats = append(seats, seat)
	}


	return seats, nil
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

	departureTime, err := time.Parse("2006-01-02T15:04", flightSchedule.DepartureTime)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Invalid Date Format!"})
		return
	}
	arrivalTime, err := time.Parse("2006-01-02T15:04", flightSchedule.ArrivalTime)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Invalid Date Format!"})
		return
	}
	
	if arrivalTime.Before(departureTime) || arrivalTime.Equal(departureTime) {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Arrival time must be after departure time!"})
		return
	}

	if departureTime.Before(time.Now()) {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Departure time can't be less than current time!"})
		return
	}

	var plane model.Plane
	findPlane := config.DB.First(&plane, flightSchedule.PlaneID)
	if findPlane.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Plane not found!"})
		return
	}

	result := config.DB.Create(&flightSchedule)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Failed to add flight schedule! Make sure the code is unique"})
		return
	}

	seats, err := createSeatsForPlaneAndFlightSchedule(plane, flightSchedule)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Error creating seats"})
		return
	}
	
	for _, seat := range seats {
		config.DB.Create(&seat)
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Flight schedule added successfully!"})
}

//GetFlightScheduleByID gets a flight schedule by ID
// @Summary Get flight schedule by ID
// @Description Get a flight schedule by ID
// @Tags Flight
// @Accept json
// @Produce json
// @Param flightID path string true "Flight ID"
// @Success 200 {string} string "Flight schedule found successfully!"
// @Router /flight/schedule/{flightID} [get]
func GetFlightScheduleByID(c *gin.Context) {
	flightID := c.Param("flightID")
	var flightSchedule model.FlightSchedule
	result := config.DB.
		Preload("Plane").
		Preload("Plane.Airline").
		Preload("OriginAirport").
		Preload("DestinationAirport").
		Preload("Seats").
		First(&flightSchedule, flightID)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Flight schedule not found!"})
		return
	}
	c.AsciiJSON(http.StatusOK, flightSchedule)
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

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "No flight schedules found!"})
		return
	}
	c.AsciiJSON(http.StatusOK, flightSchedules)
}

//SearchFlightSchedule searches flight schedules
// @Summary Search flight schedules
// @Description Search flight schedules
// @Tags Flight
// @Accept json
// @Produce json
// @Param query path string true "Query"
// @Success 200 {array} string
// @Router /flight/search/{query} [get]
func SearchFlightSchedule(c *gin.Context) {
	query := strings.ToLower(c.Param("query")) // Convert query to lowercase
	var flightSchedules []model.FlightSchedule
	
	result := config.DB.
		Joins("JOIN airports AS origin_airport ON origin_airport.id = flight_schedules.origin_airport_id").
		Joins("JOIN airports AS destination_airport ON destination_airport.id = flight_schedules.destination_airport_id").
		Joins("JOIN planes ON planes.id = flight_schedules.plane_id").
		Joins("JOIN airlines ON airlines.id = planes.airline_id").
		Where("LOWER(destination_airport.airport_name) LIKE ? OR LOWER(destination_airport.airport_code) LIKE ? OR LOWER(destination_airport.airport_location) LIKE ? OR LOWER(planes.plane_code) LIKE ? OR LOWER(airlines.airline_name) LIKE ? OR LOWER (flight_schedules.flight_schedule_code) LIKE ?",
			"%"+query+"%", "%"+query+"%", "%"+query+"%", "%"+query+"%", "%"+query+"%", "%"+query+"%").
		Preload("Plane").
		Preload("Plane.Airline").
		Preload("OriginAirport").
		Preload("DestinationAirport").
		Find(&flightSchedules)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "No flight schedules found!"})
		return
	}
	c.AsciiJSON(http.StatusOK, flightSchedules)
}

//Update flight schedule
// @Summary Update flight schedule
// @Description Update flight schedule
// @Tags Flight
// @Accept json
// @Produce json
// @Param flightSchedule body string true "Flight Schedule"
// @Success 200 {string} string "Flight schedule updated successfully!"
// @Router /flight/schedule/ [put]
func UpdateFlightSchedule(c *gin.Context) {
	var flightSchedule model.FlightSchedule
	c.BindJSON(&flightSchedule)

	if(flightSchedule.ID == 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Flight schedule ID can't be empty!"})
		return
	}

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

	departureTime, err := time.Parse("2006-01-02T15:04", flightSchedule.DepartureTime)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Invalid Date Format!"})
		return
	}
	arrivalTime, err := time.Parse("2006-01-02T15:04", flightSchedule.ArrivalTime)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Invalid Date Format!"})
		return
	}
	if arrivalTime.Before(departureTime) || arrivalTime.Equal(departureTime) {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Arrival time must be after departure time!"})
		return
	}

	var plane model.Plane
	findPlane := config.DB.First(&plane, flightSchedule.PlaneID)
	if findPlane.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Plane not found!"})
		return
	}

	result := config.DB.Save(&flightSchedule)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Failed to update flight schedule!"})
		return
	}

	var seats []model.Seat
	config.DB.Where("flight_schedule_id = ?", flightSchedule.ID).Find(&seats)
	for _, seat := range seats {
		config.DB.Delete(&seat)
	}

	seats, err = createSeatsForPlaneAndFlightSchedule(plane, flightSchedule)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Error creating seats"})
		return
	}

	for _, seat := range seats {
		config.DB.Create(&seat)
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Flight schedule updated successfully!"})
}