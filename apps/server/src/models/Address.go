package models

import (
	"server/src/configs"

	"gorm.io/gorm"
)

type Address struct {
	gorm.Model
	Label          string  `json:"label"`
	Address        string  `json:"address"`
	ReceivedName   string  `json:"received_name"`
	ContactNumber  string  `json:"contact_number"`
	PrimaryAddress bool    `json:"primary" gorm:"default:0"`
	PostalCode     string  `json:"postal_code"`
	City           string  `json:"city"`
	Longitude      float64 `json:"longitude"`
	Latitude       float64 `json:"latitude"`
	UserID         uint    `json:"user_id"`
	User           User    `gorm:"foreignKey:UserID"`
}

func GetAllAddress() []*Address {
	var results []*Address
	configs.DB.Preload("User").Find(&results)
	return results
}

func GetDetailAddress(id int) *Address {
	var results Address
	configs.DB.Preload("User").First(&results, "id = ?", id)
	return &results
}

func GetAddressByNameAndAddress(name string, address string, id uint) *Address {
	var results Address
	configs.DB.Model(&Address{}).Where("received_name = ? AND address = ? AND ID = ?", name, address, id).First(&results)
	return &results
}

func CreateAddress(newAddress map[string]interface{}) error {
	results := configs.DB.Model(&Address{}).Create(&newAddress)
	return results.Error
}

func UpdateAddress(id int, newAddress *Address) error {
	results := configs.DB.Model(&Address{}).Where("id = ?", id).Updates(newAddress)
	return results.Error
}

func DeleteAddress(id int) error {
	results := configs.DB.Delete(&Address{}, "id = ?", id)
	return results.Error
}
