package model

import "time"

type FlightSchedule struct {
	FlightScheduleID uint `json:"flightScheduleID" gorm:"primaryKey:FlightScheduleID"`
	PlaneID uint `json:"planeID" gorm:"foreignKey:PlaneID"`
	OriginAirportID uint `json:"originAirportID" gorm:"foreignKey:AirportID"`
	DestinationAirportID uint `json:"destinationAirportID" gorm:"foreignKey:AirportID"`
	BusinessSeatsPrice float64 `json:"businessSeatsPrice"`
	EconomySeatsPrice float64 `json:"economySeatsPrice"`
	ArrivalTime time.Time `json:"arrivalTime"`
	DepartureTime time.Time `json:"departureTime"`

	Plane Plane `gorm:"foreignKey:PlaneID"`
	OriginAirport Airport `gorm:"foreignKey:AirportID"`
	DestinationAirport Airport `gorm:"foreignKey:AirportID"`
}