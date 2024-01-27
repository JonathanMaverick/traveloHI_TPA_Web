package model

type RoomPicture struct {
	ID uint   `json:"roomPictureID"`
	RoomID        uint   `json:"roomID" gorm:"foreignKey:RoomID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	RoomPicture   string `json:"roomPicture"`
}