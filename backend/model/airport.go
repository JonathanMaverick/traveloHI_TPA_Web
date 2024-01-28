package model

type Airport struct {
	ID              uint   `json:"airportID"`
	AirportName     string `json:"airportName"`
	AirportLocation string `json:"airportLocation"`
	AirportCode     string `json:"airportCode" gorm:"unique"`
}