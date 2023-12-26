package main

import (
	"fmt"

	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/model"
)

// @title           Swagger Example API
// @version         1.0
// @description     This is a sample server celler server.
// @termsOfService  http://swagger.io/terms/

// @contact.name   API Support
// @contact.url    http://www.swagger.io/support
// @contact.email  support@swagger.io

// @license.name  Apache 2.0
// @license.url   http://www.apache.org/licenses/LICENSE-2.0.html

// @host      localhost:8080

// @externalDocs.description  OpenAPI
// @externalDocs.url          https://swagger.io/resources/open-api/
func main() {
	// Connect to the database
	db := config.Connect()

	// Create a new user
	newUser := model.User{
		Name : "Jonathan Maverick",
		Email : "jonathan@gmail.com",
	}

	// Insert the user into the database
	result := db.Create(&newUser)

	// Check for errors during the insertion
	if result.Error != nil {
		fmt.Println("Error inserting user:", result.Error)
	} else {
		fmt.Println("User inserted successfully!")
	}
}