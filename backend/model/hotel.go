package model

type Hotel struct {
	HotelID     uint   `json:"hotelID" gorm:"primaryKey;autoIncrement"`
	Name        string `json:"hotelName"`
	Description string `json:"hotelDescription"`
	Address     string `json:"hotelAddress"`
	City        string `json:"hotelCity"`

	HotelPictures []HotelPicture `json:"hotelPictures" gorm:"foreignKey:HotelID"`
	HotelFacilities []HotelFacilities `json:"hotelFacilities" gorm:"foreignKey:HotelID"`
}