package controller

import (
	"net/http"

	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/model"
	"github.com/gin-gonic/gin"
)

//AddPlane creates a new plane
// @Summary Add plane
// @Description Add a new plane
// @Tags Plane
// @Accept json
// @Produce json
// @Param plane body string true "Plane"
// @Success 200 {string} string "Plane created successfully!"
// @Router /plane [post]
func AddPlane(c *gin.Context){
	var plane model.Plane
	c.BindJSON(&plane)

	if(plane.PlaneCode == ""){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Plane code can't be empty!"})
		return
	}

	if(plane.AirlineID == 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Airline ID can't be empty!"})
		return
	}

	if(plane.EconomySeats == 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Economy seats can't be empty!"})
		return
	}

	if(plane.BusinessSeats == 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Business seats can't be empty!"})
		return
	}

	result := config.DB.Create(&plane)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Plane code must be unique!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Plane added successfully!"})
}