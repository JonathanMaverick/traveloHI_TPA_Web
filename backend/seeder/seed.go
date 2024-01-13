package seed

import (
	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/model"
)

func Seed() {
	db := config.DB;
	users := []model.User{
		{
			Email:                   "john.doe@example.com",
			Password:                "test_password", 
			FirstName:               "John",
			LastName:                "Doe",
			DOB:                     "2020-04-02", 
			Gender:                  "Male",
			ProfilePicture:          "profile_picture_url",
			PersonalSecurityAnswer: "Dog",
			SubscribedToNewsletter:   true,
			Status:                  "Active",
			Role:                    "User",
			Wallet:                  0, 
		},
	}

	roomType := []model.BedType{
		{
			BedName: "Grand Suite Room",
		},
		{
			BedName: "Royal Suite Room",
		},
	}

	hotel := []model.Hotel{{
			Name: "Hotel 1",
			Address: "Address 1",
			Description: "Description 1",
		},
		{
			Name: "Hotel 2",
			Address: "Address 2",
			Description: "Description 2",
		},
	}

	room := []model.Room{{
			HotelID:    1,
			BedTypeID:  2,
			Price:      100,
			Occupancy:  1,
			Quantity:   5,
		},
		{
			HotelID:    2,
			BedTypeID:  1,
			Price:      150,
			Occupancy:  2,
			Quantity:   3,
		},
	}


	db.Create(&hotel)
	db.Create(&roomType)
	db.Create(&room)
	db.Create(&users)
}