package model

type HotelRating struct{
	Cleanliness float32 `json:"cleanliness"`
	Service float32 `json:"service"`
	Location float32 `json:"location"`
	Comfort float32 `json:"comfort"`
	HotelID int `json:"hotel_id"`
}