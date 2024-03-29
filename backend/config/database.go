package config

import (
	"github.com/JonathanMaverickTPA_Web/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func migrate(db *gorm.DB){
	
	db.AutoMigrate(&model.User{})
	db.AutoMigrate(&model.OTP{})

	//Hotel
	db.AutoMigrate(&model.Hotel{})
	db.AutoMigrate(&model.Room{})
	db.AutoMigrate(&model.Facilities{})
	db.AutoMigrate(&model.HotelPicture{})
	db.AutoMigrate(&model.HotelFacilities{})
	db.AutoMigrate(&model.RoomPicture{})
	db.AutoMigrate(&model.HotelTransaction{})

	//Flight
	db.AutoMigrate(&model.Airport{})
	db.AutoMigrate(&model.Airline{})
	db.AutoMigrate(&model.Plane{})
	db.AutoMigrate(&model.FlightSchedule{})
	db.AutoMigrate(&model.FlightCart{})
	db.AutoMigrate(&model.Seat{})

	//Search
	db.AutoMigrate(&model.Search{})

	//Payment
	db.AutoMigrate(&model.PaymentType{})
	db.AutoMigrate(&model.CreditCard{})

	//Flight Transaction
	db.AutoMigrate(&model.FlightTransaction{})
	db.AutoMigrate(&model.FlightCart{})

	//Hotel Transaction
	db.AutoMigrate(&model.HotelTransaction{})
	db.AutoMigrate(&model.HotelCart{})

	db.AutoMigrate(&model.Review{})
	db.AutoMigrate(&model.Promo{})
}

func Connect (){
	dsn := "host=localhost user=jonathanmaverick password=postgres dbname=TraveloHI port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil{
		panic(err)
	}

	migrate(db);

	DB = db
}