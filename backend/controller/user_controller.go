package controller

import (
	"fmt"
	"math/rand"
	"net/http"
	"net/mail"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/model"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
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
    pattern := regexp.MustCompile(`^[a-zA-Z\s]+$`)
	return pattern.MatchString(name) && len(name) > 5
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
		c.String(http.StatusBadRequest, "Invalid Email Format")
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
        c.String(http.StatusBadRequest, "Email duplicated")
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


// Login logs in a user
// @Summary Login user
// @Description Login a user
// @Tags User
// @Accept json
// @Produce json
// @Param user body string true "User details"
// @Success 200 {string} string
// @Router /user/login [post]
func Login(c *gin.Context){

	var loginAttempt, user model.User;
	c.ShouldBindJSON(&loginAttempt)

	config.DB.First(&user, "email = ?", loginAttempt.Email)
	if user.ID == 0 {
		c.String(http.StatusBadRequest, "Email not found")
		return
	}

	_, err := mail.ParseAddress(loginAttempt.Email)
	if err != nil {
		c.String(http.StatusBadRequest, "Invalid Email Format")
		return
	}

	err_pass := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginAttempt.Password))
	if err_pass != nil {
		c.String(http.StatusBadRequest, "Invalid Password")
		return
	}

	if user.Status != "active" {
		c.String(http.StatusBadRequest, "You Are Banned")
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.Email,
		"exp":  time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRETKEY")))
	if err != nil {
		c.String(200, "Failed to Create Token")
		return
	}
	c.SetSameSite(http.SameSiteNoneMode)
	c.SetCookie("token", tokenString, 3600 * 72, "", "", true, true)
	fmt.Print(tokenString)
	c.JSON(
		http.StatusOK,
		gin.H{
		"token" : tokenString,
		"user" : user,
	})
}

func Authenticate(c *gin.Context) {
	user, _ := c.Get("user")
	c.JSON(200, user)
}

func RequestOTP(c *gin.Context){
	var otpRequest model.OTP
	c.ShouldBindJSON(&otpRequest)

	var user model.User;
	config.DB.First(&user, "email = ?", otpRequest.UserEmail)
	if user.ID == 0 {
		c.String(http.StatusBadRequest, "Email not found")
		return
	}

	var otp model.OTP;
	config.DB.First(&otp, "user_email = ?", otpRequest.UserEmail)
	if otp.ID != 0 {
		c.String(http.StatusBadRequest, "OTP already sent")
		return
	}

	otpRequest.ExpiredAt = time.Now().Add(time.Minute * 10)
	rand.New(rand.NewSource(time.Now().UnixNano()))
	otpRequest.OTPValue = fmt.Sprintf("%06d", rand.Intn(999999))

	from := "VKTraveloHI@gmail.com"
	password := "kpbyhdkeontawsvu"
	subject := "OTP"
	body := "Your TraveloHI OTP code is " + otpRequest.OTPValue + ", valid for 10 minutes. Beware of fraud! NEVER share this code with anyone."

	m := gomail.NewMessage()
	m.SetHeader("From", from)
	m.SetHeader("To", otpRequest.UserEmail)
	m.SetHeader("Subject", subject)
	m.SetBody("text/plain", body)

	dialer := gomail.NewDialer("smtp.gmail.com", 587, from, password)

	if err := dialer.DialAndSend(m); err != nil {
		fmt.Println(err)
	}

	config.DB.Create(&otpRequest)
	c.String(http.StatusOK, "OTP Sent")
}

