package controller

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/model"
	"github.com/gin-gonic/gin"
)

// GetRooms lists all existing rooms
// @Summary List rooms
// @Description Get a list of rooms
// @Tags Room
// @Accept json
// @Produce json
// @Success 200 {array} model.Room
// @Router /room [get]
func GetRooms(c *gin.Context) {
	var rooms []model.Room
	result := config.DB.Find(&rooms)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "No rooms found!"})
		return
	}
	c.AsciiJSON(http.StatusOK, rooms)
}

// GetUsers lists all existing bedtypes
// @Summary List bed types
// @Description Get a list of bedtypes
// @Tags Room
// @Accept json
// @Produce json
// @Success 200 {array} model.BedType
// @Router /room/type [get]
func GetBedTypes(c *gin.Context) {
	var bedtypes []model.BedType
	result := config.DB.Find(&bedtypes)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "No bed type found!"})
		return
	}
	c.AsciiJSON(http.StatusOK, bedtypes)
}

// GetHotelRooms lists all rooms for a specific hotel
// @Summary List rooms for a hotel
// @Description Get a list of rooms for a specific hotel
// @Tags Room
// @Accept json
// @Produce json
// @Param hotelId path int true "Hotel ID"
// @Success 200 {array} model.Room
// @Router /hotel/{hotelId}/rooms [get]
func GetHotelRooms(c *gin.Context) {

	hotelIdStr := c.Param("hotelId")
	hotelId, err := strconv.Atoi(hotelIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Invalid hotel ID"})
		return
	}

	var hotel model.Hotel
	result := config.DB.First(&hotel, hotelId)
	fmt.Println(result)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "Hotel not found"})
		return
	}

	var rooms []model.Room
	result = config.DB.Where("hotel_id = ?", hotelId).Find(&rooms)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Error retrieving rooms"})
		return
	}

	c.AsciiJSON(http.StatusOK, rooms)
}