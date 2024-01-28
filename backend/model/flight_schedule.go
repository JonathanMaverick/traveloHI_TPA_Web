package model

type FlightSchedule struct {
	ID                   uint   `json:"flightScheduleID"`
	PlaneID              uint   `json:"planeID"`
	OriginAirportID      uint   `json:"originAirportID"`
	DestinationAirportID uint   `json:"destinationAirportID"`
	BusinessPrice        uint64 `json:"businessPrice"`
	EconomyPrice         uint64 `json:"economyPrice"`
	ArrivalTime          string `json:"arrivalTime"`
	DepartureTime        string `json:"departureTime"`

	Plane              Plane   `gorm:"foreignKey:PlaneID"`
	OriginAirport      Airport `gorm:"foreignKey:OriginAirportID"`
	DestinationAirport Airport `gorm:"foreignKey:DestinationAirportID"`
}
