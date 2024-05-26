package models

import (
	"errors"
	"fmt"
	"server/src/configs"

	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Name         string            `json:"name"`
	Description  string            `json:"description"`
	Price        float64           `json:"price"`
	Size         string            `json:"size"`
	Condition    string            `json:"condition" validate:"required"`
	Stock        uint              `json:"stock"`
	StoreID      uint              `json:"store_id"`
	CategoryID   uint              `json:"category_id"`
	Store        Store             `gorm:"foreignKey:StoreID"`
	Category     Category          `gorm:"foreignKey:CategoryID"`
	ProductImage []APIProductImage `json:"product_image"`
	ProductColor []APIProductColor `json:"product_color"`
}

type APIProductImage struct {
	gorm.Model
	Image     string `json:"image"`
	ProductID uint   `json:"product_id"`
}

type APIProductColor struct {
	gorm.Model
	Color     string `json:"color"`
	ProductID uint   `json:"product_id"`
}

func (u *Product) BeforeCreate(tx *gorm.DB) (err error) {
	validCondition := map[string]bool{
		"new":  true,
		"used": true,
	}
	fmt.Println("u", u.Condition)
	if !validCondition[u.Condition] {
		return errors.New("invalid condition: new/used")
	}
	return
}
func GetAllProducts(sort, name string, limit, offset int) []*Product {
	var items []*Product
	name = "%" + name + "%"
	configs.DB.Preload("Category").Preload("ProductImage", func(db *gorm.DB) *gorm.DB {
		var items []*APIProductImage
		return configs.DB.Model(&ProductImage{}).Find(&items)
	}).Order(sort).Limit(limit).Offset(offset).Where("name ILIKE ?", name).Find(&items)
	return items
}

func GetDetailProduct(id int) *Product {
	var item Product
	configs.DB.Preload("Category").Preload("ProductImage", func(db *gorm.DB) *gorm.DB {
		var items []*APIProductImage
		return configs.DB.Model(&ProductImage{}).Find(&items)
	}).First(&item, "id = ?", id)
	return &item
}

func CreateProduct(newProduct *Product) error {
	result := configs.DB.Create(&newProduct)
	return result.Error
}

func UpdateProduct(id int, item *Product) error {
	result := configs.DB.Model(&Product{}).Where("id = ?", id).Updates(item)
	return result.Error
}

func DeleteProduct(id int) error {
	result := configs.DB.Delete(&Product{}, "id = ?", id)
	return result.Error
}

// func UploadPhotoProduct(id int, images map[string]interface{}) error {
// 	result := configs.DB.Model(&Product{}).Where("id = ?", id).Updates(images)
// 	return result.Error
// }
