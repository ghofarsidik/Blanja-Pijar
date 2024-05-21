package models

import "gorm.io/gorm"

type Cart struct {
	gorm.Model
	Quantity uint   `json:"quantity"`
	Status   string `json:"status"`
	UserID   string `json:"user_id"`
	User     User   `gorm:"foreignKey:UserID"`
}
