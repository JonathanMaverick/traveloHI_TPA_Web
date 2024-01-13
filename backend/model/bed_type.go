package model

type BedType struct {
	BedTypeID uint   `json:"roomTypeID" gorm:"primaryKey;autoIncrement"`
	BedName   string `json:"roomName"`
}