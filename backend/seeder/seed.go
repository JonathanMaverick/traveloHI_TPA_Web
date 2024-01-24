package seed

import (
	"fmt"

	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/model"
)

func Seed() {
	db := config.DB;
	fmt.Println(db)

	facilities := []model.Facilities{
		{
			FacilitiesName: "Swimming Pool",
		},
		{
			FacilitiesName: "Gym",
		},
		{
			FacilitiesName : "Wifi",
		},
		{
			FacilitiesName : "Breakfast",
		},
		{
			FacilitiesName : "Parking",
		},
		{
			FacilitiesName : "Spa",
		},
		{
			FacilitiesName : "Restaurant",
		},
		{
			FacilitiesName : "Bar",
		},
		{
			FacilitiesName : "Airport Shuttle",
		},
		{
			FacilitiesName : "Lift",
		},
	}

	airports := []model.Airport{
		{AirportCode: "CGK", AirportName: "Soekarno-Hatta International Airport", AirportLocation: "Tangerang, Banten"},
		{AirportCode: "DPS", AirportName: "Ngurah Rai International Airport", AirportLocation: "Denpasar, Bali"},
		{AirportCode: "SUB", AirportName: "Juanda International Airport", AirportLocation: "Surabaya, East Java"},
		{AirportCode: "UPG", AirportName: "Sultan Hasanuddin International Airport", AirportLocation: "Makassar, South Sulawesi"},
		{AirportCode: "JOG", AirportName: "Adisutjipto International Airport", AirportLocation: "Yogyakarta, Yogyakarta"},
		{AirportCode: "PDG", AirportName: "Minangkabau International Airport", AirportLocation: "Padang, West Sumatra"},
		{AirportCode: "PLM", AirportName: "Sultan Mahmud Badaruddin II International Airport", AirportLocation: "Palembang, South Sumatra"},
		{AirportCode: "KNO", AirportName: "Kualanamu International Airport", AirportLocation: "Medan, North Sumatra"},
		{AirportCode: "MDC", AirportName: "Sam Ratulangi International Airport", AirportLocation: "Manado, North Sulawesi"},
		{AirportCode: "SOC", AirportName: "Adisumarmo International Airport", AirportLocation: "Surakarta, Central Java"},
		{AirportCode: "BPN", AirportName: "Sultan Aji Muhammad Sulaiman Airport", AirportLocation: "Balikpapan, East Kalimantan"},
		{AirportCode: "BDO", AirportName: "Husein Sastranegara International Airport", AirportLocation: "Bandung, West Java"},
		{AirportCode: "PNK", AirportName: "Supadio International Airport", AirportLocation: "Pontianak, West Kalimantan"},
		{AirportCode: "SRG", AirportName: "Ahmad Yani International Airport", AirportLocation: "Semarang, Central Java"},
		{AirportCode: "KOE", AirportName: "El Tari International Airport", AirportLocation: "Kupang, East Nusa Tenggara"},
		{AirportCode: "LOP", AirportName: "Lombok International Airport", AirportLocation: "Praya, West Nusa Tenggara"},
		{AirportCode: "DJJ", AirportName: "Sentani International Airport", AirportLocation: "Jayapura, Papua"},
		{AirportCode: "BTJ", AirportName: "Sultan Iskandar Muda International Airport", AirportLocation: "Banda Aceh, Aceh"},
		{AirportCode: "TRK", AirportName: "Juwata International Airport", AirportLocation: "Tarakan, North Kalimantan"},
		{AirportCode: "DJB", AirportName: "Sultan Thaha Airport", AirportLocation: "Jambi, Jambi"},
		{AirportCode: "GTO", AirportName: "Jalaluddin Airport", AirportLocation: "Gorontalo, Gorontalo"},
	}


	// db.Create(&hotel)
	// db.Create(&room)
	// db.Create(&users)
	db.Create(&facilities)
	db.Create(&airports)
	// db.Create(&airports)
}