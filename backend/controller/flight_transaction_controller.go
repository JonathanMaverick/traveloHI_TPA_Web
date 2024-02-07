package controller

import (
	"fmt"
	"net/http"
	"time"

	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/model"
	"github.com/gin-gonic/gin"
)

//AddFlightTransaction is a function to add flight transaction to database
// @Summary Add flight transaction
// @Description Add a new flight transaction
// @Tags Flight Transaction
// @Accept json
// @Produce json
// @Param flightTransaction body string true "Flight Transaction"
// @Success 200 {string} string "Flight Transaction created successfully!"
// @Router /flight-transaction [post]
func AddFlightTransaction(c *gin.Context){
	var flightTransaction model.FlightTransaction
	c.BindJSON(&flightTransaction)

	if(flightTransaction.FlightScheduleID == 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Flight schedule ID can't be empty!"})
		return
	}

	if(flightTransaction.UserID == 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "User ID can't be empty!"})
		return
	}

	if(flightTransaction.SeatID == 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Seat ID can't be empty!"})
		return
	}

	if(flightTransaction.PaymentID == 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Payment ID can't be empty!"})
		return
	}

	if (flightTransaction.PaymentID == 2){
		var creditCard model.CreditCard
		err := config.DB.Where("id = ?", flightTransaction.UserID).First(&creditCard).Error
		if err != nil{
			c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": err.Error()})
			return
		}
	}

	if(flightTransaction.Price == 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Price can't be empty!"})
		return
	}

	var user model.User
	err := config.DB.Where("id = ?", flightTransaction.UserID).First(&user).Error
	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": err.Error()})
		return
	}

	if(user.Wallet < flightTransaction.Price){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Insufficient wallet!"})
		return
	}

	user.Wallet = user.Wallet - flightTransaction.Price
	err = config.DB.Save(&user).Error
	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": err.Error()})
		return
	}

	var seat model.Seat
	err = config.DB.Where("id = ?", flightTransaction.SeatID).First(&seat).Error
	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": err.Error()})
		return
	}
	seat.SeatStatus = "unavailable"
	err = config.DB.Save(&seat).Error
	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": err.Error()})
		return
	}

	transaction_err := config.DB.Create(&flightTransaction).Error
	if transaction_err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Flight transaction created successfully!"})
}

//GetUserFlightTransaction is a function to get flight transaction by user id
// @Summary Get flight transaction by user id
// @Description Get flight transaction by user id
// @Tags Flight Transaction
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {string} string "Flight Transaction found successfully!"
// @Router /flight-transaction/user/{id} [get]
func GetUserFlightTransaction(c *gin.Context){
	var flightTransaction []model.FlightTransaction
	err := config.DB.Where("user_id = ?", c.Param("id")).Preload("FlightSchedule").Preload("FlightSchedule.Plane").
		Preload("FlightSchedule.Plane.Airline").Preload("FlightSchedule.OriginAirport").Preload("FlightSchedule.DestinationAirport").Preload("Seat").Preload("Payment").Find(&flightTransaction).Error
	
	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": flightTransaction})
}

//GetUserOnGoingFlightTransaction is a function to get on going flight transaction by user id
// @Summary Get on going flight transaction by user id
// @Description Get on going flight transaction by user id
// @Tags Flight Transaction
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {string} string "Flight Transaction found successfully!"
// @Router /flight-transaction/user/ongoing/{id} [get]
func GetUserOnGoingFlightTransaction(c *gin.Context){
	var flightTransactions []model.FlightTransaction
	err := config.DB.Where("user_id = ?", c.Param("id")).Preload("FlightSchedule").Preload("FlightSchedule.Plane").
	Preload("FlightSchedule.Plane.Airline").Preload("FlightSchedule.OriginAirport").Preload("FlightSchedule.DestinationAirport").Preload("Seat").Preload("Payment").Find(&flightTransactions).Error

	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": err.Error()})
		return
	}

	var onGoingFlight []model.FlightTransaction
	currentTime := time.Now()
	for _, flightTransaction := range flightTransactions {
		arrivalTimeStr := flightTransaction.FlightSchedule.ArrivalTime

		arrivalTime, err := time.Parse("2006-01-02T15:04", arrivalTimeStr)
		if err != nil {
			fmt.Println("Error parsing arrival time:", err)
			continue
		}

		arrivalTime = arrivalTime.In(currentTime.Location())
		arrivalTime = arrivalTime.Add(time.Hour * -7)
		if currentTime.Before(arrivalTime) {
			onGoingFlight = append(onGoingFlight, flightTransaction)
		}
	}
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": onGoingFlight})
}

//GetUserTotalFlightTransaction is a function to get total flight transaction by user id
// @Summary Get total flight transaction by user id
// @Description Get total flight transaction by user id
// @Tags Flight Transaction
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {string} string "Flight Transaction found successfully!"
// @Router /flight-transaction/user/total/{id} [get]
func GetUserOnGoingTotalFlightTransaction(c *gin.Context){
	var flightTransaction []model.FlightTransaction
	err := config.DB.Where("user_id = ?", c.Param("id")).Preload("FlightSchedule").Find(&flightTransaction).Error
	
	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": err.Error()})
		return
	}

	var onGoingFlight []model.FlightTransaction
	currentTime := time.Now()
	for _, flightTransaction := range flightTransaction {
		arrivalTimeStr := flightTransaction.FlightSchedule.ArrivalTime
		arrivalTime, err := time.Parse("2006-01-02T15:04", arrivalTimeStr)
		if err != nil {
			fmt.Println("Error parsing arrival time:", err)
			continue
		}

		arrivalTime = arrivalTime.In(currentTime.Location())
		arrivalTime = arrivalTime.Add(time.Hour * -7)
		if currentTime.Before(arrivalTime) {
			onGoingFlight = append(onGoingFlight, flightTransaction)
		}
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": len(onGoingFlight)})
}

