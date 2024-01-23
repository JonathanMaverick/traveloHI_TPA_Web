package model

import "time"

type FlightSchedule struct {
	FlightScheduleID       uint    `json:"flightScheduleID" gorm:"primaryKey:FlightScheduleID"`
	PlaneID               uint    `json:"planeID" gorm:"foreignKey:PlaneID"`
	OriginAirportID       uint    `json:"originAirportID" gorm:"foreignKey:AirportID"`
	DestinationAirportID  uint    `json:"destinationAirportID" gorm:"foreignKey:AirportID"`
	BusinessPrice    uint64  `json:"businessPrice"`  // Adjusted field name
	EconomyPrice     uint64  `json:"economyPrice"`   // Adjusted field name
	ArrivalTime           time.Time `json:"arrivalTime"`
	DepartureTime         time.Time `json:"departureTime"`

	// Plane                 Plane   `gorm:"foreignKey:PlaneID"`
	// OriginAirport         Airport `gorm:"foreignKey:AirportID"`
	// DestinationAirport    Airport `gorm:"foreignKey:AirportID"`
}
