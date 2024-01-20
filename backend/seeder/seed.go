package seed

import (
	"fmt"

	"github.com/JonathanMaverickTPA_Web/config"
)

func Seed() {
	db := config.DB;
	fmt.Println(db)
	// users := []model.User{
	// 	{
	// 		Email:                   "john.doe@example.com",
	// 		Password:                "test_password", 
	// 		FirstName:               "John",
	// 		LastName:                "Doe",
	// 		DOB:                     "2020-04-02", 
	// 		Gender:                  "Male",
	// 		ProfilePicture:          "profile_picture_url",
	// 		SecurityQuestion:        "What is your pet's name?",
	// 		PersonalSecurityAnswer: "Dog",
	// 		SubscribedToNewsletter:   true,
	// 		Status:                  "Active",
	// 		Role:                    "User",
	// 		Wallet:                  0, 
	// 	},
	// }

	// hotel := []model.Hotel{
	// 	{
	// 		Name: "Hotel 1",
	// 		Address: "Address 1",
	// 		Description: "Description 1",
	// 	},
	// 	{
	// 		Name: "Hotel 2",
	// 		Address: "Address 2",
	// 		Description: "Description 2",
	// 	},
	// }

	// room := []model.Room{
	// 	{
	// 		HotelID:    1,
	// 		BedTypeID:  2,
	// 		Price:      100,
	// 		Occupancy:  1,
	// 		Quantity:   5,
	// 	},
	// 	{
	// 		HotelID:    2,
	// 		BedTypeID:  1,
	// 		Price:      150,
	// 		Occupancy:  2,
	// 		Quantity:   3,
	// 	},
	// }

	// facilities := []model.Facilities{
	// 	{
	// 		FacilitiesName: "Swimming Pool",
	// 	},
	// 	{
	// 		FacilitiesName: "Gym",
	// 	},
	// 	{
	// 		FacilitiesName : "Wifi",
	// 	},
	// 	{
	// 		FacilitiesName : "Breakfast",
	// 	},
	// 	{
	// 		FacilitiesName : "Parking",
	// 	},
	// 	{
	// 		FacilitiesName : "Spa",
	// 	},
	// 	{
	// 		FacilitiesName : "Restaurant",
	// 	},
	// 	{
	// 		FacilitiesName : "Bar",
	// 	},
	// 	{
	// 		FacilitiesName : "Airport Shuttle",
	// 	},
	// 	{
	// 		FacilitiesName : "Lift",
	// 	},
	// }


	// db.Create(&hotel)
	// db.Create(&room)
	// db.Create(&users)
	// db.Create(&facilities)
}