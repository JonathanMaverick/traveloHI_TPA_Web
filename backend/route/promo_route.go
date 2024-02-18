package route

import (
	"github.com/JonathanMaverickTPA_Web/controller"
	"github.com/gin-gonic/gin"
)

func PromoRoute(r *gin.Engine) {
	promo := r.Group("/promo")
	{
		promo.POST("/", controller.AddPromo)
		promo.GET("/", controller.GetPromos)
		promo.PUT("/:id", controller.UpdatePromo)
	}
}