package config

import (
	"github.com/JonathanMaverickTPA_Web/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func migrate(db *gorm.DB){

	// db.Migrator().DropTable(&model.Hotel{})
	// db.Migrator().DropTable(&model.BedType{})
	// db.Migrator().DropTable(&model.Room{})
	// db.Migrator().DropTable(&model.User{})

	db.AutoMigrate(&model.User{})
	db.AutoMigrate(&model.Hotel{})
	db.AutoMigrate(&model.BedType{})
	db.AutoMigrate(&model.Room{})
	db.AutoMigrate(&model.OTP{})
	db.AutoMigrate(&model.Facilities{})
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
  