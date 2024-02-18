package controller

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/model"
	"github.com/gin-gonic/gin"
	"gopkg.in/gomail.v2"
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

	if room.Quantity <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Room is not available!"})
		return
	}
	room.Quantity = room.Quantity - 1
	config.DB.Save(&room)


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
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": hotelCart})
}

//UpdateHotelCart update hotel cart
// @Summary Update hotel cart
// @Description Update hotel cart
// @Tags Hotel Cart
// @Accept json
// @Produce json
// @Param id path int true "Hotel Cart ID"
// @Param hotelCart body string true "Hotel Cart Body"
// @Success 200 {string} string "Hotel cart updated successfully!"
// @Router /hotel-transaction/hotel-cart/{id} [put]
func UpdateHotelCart(c *gin.Context) {
	var hotelCart model.HotelCart
	id := c.Params.ByName("id")
	config.DB.Where("id = ?", id).First(&hotelCart)
	if hotelCart.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "Hotel cart not found!"})
		return
	}

	c.BindJSON(&hotelCart)

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

	result := config.DB.Save(&hotelCart)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Failed to update hotel cart!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Hotel cart updated successfully!"})
}

//GetUserTotalHotelTransaction get user total hotel transaction
// @Summary Get user total hotel transaction
// @Description Get user total hotel transaction
// @Tags Hotel Transaction
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {string} string "Hotel transaction created successfully!"
// @Router /hotel-transaction/user/total/{id} [get]
func GetUserOnGoingTotalHotelTransaction(c *gin.Context){
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
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": len(onGoingHotel)})
}

//Get Top 5 Hotel in Hotel Transaction
// @Summary Get Top 5 Hotel in Hotel Transaction
// @Description Get Top 5 Hotel in Hotel Transaction
// @Tags Hotel Transaction
// @Accept json
// @Produce json
// @Success 200 {string} string "Hotel transaction created successfully!"
// @Router /hotel-transaction/top [get]
func GetTop5HotelTransaction(c *gin.Context) {
    var topHotels []model.Hotel

    // Mengambil top 5 hotel berdasarkan jumlah transaksi dari tabel hotel_transactions
    if err := config.DB.
        Table("hotels").
        Joins("JOIN hotel_transactions ON hotels.id = hotel_transactions.hotel_id").
        Group("hotels.id").
        Order("COUNT(*) DESC").
        Limit(5).
        Preload("HotelPictures"). 
        Preload("HotelFacilities.Facilities"). 
        Find(&topHotels).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": topHotels})
}

//AddHotelTransactionByCart add new hotel transaction by cart
// @Summary Add new hotel transaction by cart
// @Description Add new hotel transaction by cart
// @Tags Hotel Transaction
// @Accept json
// @Produce json
// @Param hotelTransaction body string true "Hotel Transaction Body"
// @Success 200 {string} string "Hotel transaction created successfully!"
// @Router /hotel-transaction/add-hotel-transaction-from-cart [post]
func AddHotelTransactionByCart(c *gin.Context) {
	var hotelCart model.HotelCart
	c.BindJSON(&hotelCart)

	var user model.User
	config.DB.Where("id = ?", hotelCart.UserID).First(&user)
	if user.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "User not found!"})
		return
	}

	if hotelCart.PaymentID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Payment ID is required!"})
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

	var promo model.Promo
	if(hotelCart.PromoCode != ""){
		err := config.DB.Where("promo_code = ?", hotelCart.PromoCode).First(&promo).Error
		if err != nil{
			c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Promo not found!"})
			return
		}

		var flightTransaction model.FlightTransaction
		err = config.DB.Where("promo_id = ?", promo.ID).First(&flightTransaction).Error
		if err == nil{
			c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Promo code already used!"})
			return
		}

		var hotelTransaction model.HotelTransaction
		err = config.DB.Where("promo_id = ?", promo.ID).First(&hotelTransaction).Error
		if err == nil{
			c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Promo code already used!"})
			return
		}

		hotelCart.Price = hotelCart.Price - ((hotelCart.Price * float64(promo.PromoDiscount)) / 100)
	}

	if (hotelCart.PaymentID == 1){
		var creditCard model.CreditCard
		err := config.DB.Where("id = ?", hotelCart.UserID).First(&creditCard).Error
		if err != nil{
			c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Credit Card not found"})
			return
		}
	}

	if (hotelCart.PaymentID == 2){
		if(user.Wallet < hotelCart.Price){
			c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Insufficient wallet!"})
			return
		}
		user.Wallet = user.Wallet - hotelCart.Price
	}

	err = config.DB.Save(&user).Error
	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": err.Error()})
		return
	}

	var hotelTransaction model.HotelTransaction
	hotelTransaction.HotelID = hotelCart.HotelID
	hotelTransaction.UserID = hotelCart.UserID
	hotelTransaction.RoomID = hotelCart.RoomID
	hotelTransaction.PaymentID = hotelCart.PaymentID
	hotelTransaction.Price = hotelCart.Price
	hotelTransaction.CheckInDate = hotelCart.CheckInDate
	hotelTransaction.CheckOutDate = hotelCart.CheckOutDate
	hotelTransaction.PromoID = promo.ID

	config.DB.Delete(&hotelCart)
	result := config.DB.Create(&hotelTransaction)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Failed to create hotel transaction!"})
		return
	}

	var hotel model.Hotel
	config.DB.Where("id = ?", hotelTransaction.HotelID).First(&hotel)

	priceString := strconv.FormatFloat(hotelCart.Price, 'f', -1, 64)

	from := "VKTraveloHI@gmail.com"
	password := "kpbyhdkeontawsvu"
	subject := "Hotel Transaction Success!"
	body := "Your Transaction with hotel "+ hotel.Name + " has been created successfully! with price " + priceString + " and check in date " + hotelTransaction.CheckInDate + " and check out date " + hotelTransaction.CheckOutDate + " Thank you for using our service!"

	m := gomail.NewMessage()
	m.SetHeader("From", from)
	m.SetHeader("To", user.Email)
	m.SetHeader("Subject", subject)
	m.SetBody("text/plain", body)

	dialer := gomail.NewDialer("smtp.gmail.com", 587, from, password)

	if err := dialer.DialAndSend(m); err != nil {
		fmt.Println(err)
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Hotel transaction created successfully!"})
}