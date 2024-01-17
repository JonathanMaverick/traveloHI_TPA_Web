package model

type Hotel struct {
	HotelID     uint   `json:"hotelID" gorm:"primaryKey;autoIncrement"`
	Name        string `json:"hotelName"`
	Description string `json:"description"`
	Address     string `json:"address"`
}