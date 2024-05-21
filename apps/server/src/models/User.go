package models

import (
	"errors"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name         string       `json:"name" validate:"required,min=3"`
	Email        string       `json:"email" validate:"required,email"`
	Password     string       `json:"password" validate:"required"`
	Image        string       `json:"image"`
	Gender       string       `json:"gender"`
	Birthday     string       `json:"birthday"`
	Phone_number string       `json:"phone_number" validate:"min=10,max=13"`
	Role         string       `json:"role" validate:"required"`
	Address      []APIAddress `json:"address"`
	Store        []APIStore   `json:"store"`
	Cart         []APICart    `json:"cart"`
}

type APIAddress struct {
	gorm.Model
	Label      string `json:"label"`
	Name       string `json:"name"`
	Phone      string `json:"phone"`
	Address    string `json:"address" `
	PostalCode string `json:"postal_code"`
	City       string `json:"city"`
	Primary    bool   `json:"primary" gorm:"default:0"`
	UserID     int    `json:"user_id"`
}

type APIStore struct {
	gorm.Model
	Name        string `json:"name"`
	Description string `json:"description"`
	Address     string `json:"address"`
	UserID      uint   `json:"user_id"`
}

type APICart struct {
	gorm.Model
	Quantity uint   `json:"quantity"`
	Status   string `json:"status"`
	UserID   string `json:"user_id"`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	validRoles := map[string]bool{
		"seller":   true,
		"customer": true,
	}
	if !validRoles[u.Role] {
		return errors.New("invalid role")
	}
	return
}
