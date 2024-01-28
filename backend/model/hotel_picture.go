package model

type HotelPicture struct {
	ID              uint   `json:"hotelPictureID"`
	HotelID         uint   `json:"hotelID" gorm:"foreignKey:HotelID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	HotelPictureURL string `json:"hotelPicture"`
}