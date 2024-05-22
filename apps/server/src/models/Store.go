package models

import "gorm.io/gorm"

type Store struct {
	gorm.Model
	Name        string       `json:"name" validate:"required,min=3"`
	Description string       `json:"description" validate:"required,min=3"`
	Address     string       `json:"address" validate:"required,min=3"`
	UserID      uint         `json:"user_id" validate:"required,min=3"`
	User        User         `gorm:"foreignKey:UserID"`
	Product     []APIProduct `json:"product"`
}
