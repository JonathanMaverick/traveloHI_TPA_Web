package model

type HotelFacilities struct {
	ID uint `json:"hotelFacilitiesID" gorm:"primaryKey;autoIncrement"`
	HotelID           uint `json:"hotelID" gorm:"foreignKey:HotelID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	FacilitiesID      uint `json:"facilitiesID" gorm:"foreignKey:FacilitiesID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`

	Facilities Facilities `json:"facilities"`
}
