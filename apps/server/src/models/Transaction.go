package models

import (
	"server/src/configs"

	"gorm.io/gorm"
)

type Transaction struct {
	gorm.Model
	Quantity        uint64  `json:"quantity" validate:"min=1"`
	TotalAmount     float64 `json:"total_amount"`
	ShippingAddress string  `json:"shipping_address" `
	Status          string  `json:"status"`
	ProductID       uint64  `json:"product_id"`
	PaymentMethod   string  `json:"payment_method"`
	UserID          uint64  `json:"user_id"`
	Product         Product `gorm:"foreignKey:ProductID"`
	User            User    `gorm:"foreignKey:UserID"`
}

func GetAllTransaction() []*Transaction {
	var results []*Transaction
	configs.DB.Preload("User").Preload("Product").Find(&results)
	return results
}

func CreateTransaction(data map[string]interface{}) error {
	results := configs.DB.Model(&Transaction{}).Create(&data)
	return results.Error
}
