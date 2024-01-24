package model

import "time"

type OTP struct {
	ID     uint      `json:"otp" gorm:"primaryKey;autoIncrement"`
	OTPValue  string    `json:"otpValue"`
	UserEmail string   	`json:"userEmail"`
	ExpiredAt time.Time `json:"expiredAt"`
}