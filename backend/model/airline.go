package model

type Airline struct{
	AirlineID uint `json:"airlineID" gorm:"primaryKey;autoIncrement"`
	AirlineName string `json:"airlineName"`
	AirlineLogo string `json:"airlineLogo"`

	Plane[] Plane `json:"plane" gorm:"foreignKey:AirlineID"`
}