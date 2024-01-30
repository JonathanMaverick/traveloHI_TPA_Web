package controller

import (
	"net/http"

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
	result := config.DB.Create(&hotelTransaction)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Failed to create hotel transaction!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Hotel transaction created successfully!"})
}