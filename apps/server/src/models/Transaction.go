package models

import (
	"server/src/configs"

	"gorm.io/gorm"
)

type Transaction struct {
	gorm.Model
	TransactionNumber string              `json:"transaction_number"`
	Quantity          uint64              `json:"quantity" validate:"min=1"`
	TotalAmount       float64             `json:"total_amount"`
	ShippingAddress   string              `json:"shipping_address"`
	Status            string              `json:"status"`
	PaymentMethod     string              `json:"payment_method"`
	UserID            uint64              `json:"user_id"`
	User              User                `gorm:"foreignKey:UserID"`
	Details           []TransactionDetail `gorm:"foreignKey:TransactionID"`
}

type TransactionDetail struct {
	gorm.Model
	TransactionID   uint64      `json:"transaction_id"`
	ProductID       uint64      `json:"product_id"`
	ProductQuantity uint64      `json:"product_quantity"`
	Product         Product     `gorm:"foreignKey:ProductID"`
	Transaction     Transaction `gorm:"foreignKey:TransactionID"`
}

func GetAllTransaction() []*Transaction {
	var results []*Transaction
	configs.DB.Preload("User").Preload("Product").Find(&results)
	return results
}
func GetTransactionUser(id uint, status string) []*Transaction {
	var results []*Transaction
	status = "%" + status + "%"
	configs.DB.Preload("User").
		Preload("Details").
		Preload("Details.Product").
		Preload("Details.Product.ProductImage").
		Preload("Details.Product.ProductSize").
		Preload("Details.Product.ProductColor").
		Where("user_id = ? AND status ILIKE ?", id, status).
		Find(&results)
	return results
}
func CreateTransaction(data map[string]interface{}) error {
	results := configs.DB.Model(&Transaction{}).Create(&data)
	return results.Error
}
