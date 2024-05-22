package models

import (
	"server/src/configs"

	"gorm.io/gorm"
)

type Category struct {
	gorm.Model
	Name    string       `json:"name"`
	Image   string       `json:"image"`
	Product []APIProduct `json:"product"`
}

type APIProduct struct {
	gorm.Model
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Size        string  `json:"size"`
	Condition   string  `json:"condition"`
	Color       string  `json:"color"`
	StoreID     string  `json:"store_id"`
	CategoryID  string  `json:"category_id"`
}

func GetAllCategories() []*Category {
	var results []*Category
	configs.DB.Preload("Product", func(db *gorm.DB) *gorm.DB {
		var items []*APIProduct
		return configs.DB.Model(&Product{}).Find(&items)
	}).Find(&results)
	return results
}