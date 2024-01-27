package model

type Room struct {
	ID      uint          `json:"roomID"`
	RoomName    string        `json:"roomName"`
	HotelID     uint          `json:"hotelID" gorm:"foreignKey:HotelID;references:HotelID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Price       int64         `json:"price"`
	Occupancy   int           `json:"occupancy"`
	Quantity    int           `json:"quantity"`
	BedType     string        `json:"bedType"`
	RoomPicture []RoomPicture `json:"roomPicture" gorm:"foreignKey:RoomID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
}
