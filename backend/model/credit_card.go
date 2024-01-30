package model

type CreditCard struct {
	ID           uint   `json:"creditCardID"`
	CardNumber  string `json:"cardNumber" gorm:"unique"`
	CardHolder  string `json:"cardHolderName"`
	CVV		 string `json:"cvv"`
	ExpiredDate string `json:"expiredDate"`
	PostalCode  string `json:"postalCode"`
	UserID       uint   `json:"userID"`
}