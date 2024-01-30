package controller

import (
	"fmt"
	"net/http"
	"time"

	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/model"
	"github.com/gin-gonic/gin"
)

// AddHotelTransaction add new hotel transaction
// @Summary Add new hotel transaction
// @Description Add new hotel transaction
// @Tags HotelTransaction
// @Accept json
// @Produce json
// @Param hotelTransaction body HotelTransaction true "Hotel Transaction Body"
// @Success 200 {string} string "Hotel transaction created successfully!"
// @Router /hotel_transaction [post]
func AddHotelTransaction(c *gin.Context) {
	var hotelTransaction model.HotelTransaction
	c.BindJSON(&hotelTransaction)

	var user model.User
	config.DB.Where("id = ?", hotelTransaction.UserID).First(&user)
	if user.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "User not found!"})
		return
	}

	if user.Wallet < hotelTransaction.Price {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Not enough money!"})
		return
	}
	user.Wallet = user.Wallet - hotelTransaction.Price
	config.DB.Save(&user)

	result := config.DB.Create(&hotelTransaction)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Failed to create hotel transaction!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Hotel transaction created successfully!"})
}

//GetUserOngoingHotelTransaction get user ongoing hotel transaction
// @Summary Get user ongoing hotel transaction
// @Description Get user ongoing hotel transaction
// @Tags HotelTransaction
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {string} string "Hotel transaction created successfully!"
// @Router /hotel_transaction/user/ongoing/{id} [get]
func GetUserOngoingHotelTransaction(c *gin.Context) {
	id := c.Params.ByName("id")
	var hotelTransaction []model.HotelTransaction
	config.DB.Where("user_id = ?", id).Preload("Room").Preload("Room.RoomPicture").Preload("Hotel").Preload("Payment").Find(&hotelTransaction)

	var onGoingHotel []model.HotelTransaction
	currentTime := time.Now()
	for _, hotel := range hotelTransaction {
		checkOutDateStr := hotel.CheckOutDate
		checkOutDate, err := time.Parse("2006-01-02", checkOutDateStr)
		if err != nil {
			fmt.Println("Error parsing arrival time:", err)
			continue
		}

		checkOutDate = checkOutDate.In(currentTime.Location())
		checkOutDate = checkOutDate.Add(time.Hour * -7)
		if currentTime.Before(checkOutDate) {
			onGoingHotel = append(onGoingHotel, hotel)
		}	
	}
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": onGoingHotel})
}