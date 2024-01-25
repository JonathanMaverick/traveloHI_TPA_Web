package controller

import (
	"net/http"

	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/model"
	"github.com/gin-gonic/gin"
)

// AddPlane creates a new plane
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

// GetPlanes returns all planes
// @Summary Get planes
// @Description Get all planes
// @Tags Plane
// @Accept json
// @Produce json
// @Success 200 {string} string "Planes found successfully!"
// @Router /plane [get]
func GetPlanes(c *gin.Context) {
	var planes []model.Plane

	result := config.DB.Find(&planes)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Planes found successfully!", "planes": planes})
}

// GetPlane returns a plane by airline
// @Summary Get plane by airline
// @Description Get a plane
// @Tags Plane
// @Accept json
// @Produce json
// @Param airlineID path int true "Airline ID"
// @Success 200 {string} string "Plane found successfully!"
// @Router /airline/plane/{airlineID} [get]
func GetPlanesByAirline(c *gin.Context) {
	var planes []model.Plane
	airlineID := c.Params.ByName("airlineID")

	result := config.DB.Where("airline_id = ?", airlineID).Find(&planes)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Planes found successfully!", "planes": planes})
}

// DeletePlane deletes a plane
// @Summary Delete plane
// @Description Delete a plane
// @Tags Plane
// @Accept json
// @Produce json
// @Param planeID path int true "Plane ID"
// @Success 200 {string} string "Plane deleted successfully!"
// @Router /plane/{planeID} [delete]
func DeletePlane(c *gin.Context) {
	planeID := c.Params.ByName("planeID")

	var plane model.Plane
	result := config.DB.Where("id = ?", planeID).Delete(&plane)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Plane deleted successfully!"})
}
