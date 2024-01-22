package controller

import (
	"net/http"

	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/model"
	"github.com/gin-gonic/gin"
)

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
