package model

type Facilities struct {
	FacilitiesID   uint   `json:"facilitiesID" gorm:"primaryKey;autoIncrement"`
	FacilitiesName string `json:"facilitiesName"`
}