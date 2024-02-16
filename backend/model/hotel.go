package model

type Hotel struct {
	ID          uint   `json:"hotelID"`
	Name        string `json:"hotelName" gorm:"unique"`
	Description string `json:"hotelDescription"`
	Address     string `json:"hotelAddress"`
	City        string `json:"hotelCity"`

	HotelPictures   []HotelPicture    `json:"hotelPictures" gorm:"foreignKey:HotelID"`
	HotelFacilities []HotelFacilities `json:"hotelFacilities" gorm:"foreignKey:HotelID"`
	Rooms           []Room            `json:"rooms" gorm:"foreignKey:HotelID"`
	Reviews         []Review          `json:"reviews" gorm:"foreignKey:HotelID"`
}