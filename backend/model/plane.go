package model

type Plane struct{
	PlaneID uint `json:"planeID" gorm:"primaryKey;autoIncrement"`
	PlaneCode string `json:"planeCode"`
	AirlineID uint `json:"airlineID" gorm:"foreignKey:AirlineID; ON DELETE CASCADE; ON UPDATE CASCADE"`
	Economy uint `json:"economy"`
	Business uint `json:"business"`
}