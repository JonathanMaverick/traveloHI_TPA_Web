package controller

import (
	"net/http"

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

	if hotelRoom.RoomName == "" || hotelRoom.Occupancy == 0 || hotelRoom.Quantity == 0 || hotelRoom.BedType == "" || hotelRoom.Price == 0 || hotelRoom.HotelID == 0{
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "All fields are required!"})
		return
	} 

	if hotelRoom.Price <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Price is required!"})
		return
	}

	if hotelRoom.HotelID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Hotel ID is required!"})
		return
	}

	if hotelRoom.Quantity <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Quantity is required!"})
		return
	}

	if hotelRoom.Occupancy <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Occupancy is required!"})
		return
	}

	result := config.DB.Create(&hotelRoom)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Failed to create hotel room!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"roomID": hotelRoom.ID, "message": "Hotel room created successfully!"})
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