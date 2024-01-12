package controller

import (
	"net/http"

	"github.com/JonathanMaverickTPA_Web/model"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// GetUsers lists all existing user accounts
// @Summary List users
// @Description Get a list of users
// @Tags User
// @Accept json
// @Produce json
// @Success 200 {array} model.PostUser
// @Router /user [get]
func GetUsers(db *gorm.DB,c *gin.Context) {
	var users []model.User
	result := db.Find(&users)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "No users found!"})
		return
	}
	c.AsciiJSON(http.StatusOK, users)
}

// PostUser creates a new user account
// @Summary Create user
// @Description Create a new user
// @Tags User
// @Accept json
// @Produce json
// @Param user body string true "User"
// @Success 200 {object} string
// @Router /user [post]
func PostUser(db *gorm.DB, c *gin.Context) {
	var user model.User
	c.BindJSON(&user)
	result := db.Create(&user)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Error inserting user!"})
		return
	}
	c.AsciiJSON(http.StatusOK, user)
}