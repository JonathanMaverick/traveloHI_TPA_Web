package controller

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/model"
	"github.com/gin-gonic/gin"
)

//AddReview is a function that adds a review to the database
// @Summary Add review
// @Description Add a new review
// @Tags Review
// @Accept json
// @Produce json
// @Param review body string true "Review"
// @Success 200 {string} string "Review created successfully!"
// @Router /review [post]
func AddReview(c *gin.Context){
	var review model.Review
	c.BindJSON(&review)
	
	if(review.Review == ""){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Review can't be empty!"})
		return
	}

	if(review.UserID == 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "User ID can't be empty!"})
		return
	}

	if(review.HotelID == 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Hotel ID can't be empty!"})
		return
	}

	if (review.Cleanliness < 0 || review.Cleanliness > 10){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Cleanliness must be between 0 and 5!"})
		return
	}

	if (review.Comfort < 0 || review.Comfort > 10){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Comfort must be between 0 and 5!"})
		return
	}

	if (review.Location < 0 || review.Location > 10){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Location must be between 0 and 5!"})
		return
	}

	if (review.Service < 0 || review.Service > 10){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Service must be between 0 and 5!"})
		return
	}

	var transaction model.HotelTransaction
	config.DB.Where("id = ?", review.TransactionID).First(&transaction)
	transaction.IsReviewed = true
	config.DB.Save(&transaction)

	result := config.DB.Create(&review)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Review already exists!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Review added successfully!"})
}

//GetReviewByHotelID returns all reviews by hotel ID
// @Summary Get reviews by hotel ID
// @Description Get all reviews by hotel ID
// @Tags Review
// @Accept json
// @Produce json
// @Param hotelID path string true "Hotel ID"
// @Success 200 {string} string "Reviews found successfully!"
// @Router /review/hotel/{hotelID} [get]
func GetReviewByHotelID(c *gin.Context){
	var reviews []model.Review
	hotelID := c.Param("hotelID")

	result := config.DB.Where("hotel_id = ?", hotelID).Preload("User").Find(&reviews)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "error": result.Error.Error()})
		return
	}

	for i := 0; i < len(reviews); i++ {
		if reviews[i].IsAnonymous {
			fmt.Println("Anonymous user")
			reviews[i].UserID = 0
			reviews[i].User = model.User{FirstName: "Anonymous", LastName: "User"}
		}
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": reviews})
}

//GetHotelRating returns the average rating of a hotel
// @Summary Get hotel rating
// @Description Get the average rating of a hotel
// @Tags Review
// @Accept json
// @Produce json
// @Param hotelID path string true "Hotel ID"
// @Success 200 {string} string "Rating found successfully!"
// @Router /review/rating/{hotelID} [get]
func GetHotelRating(c *gin.Context){
	hotelID := c.Param("hotelID")
	hotelIDInt, err := strconv.Atoi(hotelID)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "error": "Invalid hotel ID!"})
		return
	}

	var reviews []model.Review
	result := config.DB.Where("hotel_id = ?", hotelID).Find(&reviews)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "error": result.Error.Error()})
		return
	}

	var cleanliness int
	var comfort int
	var location int
	var service int
	for i := 0; i < len(reviews); i++ {
		cleanliness += reviews[i].Cleanliness
		comfort += reviews[i].Comfort
		location += reviews[i].Location
		service += reviews[i].Service
	}

	var HotelRating model.HotelRating
	HotelRating.Cleanliness = float32(cleanliness) / float32(len(reviews))
	HotelRating.Comfort = float32(comfort) / float32(len(reviews))
	HotelRating.Location = float32(location) / float32(len(reviews))
	HotelRating.Service = float32(service) / float32(len(reviews))
	HotelRating.HotelID = hotelIDInt;

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": HotelRating})
}