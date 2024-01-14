package model


type User struct {
	UserID                 uint      `json:"userID" gorm:"primaryKey;autoIncrement"`
	Email                  string    `json:"email" gorm:"unique"`
	Password               string    `json:"password"`
	FirstName              string    `json:"firstName"`
	LastName               string    `json:"lastName"`
	DOB                    string 	 `json:"dob"`
	Gender                 string    `json:"gender"`
	ProfilePicture         string    `json:"profilePicture"`
	PersonalSecurityAnswer string    `json:"personalSecurityAnswer"`
	SubscribedToNewsletter bool      `json:"subscribedToNewsletter"`
	Status                 string    `json:"status"`
	Role                   string    `json:"role"`
	Wallet                 float64   `json:"wallet"`
}
