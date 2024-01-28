package model

type FlightTransaction struct {
	ID               uint    `json:"id"`
	FlightScheduleID uint    `json:"flightScheduleID"`
	UserID           uint    `json:"userID"`
	SeatID           uint    `json:"seatID"`
	PaymentID        uint    `json:"paymentID"`
	Price            float64 `json:"price"`
	AddOnLuggage     bool    `json:"addOnLuggage"`

	FlightSchedule FlightSchedule `gorm:"foreignKey:FlightScheduleID"`
	User           User           `gorm:"foreignKey:UserID"`
	Seat           Seat           `gorm:"foreignKey:SeatID"`
	Payment        PaymentType    `gorm:"foreignKey:PaymentID"`
}