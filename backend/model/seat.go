package model

type Seat struct {
	SeatID uint `json:"seatID" gorm:"primaryKey;autoIncrement"`
	SeatNumber string `json:"seatNumber"`
	SeatType string `json:"seatType"`
	SeatStatus string `json:"seatStatus"`
	FlightScheduleID uint `json:"flightScheduleID" gorm:"foreignKey:FlightScheduleID"`
}