//GetUserHistoryFlightTransaction is a function to get history flight transaction by user id
// @Summary Get history flight transaction by user id
// @Description Get history flight transaction by user id
// @Tags Flight Transaction
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {string} string "Flight Transaction found successfully!"
// @Router /flight-transaction/user/history/{id} [get]
func GetUserHistoryFlightTransaction(c *gin.Context){
	var flightTransaction []model.FlightTransaction
	err := config.DB.Where("user_id = ?", c.Param("id")).Preload("FlightSchedule").Preload("FlightSchedule.Plane").
	Preload("FlightSchedule.Plane.Airline").Preload("FlightSchedule.OriginAirport").Preload("FlightSchedule.DestinationAirport").Preload("Seat").Preload("Payment").Find(&flightTransaction).Error
	
	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": err.Error()})
		return
	}

	var historyFlight []model.FlightTransaction
	currentTime := time.Now()
	for _, flightTransaction := range flightTransaction {
		arrivalTimeStr := flightTransaction.FlightSchedule.ArrivalTime
		arrivalTime, err := time.Parse("2006-01-02T15:04", arrivalTimeStr)
		if err != nil {
			fmt.Println("Error parsing arrival time:", err)
			continue
		}

		arrivalTime = arrivalTime.In(currentTime.Location())
		arrivalTime = arrivalTime.Add(time.Hour * -7)
		if currentTime.After(arrivalTime) {
			historyFlight = append(historyFlight, flightTransaction)
		}
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": historyFlight})
}

//AddFlightCart is a function to add flight cart to database
// @Summary Add flight cart
// @Description Add a new flight cart
// @Tags Flight Transaction
// @Accept json
// @Produce json
// @Param flightCart body string true "Flight Cart"
// @Success 200 {string} string "Flight Cart created successfully!"
// @Router /flight-transaction/flight-cart [post]
func AddFlightCart(c *gin.Context){
	var flightCart model.FlightCart
	c.BindJSON(&flightCart)

	if(flightCart.FlightScheduleID == 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Flight schedule ID can't be empty!"})
		return
	}

	if(flightCart.UserID == 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "User ID can't be empty!"})
		return
	}

	if(flightCart.SeatID == 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Seat ID can't be empty!"})
		return
	}

	if(flightCart.Price == 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Price can't be empty!"})
		return
	}

	var seat model.Seat
	err := config.DB.Where("id = ?", flightCart.SeatID).First(&seat).Error
	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": err.Error()})
		return
	}
	seat.SeatStatus = "unavailable"
	err = config.DB.Save(&seat).Error
	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": err.Error()})
		return
	}

	err = config.DB.Create(&flightCart).Error
	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Flight cart created successfully!"})
}

//GetUserFlightCart is a function to get flight cart by user id
// @Summary Get flight cart by user id
// @Description Get flight cart by user id
// @Tags Flight Transaction
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {string} string "Flight Cart found successfully!"
// @Router /flight-transaction/flight-cart/{id} [get]
func GetUserFlightCart(c *gin.Context){
	var flightCart []model.FlightCart
	err := config.DB.Where("user_id = ?", c.Param("id")).Preload("FlightSchedule").Preload("FlightSchedule.Plane").
	Preload("FlightSchedule.Plane.Airline").Preload("FlightSchedule.OriginAirport").Preload("FlightSchedule.DestinationAirport").Preload("Seat").Find(&flightCart).Error

	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Flight Cart not found!"})
		return
	}
	
	var onGoingFlight []model.FlightCart
	currentTime := time.Now()
	for _, flightCart := range flightCart {
		departureTimeStr := flightCart.FlightSchedule.DepartureTime
		departureTime, err := time.Parse("2006-01-02T15:04", departureTimeStr)
		if err != nil {
			fmt.Println("Error parsing arrival time:", err)
			continue
		}

		departureTime = departureTime.In(currentTime.Location())
		departureTime = departureTime.Add(time.Hour * -7)
		if currentTime.Before(departureTime) {
			fmt.Println("Appending")
			onGoingFlight = append(onGoingFlight, flightCart)
		}
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": onGoingFlight})
}

//GetUserFlightCartHistory is a function to get history flight cart by user id
// @Summary Get history flight cart by user id
// @Description Get history flight cart by user id
// @Tags Flight Transaction
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {string} string "Flight Cart found successfully!"
// @Router /flight-transaction/flight-cart/history/{id} [get]
func GetUserFlightCartHistory(c *gin.Context){
	var flightCart []model.FlightCart
	err := config.DB.Where("user_id = ?", c.Param("id")).Preload("FlightSchedule").Preload("FlightSchedule.Plane").
	Preload("FlightSchedule.Plane.Airline").Preload("FlightSchedule.OriginAirport").Preload("FlightSchedule.DestinationAirport").Preload("Seat").Find(&flightCart).Error
	
	var historyFlight []model.FlightCart
	currentTime := time.Now()
	for _, flightCart := range flightCart {
		departureTimeStr := flightCart.FlightSchedule.DepartureTime
		departureTime, err := time.Parse("2006-01-02T15:04", departureTimeStr)
		if err != nil {
			fmt.Println("Error parsing arrival time:", err)
			continue
		}

		departureTime = departureTime.In(currentTime.Location())
		departureTime = departureTime.Add(time.Hour * -7)
		if currentTime.After(departureTime) {
			historyFlight = append(historyFlight, flightCart)
		}
	}

	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": historyFlight})
}