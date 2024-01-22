package model

import "time"

type FlightDetail struct {
	FlightDetailID uint `json:"flightDetailID" gorm:"primaryKey;autoIncrement"`
	FlightScheduleID uint `json:"flightScheduleID" gorm:"foreignKey:FlightScheduleID"`
	PlaneID uint `json:"planeID" gorm:"foreignKey:PlaneID"`
	OriginAirportID uint `json:"originAirportID" gorm:"foreignKey:AirportID"`
	DestinationAirportID uint `json:"destinationAirportID" gorm:"foreignKey:AirportID"`
	ArrivalDate time.Time `json:"arrivalDate"`
	DepartureDate time.Time `json:"departureDate"`

	Plane Plane `gorm:"foreignKey:PlaneID"`
	OriginAirport Airport `gorm:"foreignKey:AirportID"`
	DestinationAirport Airport `gorm:"foreignKey:AirportID"`
}