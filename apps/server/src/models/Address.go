package models

import "gorm.io/gorm"

type Address struct {
	gorm.Model
	Label          string `json:"label"`
	Address        string `json:"address"`
	ReceivedName   string `json:"received_name"`
	ContactNumber  string `json:"contact_number"`
	PrimaryAddress bool   `json:"primary" gorm:"default:0"`
	PostalCode     string `json:"postal_code"`
	City           string `json:"city"`
	UserID         uint   `json:"user_id"`
	User           User   `gorm:"foreignKey:UserID"`
}
