package controller

import (
	"net/http"

	"github.com/JonathanMaverickTPA_Web/config"
	"github.com/JonathanMaverickTPA_Web/model"
	"github.com/gin-gonic/gin"
)

//Add Promo
// @Summary Add Promo
// @Tags Promo
// @Accept  json
// @Produce  json
// @Param promo body Promo true "Promo"
// @Success 200 {object} model.Promo
// @Router /promo [post]
func AddPromo(c *gin.Context){
	var promo model.Promo
	c.BindJSON(&promo)
	
	if(promo.PromoCode == ""){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Promo code can't be empty!"})
		return
	}
	if (promo.PromoDiscount <= 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Discount must be greater than 0!"})
		return
	}

	if (promo.PromoDiscount > 100){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Discount must be less than or equal to 100!"})
		return
	}

	if(promo.PromoPicture == ""){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Promo picture can't be empty!"})
		return
	}

	var checkPromo model.Promo
	config.DB.Where("promo_code = ?", promo.PromoCode).First(&checkPromo)
	if checkPromo.PromoCode != "" {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Promo code already exists!"})
		return
	}

	result := config.DB.Create(&promo)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": result.Error})
		return
	}
}

func GetPromos(c *gin.Context){
	var promos []model.Promo
	config.DB.Find(&promos)
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": promos})
}

//UpdatePromo
// @Summary Update Promo
// @Tags Promo
// @Accept  json
// @Produce  json
// @Param promoID path int true "Promo ID"
// @Param promo body Promo true "Promo"
// @Success 200 {object} model.Promo
// @Router /promo/{promoID} [put]
func UpdatePromo(c *gin.Context){
	var promo model.Promo
	promoID := c.Param("promoID")
	config.DB.First(&promo, promoID)

	if promo.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "No promo found!"})
		return
	}

	if (promo.PromoDiscount <= 0){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Discount must be greater than 0!"})
		return
	}

	if (promo.PromoDiscount > 100){
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Discount must be less than or equal to 100!"})
		return
	}

	var checkPromo model.Promo
	config.DB.Where("promo_code = ?", promo.PromoCode).First(&checkPromo)
	if checkPromo.PromoCode != "" && checkPromo.ID != promo.ID {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Promo code already exists!"})
		return
	}

	c.BindJSON(&promo)
	config.DB.Save(&promo)
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": promo})
}