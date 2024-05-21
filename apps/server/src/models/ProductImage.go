package models

import "gorm.io/gorm"

type ProductImage struct {
	gorm.Model
	Image     string  `json:"image"`
	ProductID uint    `json:"product_id"`
	Product   Product `gorm:"foreignKey:ProductID"`
}
