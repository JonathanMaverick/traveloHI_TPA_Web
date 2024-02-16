package route

import (
	"github.com/JonathanMaverickTPA_Web/controller"
	"github.com/gin-gonic/gin"
)

func ReviewRoute(r *gin.Engine) {
	review := r.Group("/review")
	{
		review.POST("/", controller.AddReview)
		
		review.GET("/hotel/:hotelID", controller.GetReviewByHotelID)

		review.GET("/rating/:hotelID", controller.GetHotelRating)
	}
}