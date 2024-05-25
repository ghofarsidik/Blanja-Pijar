package models

import (
	"server/src/configs"

	"gorm.io/gorm"
)

type Store struct {
	gorm.Model
	Name        string       `json:"name" validate:"required,min=3"`
	Description string       `json:"description" validate:"required,min=3"`
	Address     string       `json:"address" validate:"required,min=3"`
	UserID      uint         `json:"user_id" validate:"required,min=3"`
	User        User         `gorm:"foreignKey:UserID"`
	Product     []APIProduct `json:"product"`
}

func GetAllStore() []*Store {
	var results []*Store
	configs.DB.Preload("User").Preload("Product", func(db *gorm.DB) *gorm.DB {
		var items []*APIProduct
		return configs.DB.Model(&Product{}).Find(&items)
	}).Find(&results)
	return results
}

func GetDetailStore(id int) *Store {
	var results Store
	configs.DB.Preload("User").Preload("Product", func(db *gorm.DB) *gorm.DB {
		var items []*APIProduct
		return configs.DB.Model(&Product{}).Find(&items)
	}).First(&results, "id = ?", id)
	return &results
}

// func GetStoreByNameAndStore(name string, Store string, id uint) *Store {
// 	var results Store
// 	configs.DB.Model(&Store{}).Where("name = ? AND Store = ? AND ID = ?", name, Store, id).First(&results)
// 	return &results
// }

func CreateStore(data map[string]interface{}) error {
	newStore := Store{
		Name:        data["name"].(string),
		Description: data["description"].(string),
		Address:     data["address"].(string),
		UserID:      data["user_id"].(uint),
	}
	results := configs.DB.Create(&newStore)
	return results.Error
}

func UpdateStore(id int, newStore *Store) error {
	results := configs.DB.Model(&Store{}).Where("id = ?", id).Updates(newStore)
	return results.Error
}

func DeleteStore(id int) error {
	results := configs.DB.Delete(&Store{}, "id = ?", id)
	return results.Error
}
