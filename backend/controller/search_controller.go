package controller

import (
	"net/http"
	"strings"
	"time"

	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/model"
	"github.com/gin-gonic/gin"
)

// AddSearch add search query to db
// @Summary Add Search
// @Description Add search query to db
// @Tags Search
// @Accept  json
// @Produce  json
// @Param search body model.Search true "Search"
// @Success 200 {string} string	"ok"
// @Router /search [post]
func AddSearch(c *gin.Context){
	var search model.Search
	c.BindJSON(&search)

	search.Search = strings.ToLower(strings.TrimSpace(search.Search))
	search.Time = time.Now()

	if search.Search == ""{
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Search query cannot be empty",
		})
		return
	}

	config.DB.Create(&search)

	c.JSON(http.StatusOK, search)
}


// GetSearches get all searches
// @Summary Get Searches
// @Description Get all searches
// @Tags Search
// @Accept  json
// @Produce  json
// @Success 200 {string} string	"ok"
// @Router /search [get]
func GetSearches(c *gin.Context){
	var searches []model.Search
	config.DB.Find(&searches)

	c.JSON(http.StatusOK, searches)
}

// GetSearchHistory get search history by user id
// @Summary Get Search History
// @Description Get search history by user id
// @Tags Search
// @Accept  json
// @Produce  json
// @Param userId path int true "User ID"
// @Success 200 {string} string	"ok"
// @Router /search/history/{userId} [get]
func GetSearchHistory(c *gin.Context) {
    var searches []model.Search
    userId := c.Param("userId")

    config.DB.Table("searches").Select("DISTINCT ON (search) *").Where("user_id = ?", userId).Order("search, time DESC").Limit(3).Find(&searches)

    c.JSON(http.StatusOK, searches)
}

// GetTopSearches gets the top 5 recent unique searches across all users.
// @Summary Get Top Searches
// @Description Get the top 5 recent unique searches across all users
// @Tags Search
// @Accept  json
// @Produce  json
// @Success 200 {string} string	"ok"
// @Router /search/top-search [get]
func GetTopSearches(c *gin.Context) {
    var topSearches []struct {
        Search string `json:"search"`
        Count  int    `json:"count"`
    }

    config.DB.Table("searches").Select("search, COUNT(search) as count").Group("search").Order("count DESC").Limit(5).Find(&topSearches)

    c.JSON(http.StatusOK, topSearches)
}

// GetSearchResult 
// @Summary Get Search Result
// @Description Get search result
// @Tags Search
// @Accept  json
// @Produce  json
// @Param search path string true "Search Query"
// @Success 200 {string} string	"ok"
// @Router /search/{search} [get]
func GetSearchResult(c *gin.Context) {
	var search model.Search
	searchQuery := c.Param("search")

	config.DB.Where("search = ?", searchQuery).First(&search)

	c.JSON(http.StatusOK, search)
}