package model

type Room struct {
	RoomID    uint   `json:"roomID" gorm:"primaryKey;autoIncrement"`
	RoomName  string `json:"roomName"`
	HotelID   uint   `json:"hotelID" gorm:"foreignKey:HotelID;references:HotelID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	BedTypeID uint   `json:"roomTypeID" gorm:"foreignKey:BedTypeID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Price     int64  `json:"price"`
	Occupancy int    `json:"occupancy"`
	Quantity  int    `json:"quantity"`
}
