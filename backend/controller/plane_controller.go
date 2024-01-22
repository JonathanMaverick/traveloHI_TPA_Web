package controller

import (
	"net/http"

	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/model"
	"github.com/gin-gonic/gin"
)

// AddAirline creates a new airline
// @Summary Add airline
// @Description Add a new airline
// @Tags Airline
// @Accept json
// @Produce json
// @Param airline body string true "Airline"
// @Success 200 {string} string "Airline created successfully!"
// @Router /airline [post]
func AddAirline(c *gin.Context){
	var airline model.Airline
	c.BindJSON(&airline)
	result := config.DB.Create(&airline)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Failed to add airline!"})
		return
	}

	if(airline.AirlineName == ""){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Airline name can't be empty!"})
		return
	}

	if(airline.AirlineLogo == ""){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Airline logo can't be empty!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Airline added successfully!"})
	
}