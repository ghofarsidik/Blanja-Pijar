package models

import (
	"server/src/configs"

	"gorm.io/gorm"
)

type ProductImage struct {
	gorm.Model
	Image     string  `json:"image"`
	ProductID uint    `json:"product_id"`
	Product   Product `gorm:"foreignKey:ProductID"`
}

func GetAllProductImages() []*ProductImage {
	var results []*ProductImage
	configs.DB.Preload("Product").Find(&results)
	return results
}

func UploadPhotosProduct(images []map[string]interface{}) error {
	result := configs.DB.Model(&ProductImage{}).Create(&images)
	return result.Error
}
