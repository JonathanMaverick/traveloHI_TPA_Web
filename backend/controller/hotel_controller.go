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
	result := config.DB.Preload("HotelPictures").Preload("HotelFacilities.Facilities").Find(&hotels)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "No hotel found!"})
		return
	}
	c.AsciiJSON(http.StatusOK, hotels)
}

// GetFacilities lists all existing hotel facilities
// @Summary List hotel facilities
// @Description Get a list of hotel facilities
// @Tags Hotel
// @Accept json
// @Produce json
// @Success 200 {array} model.Facilities
// @Router /hotel/facilities [get]
func GetFacilities(c *gin.Context){
	var facilities []model.Facilities
	result := config.DB.Find(&facilities)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "No facilities found!"})
		return
	}
	c.AsciiJSON(http.StatusOK, facilities)
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
	c.JSON(http.StatusOK, gin.H{"hotelID": hotel.HotelID, "message": "Hotel created successfully!"})
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

// AddHotelRoom creates a new hotel room
// @Summary Add hotel room
// @Description Add a new hotel room
// @Tags Hotel
// @Accept json
// @Produce json
// @Param hotelRoom body string true "Hotel Room"
// @Success 200 {string} string "Hotel room created successfully!"
// @Router /hotel/add_hotel_room [post]
func AddHotelRoom(c *gin.Context){
	var hotelRoom model.Room
	c.BindJSON(&hotelRoom)
	result := config.DB.Create(&hotelRoom)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Failed to create hotel room!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"roomID": hotelRoom.RoomID, "message": "Hotel room created successfully!"})
}

// AddHotelRoomPicture creates a new room picture
// @Summary Add room picture
// @Description Add a new room picture
// @Tags Room
// @Accept json
// @Produce json
// @Param roomPicture body string true "Room Picture"
// @Success 200 {string} string "Room picture created successfully!"
// @Router /room/add_hotel_room_picture [post]
func AddHotelRoomPicture(c *gin.Context){
	var roomPicture model.RoomPicture
	c.BindJSON(&roomPicture)
	result := config.DB.Create(&roomPicture)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Failed to create room picture!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Room picture created successfully!"})
}