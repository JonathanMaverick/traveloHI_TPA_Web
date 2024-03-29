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
	IsReviewed	   	bool    `json:"isReviewed"`
	PromoID			uint	`json:"promoID"`

	User           User           `gorm:"foreignKey:UserID"`
	Hotel 		 Hotel           `gorm:"foreignKey:HotelID"`
	Room           Room           `gorm:"foreignKey:RoomID"`
	Payment        PaymentType    `gorm:"foreignKey:PaymentID"`
}

type HotelCart struct {
	ID               uint    `json:"id"`
	HotelID uint    `json:"hotelID"`
	UserID           uint    `json:"userID"`
	RoomID           uint    `json:"roomID"`
	Price            float64 `json:"price"`
	CheckInDate      string  `json:"checkInDate"`
	CheckOutDate     string  `json:"checkOutDate"`
	PromoCode        string  `json:"promoCode"`
	PaymentID        uint    `json:"paymentID"`

	User           User           `gorm:"foreignKey:UserID"`
	Room           Room           `gorm:"foreignKey:RoomID"`
	Hotel Hotel `gorm:"foreignKey:HotelID"`
}