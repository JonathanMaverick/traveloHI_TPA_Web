package controller

import (
	"net/http"

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
