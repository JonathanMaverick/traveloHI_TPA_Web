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
// @Tags Hotel Transaction
// @Accept json
// @Produce json
// @Param hotelTransaction body string true "Hotel Transaction Body"
// @Success 200 {string} string "Hotel transaction created successfully!"
// @Router /hotel-transaction [post]
func AddHotelTransaction(c *gin.Context) {
	var hotelTransaction model.HotelTransaction
	c.BindJSON(&hotelTransaction)

	var user model.User
	config.DB.Where("id = ?", hotelTransaction.UserID).First(&user)
	if user.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "User not found!"})
		return
	}

	if hotelTransaction.PaymentID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Payment ID is required!"})
		return
	}

	currentTime := time.Now()
	checkInDate, err := time.Parse("2006-01-02", hotelTransaction.CheckInDate)
	if err != nil {
		fmt.Println("Error parsing arrival time:", err)
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Invalid check in date!"})
		return
	}

	checkInDate = checkInDate.In(currentTime.Location())
	checkInDate = checkInDate.Add(time.Hour * -7)
	if currentTime.After(checkInDate) {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Check in date can't be in the past!"})
		return
	}

	checkOutDate, err := time.Parse("2006-01-02", hotelTransaction.CheckOutDate)
	if err != nil {
		fmt.Println("Error parsing arrival time:", err)
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Invalid check out date!"})
		return
	}

	checkOutDate = checkOutDate.In(currentTime.Location())
	checkOutDate = checkOutDate.Add(time.Hour * -7)
	if checkOutDate.Before(checkInDate) {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Check out date can't be before check in date!"})
		return
	}

	if hotelTransaction.PaymentID == 1{
		var creditCard model.CreditCard
		config.DB.Where("user_id = ?", hotelTransaction.UserID).First(&creditCard)
		if creditCard.ID == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Credit card is required!"})
			return
		}	
	}else{
		if user.Wallet < hotelTransaction.Price {
			c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Not enough money!"})
			return
		}
		user.Wallet = user.Wallet - hotelTransaction.Price
		config.DB.Save(&user)		
	}

	var room model.Room
	config.DB.Where("id = ?", hotelTransaction.RoomID).First(&room)
	if room.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "Room not found!"})
		return
	}

	if room.Quantity <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Room is not available!"})
		return
	}
	room.Quantity = room.Quantity - 1
	config.DB.Save(&room)


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
// @Tags Hotel Transaction
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {string} string "Hotel transaction created successfully!"
// @Router /hotel-transaction/user/ongoing/{id} [get]
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

//GetUserHistoryHotelTransaction get user history hotel transaction
// @Summary Get user history hotel transaction
// @Description Get user history hotel transaction
// @Tags Hotel Transaction
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {string} string "Hotel transaction created successfully!"
// @Router /hotel-transaction/user/history/{id} [get]
func GetUserHistoryHotelTransaction(c *gin.Context) {
	id := c.Params.ByName("id")
	var hotelTransaction []model.HotelTransaction
	config.DB.Where("user_id = ?", id).Preload("Room").Preload("Room.RoomPicture").Preload("Hotel").Preload("Payment").Find(&hotelTransaction)

	var historyHotel []model.HotelTransaction
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
		if currentTime.After(checkOutDate) {
			historyHotel = append(historyHotel, hotel)
		}	
	}
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": historyHotel})
}


//AddHotelCart add new hotel cart
// @Summary Add new hotel cart
// @Description Add new hotel cart
// @Tags Hotel Cart
// @Accept json
// @Produce json
// @Param hotelCart body string true "Hotel Cart Body"
// @Success 200 {string} string "Hotel cart created successfully!"
// @Router /hotel-transaction/hotel-cart [post]
func AddHotelCart(c *gin.Context) {
	var hotelCart model.HotelCart
	c.BindJSON(&hotelCart)

	var user model.User
	config.DB.Where("id = ?", hotelCart.UserID).First(&user)
	if user.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "User not found!"})
		return
	}

	currentTime := time.Now()
	checkInDate, err := time.Parse("2006-01-02", hotelCart.CheckInDate)
	if err != nil {
		fmt.Println("Error parsing arrival time:", err)
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Invalid check in date!"})
		return
	}

	checkInDate = checkInDate.In(currentTime.Location())
	checkInDate = checkInDate.Add(time.Hour * -7)
	if currentTime.After(checkInDate) {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Check in date can't be in the past!"})
		return
	}

	checkOutDate, err := time.Parse("2006-01-02", hotelCart.CheckOutDate)
	if err != nil {
		fmt.Println("Error parsing arrival time:", err)
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Invalid check out date!"})
		return
	}

	checkOutDate = checkOutDate.In(currentTime.Location())
	checkOutDate = checkOutDate.Add(time.Hour * -7)
	if checkOutDate.Before(checkInDate) {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Check out date can't be before check in date!"})
		return
	}

	var room model.Room
	config.DB.Where("id = ?", hotelCart.RoomID).First(&room)
	if room.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "Room not found!"})
		return
	}

	result := config.DB.Create(&hotelCart)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Failed to create hotel cart!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Hotel cart created successfully!"})
}

//GetUserHotelCart get user hotel cart
// @Summary Get user hotel cart
// @Description Get user hotel cart
// @Tags Hotel Cart
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {string} string "Hotel cart created successfully!"
// @Router /hotel-transaction/hotel-cart/user/{id} [get]
func GetUserHotelCart(c *gin.Context) {
	id := c.Params.ByName("id")
	var hotelCart []model.HotelCart
	config.DB.Where("user_id = ?", id).Preload("Room").Preload("Room.RoomPicture").Preload("Hotel").Find(&hotelCart)
	var ongoingHotelCart []model.HotelCart
	currentTime := time.Now()
	for _, hotel := range hotelCart {
		checkInDateStr := hotel.CheckInDate
		checkInDate, err := time.Parse("2006-01-02", checkInDateStr)
		if err != nil {
			fmt.Println("Error parsing arrival time:", err)
			continue
		}

		checkInDate = checkInDate.In(currentTime.Location())
		checkInDate = checkInDate.Add(time.Hour * -7)
		if currentTime.Before(checkInDate) {
			ongoingHotelCart = append(ongoingHotelCart, hotel)
		}	
	}
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": ongoingHotelCart})
}