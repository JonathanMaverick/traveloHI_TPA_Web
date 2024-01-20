package model

type RoomPicture struct {
	RoomPictureID uint   `json:"roomPictureID" gorm:"primaryKey;autoIncrement"`
	RoomID        uint   `json:"roomID" gorm:"foreignKey:RoomID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	RoomPicture   string `json:"roomPicture"`
}