package controller

import (
	"net/http"

	"github.com/JonathanMaverickTPA_Web/model"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// ListUsers lists all existing accounts
//  @Summary      List users
//  @Description  get users
//  @Tags         User
//  @Accept       json
//  @Produce      json
//  @Success      200  {array}   model.PostUser
//  @Router       /user [get]
func GetUsers(db *gorm.DB,c *gin.Context) {
	var users []model.User
	result := db.Find(&users)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "No users found!"})
		return
	}
	c.AsciiJSON(http.StatusOK, users)
}

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