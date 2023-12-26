package config

import (
	"github.com/JonathanMaverickTPA_Web/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func migrate(db *gorm.DB){
	db.AutoMigrate(&model.User{})
}

func Connect ()*gorm.DB{
	dsn := "host=localhost user=jonathanmaverick password=postgres dbname=testing port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil{
		panic(err)
	}

	migrate(db);

	return db;
}
  