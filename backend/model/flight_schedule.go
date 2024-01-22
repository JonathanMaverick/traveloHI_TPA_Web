package model

type FlightSchedule struct {
	FlightScheduleID uint `json:"flightScheduleID" gorm:"primaryKey;autoIncrement"`
	FlightDetail[] FlightDetail `json:"flightDetail" gorm:"foreignKey:FlightScheduleID"`
}