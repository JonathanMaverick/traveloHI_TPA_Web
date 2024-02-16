package model

type Review struct {
	ID uint `json:"reviewID"`
	Review string `json:"review"`
	UserID string `json:"userID"`
	HotelID string `json:"hotelID"`
	Cleanliness int `json:"cleanliness"`
	Comfort int `json:"comfort"`
	Location int `json:"location"`
	Service int `json:"service"`
	IsAnonymous bool `json:"isAnonymous"`
}