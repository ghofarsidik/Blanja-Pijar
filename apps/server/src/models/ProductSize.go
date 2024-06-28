package models

import (
	"server/src/configs"

	"gorm.io/gorm"
)

type ProductSize struct {
	gorm.Model
	Size      string  `json:"size"`
	ProductID uint    `json:"product_id"`
	Product   Product `gorm:"foreignKey:ProductID"`
}

func GetAllSize() *[]ProductSize {
	var items []ProductSize
	configs.DB.Preload("Product").Find(&items)
	return &items
}	

func CreateSizeProduct(item []ProductSize) error {
	result := configs.DB.Create(&item)
	return result.Error
}
