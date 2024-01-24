package model

type Facilities struct {
	ID   uint   `json:"facilitiesID" gorm:"primaryKey;autoIncrement"`
	FacilitiesName string `json:"facilitiesName"`
}