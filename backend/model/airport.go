package model

type Airport struct{
	AirportID uint `json:"airportID" gorm:"primaryKey;autoIncrement"`
	AirportName string `json:"airportName"`
	AirportLocation string `json:"airportLocation"`
	AirportCode string `json:"airportCode" gorm:"unique"`
}