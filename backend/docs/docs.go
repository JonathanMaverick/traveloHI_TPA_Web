// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "name": "API Support",
            "url": "http://www.swagger.io/support",
            "email": "support@swagger.io"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/airline": {
            "get": {
                "description": "Get an airline",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Airline"
                ],
                "summary": "Get airline",
                "parameters": [
                    {
                        "description": "Airline",
                        "name": "airline",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Airline found successfully!",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            },
            "post": {
                "description": "Add a new airline",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Airline"
                ],
                "summary": "Add airline",
                "parameters": [
                    {
                        "description": "Airline",
                        "name": "airline",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Airline created successfully!",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/airline/plane/{airlineID}": {
            "get": {
                "description": "Get a plane",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Plane"
                ],
                "summary": "Get plane by airline",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Airline ID",
                        "name": "airlineID",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Plane found successfully!",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/flight/airport": {
            "get": {
                "description": "Get a list of airports",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Flight"
                ],
                "summary": "List airports",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/model.Airport"
                            }
                        }
                    }
                }
            }
        },
        "/flight/schedule": {
            "get": {
                "description": "Get a list of flight schedules",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Flight"
                ],
                "summary": "List flight schedules",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/model.FlightSchedule"
                            }
                        }
                    }
                }
            },
            "post": {
                "description": "Add a new flight schedule",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Flight"
                ],
                "summary": "Add flight schedule",
                "parameters": [
                    {
                        "description": "Flight Schedule",
                        "name": "flightSchedule",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Flight schedule created successfully!",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/hotel": {
            "get": {
                "description": "Get a list of hotel",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Hotel"
                ],
                "summary": "List hotel",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/model.Hotel"
                            }
                        }
                    }
                }
            },
            "post": {
                "description": "Add a new hotel",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Hotel"
                ],
                "summary": "Add hotel",
                "parameters": [
                    {
                        "description": "Hotel",
                        "name": "hotel",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Hotel created successfully!",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/hotel/add_hotel_facilities": {
            "post": {
                "description": "Add a new hotel facilities",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Hotel"
                ],
                "summary": "Add hotel facilities",
                "parameters": [
                    {
                        "description": "Hotel Facilities",
                        "name": "hotelFacilities",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Hotel facilities created successfully!",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/hotel/add_hotel_picture": {
            "post": {
                "description": "Add a new hotel picture",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Hotel"
                ],
                "summary": "Add hotel picture",
                "parameters": [
                    {
                        "description": "Hotel Picture",
                        "name": "hotelPicture",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Hotel picture created successfully!",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/hotel/add_hotel_room": {
            "post": {
                "description": "Add a new hotel room",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Hotel"
                ],
                "summary": "Add hotel room",
                "parameters": [
                    {
                        "description": "Hotel Room",
                        "name": "hotelRoom",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Hotel room created successfully!",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/hotel/facilities": {
            "get": {
                "description": "Get a list of hotel facilities",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Hotel"
                ],
                "summary": "List hotel facilities",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/model.Facilities"
                            }
                        }
                    }
                }
            }
        },
        "/plane": {
            "get": {
                "description": "Get all planes",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Plane"
                ],
                "summary": "Get planes",
                "responses": {
                    "200": {
                        "description": "Planes found successfully!",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            },
            "post": {
                "description": "Add a new plane",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Plane"
                ],
                "summary": "Add plane",
                "parameters": [
                    {
                        "description": "Plane",
                        "name": "plane",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Plane created successfully!",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/room": {
            "get": {
                "description": "Get a list of rooms",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Room"
                ],
                "summary": "List rooms",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/model.Room"
                            }
                        }
                    }
                }
            }
        },
        "/room/add_hotel_room_picture": {
            "post": {
                "description": "Add a new room picture",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Room"
                ],
                "summary": "Add room picture",
                "parameters": [
                    {
                        "description": "Room Picture",
                        "name": "roomPicture",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Room picture created successfully!",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/user": {
            "get": {
                "description": "Get a list of users",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "User"
                ],
                "summary": "List users",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/model.User"
                            }
                        }
                    }
                }
            },
            "post": {
                "description": "Create a new user account",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "User"
                ],
                "summary": "Create user",
                "parameters": [
                    {
                        "description": "User details",
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/model.User"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created",
                        "schema": {
                            "$ref": "#/definitions/model.User"
                        }
                    }
                }
            }
        },
        "/user/login": {
            "post": {
                "description": "Login a user",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "User"
                ],
                "summary": "Login user",
                "parameters": [
                    {
                        "description": "User details",
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/user/{userId}": {
            "get": {
                "description": "Get a specific user account",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "User"
                ],
                "summary": "Get a user",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "User ID",
                        "name": "userId",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created",
                        "schema": {
                            "$ref": "#/definitions/model.User"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "model.Airport": {
            "type": "object",
            "properties": {
                "airportCode": {
                    "type": "string"
                },
                "airportID": {
                    "type": "integer"
                },
                "airportLocation": {
                    "type": "string"
                },
                "airportName": {
                    "type": "string"
                }
            }
        },
        "model.Facilities": {
            "type": "object",
            "properties": {
                "facilitiesID": {
                    "type": "integer"
                },
                "facilitiesName": {
                    "type": "string"
                }
            }
        },
        "model.FlightSchedule": {
            "type": "object",
            "properties": {
                "arrivalTime": {
                    "type": "string"
                },
                "businessPrice": {
                    "type": "integer"
                },
                "departureTime": {
                    "type": "string"
                },
                "destinationAirportID": {
                    "type": "integer"
                },
                "economyPrice": {
                    "type": "integer"
                },
                "flightScheduleID": {
                    "type": "integer"
                },
                "originAirportID": {
                    "type": "integer"
                },
                "planeID": {
                    "type": "integer"
                }
            }
        },
        "model.Hotel": {
            "type": "object",
            "properties": {
                "hotelAddress": {
                    "type": "string"
                },
                "hotelCity": {
                    "type": "string"
                },
                "hotelDescription": {
                    "type": "string"
                },
                "hotelFacilities": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/model.HotelFacilities"
                    }
                },
                "hotelID": {
                    "type": "integer"
                },
                "hotelName": {
                    "type": "string"
                },
                "hotelPictures": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/model.HotelPicture"
                    }
                }
            }
        },
        "model.HotelFacilities": {
            "type": "object",
            "properties": {
                "facilities": {
                    "$ref": "#/definitions/model.Facilities"
                },
                "facilitiesID": {
                    "type": "integer"
                },
                "hotelFacilitiesID": {
                    "type": "integer"
                },
                "hotelID": {
                    "type": "integer"
                }
            }
        },
        "model.HotelPicture": {
            "type": "object",
            "properties": {
                "hotelID": {
                    "type": "integer"
                },
                "hotelPicture": {
                    "type": "string"
                },
                "hotelPictureID": {
                    "type": "integer"
                }
            }
        },
        "model.Room": {
            "type": "object",
            "properties": {
                "bedType": {
                    "type": "string"
                },
                "hotelID": {
                    "type": "integer"
                },
                "occupancy": {
                    "type": "integer"
                },
                "price": {
                    "type": "integer"
                },
                "quantity": {
                    "type": "integer"
                },
                "roomID": {
                    "type": "integer"
                },
                "roomName": {
                    "type": "string"
                },
                "roomPicture": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/model.RoomPicture"
                    }
                }
            }
        },
        "model.RoomPicture": {
            "type": "object",
            "properties": {
                "roomID": {
                    "type": "integer"
                },
                "roomPicture": {
                    "type": "string"
                },
                "roomPictureID": {
                    "type": "integer"
                }
            }
        },
        "model.User": {
            "type": "object",
            "properties": {
                "dob": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "firstName": {
                    "type": "string"
                },
                "gender": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "personalSecurityAnswer": {
                    "type": "string"
                },
                "profilePicture": {
                    "type": "string"
                },
                "role": {
                    "type": "string"
                },
                "securityQuestion": {
                    "type": "string"
                },
                "status": {
                    "type": "string"
                },
                "subscribedToNewsletter": {
                    "type": "boolean"
                },
                "userID": {
                    "type": "integer"
                },
                "wallet": {
                    "type": "number"
                }
            }
        }
    },
    "externalDocs": {
        "description": "OpenAPI",
        "url": "https://swagger.io/resources/open-api/"
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "localhost:8080",
	BasePath:         "",
	Schemes:          []string{},
	Title:            "TPA-Website",
	Description:      "VK TPA Website API Documentation",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
