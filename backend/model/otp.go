package model

import "time"

type OTP struct {
	ID     uint      `json:"otp"`
	OTPValue  string    `json:"otpValue"`
	UserEmail string   	`json:"userEmail"`
	ExpiredAt time.Time `json:"expiredAt"`
}