func LoginOTP(c *gin.Context){
	var otpRequest model.OTP
	c.ShouldBindJSON(&otpRequest)

	if otpRequest.OTPValue == "" || otpRequest.UserEmail == "" {
		c.String(http.StatusBadRequest, "All Field are required")
		return
	}

	var user model.User;
	config.DB.First(&user, "email = ?", otpRequest.UserEmail)
	if user.Status != "active" {
		c.String(http.StatusBadRequest, "You Are Banned")
		return
	}

	var otp model.OTP;
	config.DB.First(&otp, "user_email = ?", otpRequest.UserEmail)
	if otp.ID == 0 {
		c.String(http.StatusBadRequest, "OTP not found")
		return
	}

	if otpRequest.OTPValue != otp.OTPValue {
		c.String(http.StatusBadRequest, "Invalid OTP")
		return
	}

	if time.Now().After(otp.ExpiredAt) {
		c.String(http.StatusBadRequest, "OTP Expired")
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": otpRequest.UserEmail,
		"exp":  time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRETKEY")))
	if err != nil {
		c.String(200, "Failed to Create Token")
		return
	}

	config.DB.Delete(&otp)
	c.String(http.StatusOK, tokenString)
}

func GetUserSecurityQuestion(c *gin.Context) {
	var user model.User
	c.ShouldBindJSON(&user)

	var userSecurityQuestion model.User
	config.DB.First(&userSecurityQuestion, "email = ?", user.Email)
	if userSecurityQuestion.ID == 0 {
		c.String(http.StatusBadRequest, "Email not found")
		return
	}

	if userSecurityQuestion.Status != "active" {
		c.String(http.StatusBadRequest, "You Are Banned")
		return
	}

	c.JSON(http.StatusOK, userSecurityQuestion.SecurityQuestion)
}

func ValidateSecurityAnswer(c *gin.Context){
	var user model.User
	c.ShouldBindJSON(&user)

	var userSecurityQuestion model.User
	config.DB.First(&userSecurityQuestion, "email = ?", user.Email)
	if userSecurityQuestion.ID == 0 {
		c.String(http.StatusBadRequest, "Email not found")
		return
	}

	if userSecurityQuestion.Status != "active" {
		c.String(http.StatusBadRequest, "You Are Banned")
		return
	}

	if userSecurityQuestion.PersonalSecurityAnswer != user.PersonalSecurityAnswer {
		c.String(http.StatusBadRequest, "Invalid Answer")
		return
	}

	c.JSON(http.StatusOK, "Success")
}

func ChangePassword(c *gin.Context) {
    var userAttempt model.User
    c.ShouldBindJSON(&userAttempt)

    var user model.User
    config.DB.First(&user, "email = ?", userAttempt.Email)
    if user.ID == 0 {
        c.String(http.StatusBadRequest, "Email not found")
        return
    }

	if user.Status != "active" {
		c.String(http.StatusBadRequest, "You Are Banned")
		return
	}

    err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(userAttempt.Password))
    if err == nil {
        c.String(http.StatusBadRequest, "Password can't be the same as the old password")
        return
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(userAttempt.Password), 10)
    if err != nil {
        panic(err)
    }
    user.Password = string(hashedPassword)

    config.DB.Save(&user)
    c.String(http.StatusOK, "Success")
}

func BanUser(c *gin.Context) {
	var user model.User
	c.ShouldBindJSON(&user)

	var userBan model.User
	config.DB.First(&userBan, "email = ?", user.Email)
	if userBan.ID == 0 {
		c.String(http.StatusBadRequest, "Email not found")
		return
	}

	if userBan.Status != "active" {
		c.String(http.StatusBadRequest, "You Are Banned")
		return
	}

	userBan.Status = "banned"
	config.DB.Save(&userBan)
	c.String(http.StatusOK, "Success")
}

func UnbanUser(c *gin.Context) {
	var user model.User
	c.ShouldBindJSON(&user)

	var userBan model.User
	config.DB.First(&userBan, "email = ?", user.Email)
	if userBan.ID == 0 {
		c.String(http.StatusBadRequest, "Email not found")
		return
	}

	if userBan.Status != "banned" {
		c.String(http.StatusBadRequest, "You Are Not Banned")
		return
	}

	userBan.Status = "active"
	config.DB.Save(&userBan)
	c.String(http.StatusOK, "Success")
}