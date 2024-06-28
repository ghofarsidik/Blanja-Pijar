package models

import (
	"errors"
	"fmt"
	"server/src/configs"
	"strings"

	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Name         string         `json:"name"`
	Description  string         `json:"description"`
	Price        float64        `json:"price"`
	Condition    string         `json:"condition" validate:"required"`
	Stock        uint           `json:"stock"`
	StoreID      uint           `json:"store_id"`
	CategoryID   uint           `json:"category_id"`
	Store        Store          `gorm:"foreignKey:StoreID"`
	Category     Category       `gorm:"foreignKey:CategoryID"`
	ProductImage []ProductImage `json:"product_image"`
	ProductColor []ProductColor `json:"product_color"`
	ProductSize  []ProductSize  `json:"product_size"`
	CartDetail   []CartDetail   `json:"cart_detail"`
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
	configs.DB.Preload("Category").Preload("ProductImage").Preload("ProductColor").Preload("ProductSize").Preload("Store").Order(sort).Limit(limit).Offset(offset).Where("name ILIKE ?", name).Find(&items)
	return items
}

func FilterProducts(color, size, store, category, condition string, limit, offset int) []*Product {
	var items []*Product
	db := configs.DB.Preload("Category").
		Preload("ProductImage").
		Preload("Store").
		Preload("ProductSize").
		Preload("ProductColor").
		Model(&Product{})

	if condition != "" {
		db = db.Where("condition = ?", condition)
	}
	if color != "" {
		colorList := strings.Split(strings.ToLower(strings.TrimSpace(color)), ",")
		db = db.Joins("JOIN product_colors ON product_colors.product_id = products.id").
			Where("LOWER(product_colors.color) IN (?)", colorList)
	}
	if size != "" {
		sizeList := strings.Split(strings.ToLower(strings.TrimSpace(size)), ",")
		db = db.Joins("JOIN product_sizes ON product_sizes.product_id = products.id").
			Where("LOWER(product_sizes.size) IN (?)", sizeList)
	}
	if store != "" {
		store = strings.ToLower(strings.TrimSpace(store))
		db = db.Joins("JOIN stores ON stores.id = products.store_id").
			Where("LOWER(stores.name) ILIKE ?", "%"+store+"%")
	}
	if category != "" {
		category = strings.ToLower(strings.TrimSpace(category))
		db = db.Joins("JOIN categories ON categories.id = products.category_id").
			Where("LOWER(categories.name) ILIKE ?", "%"+category+"%")
	}

	// Debugging: Print the SQL query
	fmt.Println(db.ToSQL(func(tx *gorm.DB) *gorm.DB {
		return tx.Limit(limit).Offset(offset).Find(&items)
	}))

	db.Limit(limit).Offset(offset).Find(&items)
	return items
}

func GetDetailProduct(id int) *Product {
	var item Product
	configs.DB.Preload("Category").Preload("ProductImage").Preload("ProductColor").Preload("ProductSize").First(&item, "id = ?", id)
	return &item
}

func CreateProduct(newProduct *Product) (*Product, error) {
	result := configs.DB.Create(&newProduct)
	if result.Error != nil {
		return nil, result.Error
	}

	return newProduct, nil
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
