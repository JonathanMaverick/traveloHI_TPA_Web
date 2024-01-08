package model

import (
	"time"
)

type User struct {
	ID 			uint `gorm:"primaryKey"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	CreatedAt time.Time
    UpdatedAt time.Time
}