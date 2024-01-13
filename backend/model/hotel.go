package model

type Hotel struct {
	HotelID     uint   `json:"hotelID" gorm:"primaryKey;autoIncrement"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Address     string `json:"address"`
}