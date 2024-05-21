package models

import "gorm.io/gorm"

type Store struct {
	gorm.Model
	Name        string       `json:"name"`
	Description string       `json:"description"`
	Address     string       `json:"address"`
	UserID      uint         `json:"user_id"`
	User        User         `gorm:"foreignKey:UserID"`
	Product     []APIProduct `json:"product"`
}
