package model

type Promo struct{
	ID uint `json:"promoID"`
	PromoCode string `json:"promoCode" gorm:"unique"`
	PromoDiscount       int64         `json:"promoDiscount"`
	PromoPicture string `json:"promoPicture"`
}