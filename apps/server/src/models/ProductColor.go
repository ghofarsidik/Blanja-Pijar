package models

import (
	"server/src/configs"

	"gorm.io/gorm"
)

type ProductColor struct {
	gorm.Model
	Color     string  `json:"color"`
	ProductID uint    `json:"product_id"`
	Product   Product `gorm:"foreignKey:ProductID"`
}

func GetAllColors() *[]ProductColor {
	var items []ProductColor
	configs.DB.Preload("Product").Find(&items)
	return &items
}

func CreateProductColor(newProductColor *ProductColor) error {
	results := configs.DB.Create(&newProductColor)
	return results.Error
}

func UpdateProductColor(id int, item *ProductColor) error {
	results := configs.DB.Model(&ProductColor{}).Where("id = ?", id).Updates(item)
	return results.Error
}
