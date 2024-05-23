package models

import "gorm.io/gorm"

type ProductColor struct {
	gorm.Model
	Color     string  `json:"color"`
	ProductID uint    `json:"product_id"`
	Product   Product `gorm:"foreignKey:ProductID"`
}
