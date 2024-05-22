package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name         string            `json:"name"`
	Description  string            `json:"description"`
	Price        float64           `json:"price"`
	Size         string            `json:"size"`
	Condition    string            `json:"condition"`
	Color        string            `json:"color"`
	StoreID      string            `json:"store_id"`
	CategoryID   string            `json:"category_id"`
	Store        Store             `gorm:"foreignKey:StoreID"`
	Category     Category          `gorm:"foreignKey:CategoryID"`
	ProductImage []APIProductImage `json:"product_image"`
}

type APIProductImage struct {
	gorm.Model
	Image     string `json:"image"`
	ProductID uint   `json:"product_id"`
}
