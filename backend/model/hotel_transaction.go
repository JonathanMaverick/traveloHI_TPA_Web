package model

type HotelTransaction struct {
	ID               uint    `json:"id"`
	HotelID uint    `json:"hotelID"`
	UserID           uint    `json:"userID"`
	RoomID           uint    `json:"roomID"`
	PaymentID        uint    `json:"paymentID"`
	Price            float64 `json:"price"`
	CheckInDate      string  `json:"checkInDate"`
	CheckOutDate     string  `json:"checkOutDate"`

	User           User           `gorm:"foreignKey:UserID"`
	Hotel 		 Hotel           `gorm:"foreignKey:HotelID"`
	Room           Room           `gorm:"foreignKey:RoomID"`
	Payment        PaymentType    `gorm:"foreignKey:PaymentID"`
}

type HotelCart struct {
	ID               uint    `json:"id"`
	HotelID uint    `json:"flightScheduleID"`
	UserID           uint    `json:"userID"`
	RoomID           uint    `json:"seatID"`
	Price            float64 `json:"price"`
	CheckInDate      string  `json:"checkInDate"`
	CheckOutDate     string  `json:"checkOutDate"`

	User           User           `gorm:"foreignKey:UserID"`
	Room           Room           `gorm:"foreignKey:RoomID"`
	Hotel Hotel `gorm:"foreignKey:HotelID"`
}