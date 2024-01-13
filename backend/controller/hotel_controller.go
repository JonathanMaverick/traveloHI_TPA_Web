package controller

import (
	"net/http"

	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/model"
	"github.com/gin-gonic/gin"
)

// GetRooms lists all existing hotel
// @Summary List hotel
// @Description Get a list of hotel
// @Tags Hotel
// @Accept json
// @Produce json
// @Success 200 {array} model.Hotel
// @Router /hotel [get]
func GetHotel(c *gin.Context) {
	var hotels []model.Hotel
	result := config.DB.Find(&hotels)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "No hotel found!"})
		return
	}
	c.AsciiJSON(http.StatusOK, hotels)
}
