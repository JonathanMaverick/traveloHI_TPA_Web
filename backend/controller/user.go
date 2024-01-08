package controller

import (
	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/model"
	"github.com/gin-gonic/gin"
)

// ListUsers godoc
// @Summary      List users
// @Description  get users
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        q    query     string  false  "name search by q"  Format(email)
// @Success      200  {array}   model.User
// @Failure      400  {object}  httputil.HTTPError
// @Failure      404  {object}  httputil.HTTPError
// @Failure      500  {object}  httputil.HTTPError
// @Router       /users [get]
func getUsers(c *gin.Context) {
	var users []model.User
	config.DB.Find(&users)
	if len(users) <= 0 {
		c.JSON(404, gin.H{"status": 404, "message": "No users found!"})
		return
	}
	c.JSON(200, users)
}