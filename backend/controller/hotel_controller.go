package controller

import (
	"net/http"
	"strings"

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
	result := config.DB.Preload("HotelPictures").Preload("HotelFacilities.Facilities").Find(&hotels)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "No hotel found!"})
		return
	}
	c.AsciiJSON(http.StatusOK, hotels)
}

// AddHotel creates a new hotel
// @Summary Add hotel
// @Description Add a new hotel
// @Tags Hotel
// @Accept json
// @Produce json
// @Param hotel body string true "Hotel"
// @Success 200 {string} string "Hotel created successfully!"
// @Router /hotel [post]
func AddHotel(c *gin.Context) {
	var hotel model.Hotel
	c.BindJSON(&hotel)
	result := config.DB.Create(&hotel)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Failed to create hotel!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"hotelID": hotel.ID, "message": "Hotel created successfully!"})
}

// AddHotelPicture creates a new hotel picture
// @Summary Add hotel picture
// @Description Add a new hotel picture
// @Tags Hotel
// @Accept json
// @Produce json
// @Param hotelPicture body string true "Hotel Picture"
// @Success 200 {string} string "Hotel picture created successfully!"
// @Router /hotel/add_hotel_picture [post]
func AddHotelPicture(c *gin.Context){
	var hotelPicture model.HotelPicture
	c.BindJSON(&hotelPicture)
	result := config.DB.Create(&hotelPicture)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Failed to create hotel picture!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Hotel picture created successfully!"})
}

// AddHotelFacilities creates a new hotel facilities
// @Summary Add hotel facilities
// @Description Add a new hotel facilities
// @Tags Hotel
// @Accept json
// @Produce json
// @Param hotelFacilities body string true "Hotel Facilities"
// @Success 200 {string} string "Hotel facilities created successfully!"
// @Router /hotel/add_hotel_facilities [post]
func AddHotelFacilities(c *gin.Context){
	var hotelFacilities model.HotelFacilities
	c.BindJSON(&hotelFacilities)

	result := config.DB.Create(&hotelFacilities)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Failed to create hotel facilities!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Hotel facilities created successfully!"})
}

//SearchHotel searches hotel by name
// @Summary Search hotel
// @Description Search hotel by name
// @Tags Hotel
// @Accept json
// @Produce json
// @Param query path string true "Query"
// @Success 200 {string} string "Hotel found!"
// @Router /hotel/search/{query} [get]
func SearchHotel(c *gin.Context) {
	var hotels []model.Hotel
	query := c.Param("query")
	result := config.DB.Where("LOWER(name) LIKE ?", "%"+strings.ToLower(query)+"%").Preload("HotelPictures").Preload("HotelFacilities.Facilities").Find(&hotels)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "No hotel found!"})
		return
	}
	c.AsciiJSON(http.StatusOK, hotels)
}