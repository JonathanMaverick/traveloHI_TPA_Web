package model

type Airline struct {
	ID   uint   `json:"airlineID"`
	AirlineName string `json:"airlineName"`
	AirlineLogo string `json:"airlineLogo"`
}
