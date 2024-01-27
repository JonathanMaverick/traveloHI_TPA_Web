package model

type Seat struct {
	ID               uint   `json:"seatID"`
	SeatNumber       string `json:"seatNumber"`
	SeatType         string `json:"seatType"`
	SeatStatus       string `json:"seatStatus"`
	FlightScheduleID uint   `json:"flightScheduleID"`
	PlaneID          uint   `json:"planeID"`
}