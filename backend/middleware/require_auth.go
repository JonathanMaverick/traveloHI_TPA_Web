package middleware

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/model"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func RequireAuthentication(c *gin.Context) {

	type JWTToken struct {
		TokenString string `json:"token"`
	}

	var token JWTToken
	c.BindJSON(&token)

	if token.TokenString == "" {
		c.String(http.StatusUnauthorized, "Unauthorized")
		return
	}

	result, err := jwt.Parse(token.TokenString, func(token *jwt.Token) (interface{}, error) {

		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("SECRETKEY")), nil

	})

	if err != nil {
		c.String(200, "Token Parsing Failed")
		return
	}

	if claims, ok := result.Claims.(jwt.MapClaims); ok && result.Valid {

		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.String(200, "Cookie Expired")
			return
		}
		var user model.User
		config.DB.First(&user, "email = ?", claims["sub"])
		if user.UserID == 0 {
			c.String(http.StatusBadRequest, "Email not found")
		} 
		c.Set("user", user)
		c.Next()
	} else {
		c.String(http.StatusBadGateway, "Server Error")
	}
}