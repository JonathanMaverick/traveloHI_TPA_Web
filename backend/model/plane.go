package model

type Plane struct {
	ID       uint   `json:"planeID"`
	PlaneCode     string `json:"planeCode" gorm:"unique"`
	AirlineID     uint   `json:"airlineID"`
	EconomySeats  uint   `json:"economySeats"`
	BusinessSeats uint   `json:"businessSeats"`

	Airline Airline `gorm:"foreignKey:AirlineID"`
}