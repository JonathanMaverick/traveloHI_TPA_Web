package controller

import (
	"fmt"
	"net/http"
	"net/mail"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/model"
	"github.com/gin-gonic/gin"
	age "github.com/theTardigrade/golang-age"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/gomail.v2"
)

// GetUsers lists all existing user accounts
// @Summary List users
// @Description Get a list of users
// @Tags User
// @Accept json
// @Produce json
// @Success 200 {array} model.User
// @Router /user [get]
func GetUsers(c *gin.Context) {
	var users []model.User
	result := config.DB.Find(&users)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "No users found!"})
		return
	}
	c.AsciiJSON(http.StatusOK, users)
}

// GetUser lists a specific user account
// @Summary Get a user
// @Description Get a specific user account
// @Tags User
// @Accept json
// @Produce json
// @Param userId path int true "User ID"
// @Success 201 {object} model.User
// @Router /user/{userId} [get]
func GetUser(c *gin.Context) {
	userIdStr := c.Param("userId")
	userId, err := strconv.Atoi(userIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Invalid user ID"})
		return
	}
	var user model.User
	result := config.DB.First(&user, userId)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "No user found!"})
		return
	}
	c.AsciiJSON(http.StatusOK, user)
}

func isNameValid(name string) bool {
    return regexp.MustCompile("^[a-zA-Z\\s]+$").MatchString(name) && len(name) > 5
}

// CreateUser creates a new user account
// @Summary Create user
// @Description Create a new user account
// @Tags User
// @Accept json
// @Produce json
// @Param user body model.User true "User details"
// @Success 201 {object} model.User
// @Router /user [post]
func CreateUser(c *gin.Context) {
    var newUser model.User
	c.ShouldBindJSON(&newUser)

	if newUser.Email == "" || newUser.FirstName == "" || newUser.LastName == "" || newUser.DOB == "" || newUser.Gender == "" || newUser.ProfilePicture == "" || newUser.PersonalSecurityAnswer == "" {
		c.String(http.StatusBadRequest, "All Field are required")
		return
	}

	if !isNameValid(strings.TrimSpace(newUser.FirstName)) {
		c.String(http.StatusBadRequest, "First name must be at least 5 characters long")
        return
    }

	if !isNameValid(strings.TrimSpace(newUser.LastName)) {
		c.String(http.StatusBadRequest, "Last name must be at least 5 characters long")
        return
    }

	_, err := mail.ParseAddress(newUser.Email)
	if err != nil {
		c.String(200, "Invalid Email Format")
		return
	}

	dob, err := time.Parse("2006-01-02", newUser.DOB)
	if err != nil {
		c.String(http.StatusBadRequest, "Invalid date format")
		return
	}
	dateAge := age.CalculateToNow(dob)

	if dateAge < 13{
		c.String(http.StatusBadRequest, "You must be at least 13 years old")
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), 10)
	if err != nil {
		panic(err)
	}
	newUser.Password = string(hashedPassword)
	newUser.Role = "user"
	newUser.Status = "active"
	newUser.Wallet = 0

	result := config.DB.Create(&newUser)
    if result.Error != nil {
        c.String(http.StatusInternalServerError, "Email duplicated")
        return
    }

	from := "VKTraveloHI@gmail.com"
	password := "kpbyhdkeontawsvu"
	subject := "User Created!"
	body := "You just created an account on TraveloHI made by VK23-2!"

	m := gomail.NewMessage()
	m.SetHeader("From", from)
	m.SetHeader("To", newUser.Email)
	m.SetHeader("Subject", subject)
	m.SetBody("text/plain", body)

	dialer := gomail.NewDialer("smtp.gmail.com", 587, from, password)

	if err := dialer.DialAndSend(m); err != nil {
		fmt.Println(err)
	}
	
    c.String(http.StatusCreated, "Success create user")
}