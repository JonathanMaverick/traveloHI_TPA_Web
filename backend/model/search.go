package model

import "time"

type Search struct {
	ID     uint       `json:"id"`
	Search string    `json:"search"`
	UserID uint       `json:"userID"`
	Time   time.Time `json:"time"`
}