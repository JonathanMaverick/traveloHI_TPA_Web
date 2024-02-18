package model

type Review struct {
	ID uint `json:"reviewID"`
	Review string `json:"review"`
	UserID uint `json:"userID"`
	HotelID uint `json:"hotelID"`
	Cleanliness int `json:"cleanliness"`
	Comfort int `json:"comfort"`
	Location int `json:"location"`
	Service int `json:"service"`
	IsAnonymous bool `json:"isAnonymous"`
	TransactionID uint `json:"transactionID"`

	User User `json:"user" gorm:"foreignKey:UserID"`
}