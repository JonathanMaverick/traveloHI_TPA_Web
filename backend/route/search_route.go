package route

import (
	"github.com/JonathanMaverickTPA_Web/controller"
	"github.com/gin-gonic/gin"
)

func SearchRoute(r *gin.Engine) {
	search := r.Group("/search")
	{
		search.POST("/", controller.AddSearch)
		search.GET("/", controller.GetSearches)

		search.GET("/history/:userId", controller.GetSearchHistory)
		search.GET("/top-search", controller.GetTopSearches)
	}
}