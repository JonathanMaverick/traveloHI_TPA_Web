package model

type Plane struct {
	PlaneID       uint   `json:"planeID" gorm:"primaryKey;autoIncrement"`
	PlaneCode     string `json:"planeCode" gorm:"unique"`
	AirlineID     uint   `json:"airlineID" gorm:"foreignKey:AirlineID; ON DELETE CASCADE; ON UPDATE CASCADE"`
	EconomySeats  uint   `json:"economySeats"`
	BusinessSeats uint   `json:"businessSeats"`
}