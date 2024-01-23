package model

type FlightSchedule struct {
	FlightScheduleID     uint   `json:"flightScheduleID" gorm:"primaryKey:FlightScheduleID"`
	PlaneID              uint   `json:"planeID" gorm:"foreignKey:PlaneID"`
	OriginAirportID      uint   `json:"originAirportID" gorm:"foreignKey:AirportID"`
	DestinationAirportID uint   `json:"destinationAirportID" gorm:"foreignKey:AirportID"`
	BusinessPrice        uint64 `json:"businessPrice"`
	EconomyPrice         uint64 `json:"economyPrice"`
	ArrivalTime          string `json:"arrivalTime"`
	DepartureTime        string `json:"departureTime"`

	Plane                 Plane   `gorm:"foreignKey:PlaneID"`
	OriginAirport         Airport `gorm:"foreignKey:AirportID"`
	DestinationAirport    Airport `gorm:"foreignKey:AirportID"`
}
