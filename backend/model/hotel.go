package model

type Hotel struct {
	HotelID     uint   `json:"hotelID" gorm:"primaryKey;autoIncrement"`
	Name        string `json:"hotelName"`
	Description string `json:"hotelDescription"`
	Address     string `json:"hotelAddress"`

	HotelPictures []HotelPicture `json:"hotelPictures" gorm:"foreignKey:HotelID"`
}