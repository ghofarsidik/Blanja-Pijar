package models

import (
	"server/src/configs"

	"gorm.io/gorm"
)

type Cart struct {
	gorm.Model
	Status     string       `json:"status"`
	TotalAmout float64      `json:"total_amout"`
	UserID     uint         `json:"user_id"`
	User       User         `gorm:"foreignKey:UserID"`
	CartDetail []CartDetail `json:"cart_detail" gorm:"foreignKey:CartID"`
}
type CartDetail struct {
	gorm.Model
	TotalPrice float64 `json:"total_price"`
	ProductID  uint    `json:"product_id"`
	Quantity   uint    `json:"quantity" gorm:"default=1"`
	IsChecked  bool    `json:"isChecked" gorm:"default=1"`
	Size       string  `json:"size"`
	Color      string  `json:"color"`
	CartID     uint    `json:"cart_id"`
	Product    Product `gorm:"foreignKey:ProductID"`
	Cart       Cart    `gorm:"foreignKey:CartID"`
}

type AddToCartRequest struct {
	UserID    uint   `json:"user_id"`
	ProductID uint   `json:"product_id"`
	Size      string `json:"size"`
	Color     string `json:"color"`
	Quantity  uint   `json:"quantity"`
}

type DeleteCartRequest struct {
	ProductIDs []uint `json:"product_ids"`
}

func GetAllCarts() []*Cart {
	var results []*Cart
	configs.DB.Model(&Cart{}).Preload("CartDetail", func(db *gorm.DB) *gorm.DB {
		var items []*CartDetail
		return configs.DB.Model(&CartDetail{}).Find(&items)
	}).Find(&results)
	return results
}

func GetCartByUserId(id uint) []*Cart {
	var result []*Cart
	configs.DB.Model(&Cart{}).
		Preload("User").
		Preload("CartDetail.Product").
		Preload("CartDetail.Product.Category").
		Preload("CartDetail.Product.Store").
		Preload("CartDetail.Product.ProductImage").
		Where("user_id = ? AND status = ?", id, "active").
		Find(&result)
	return result
}

func GetAllCartDetails() []*CartDetail {
	var results []*CartDetail
	configs.DB.Model(&CartDetail{}).Find(&results)
	return results
}

func GetActiveCartByUserId(userID uint) (*Cart, error) {
	var cart Cart
	result := configs.DB.Preload("CartDetail").Where("user_id = ? AND status = ?", userID, "active").First(&cart)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return &cart, nil
}
func GetActiveCartDetail(userID uint) ([]*CartDetail, error) {
	var items []*CartDetail
	result := configs.DB.
		Joins("JOIN carts ON carts.id = cart_details.cart_id").
		Where("carts.user_id = ? AND cart_details.is_checked = ?", userID, true).
		Preload("Cart").
		Preload("Product").
		Preload("Product.Category").
		Preload("Product.Store").
		Preload("Product.ProductImage").
		Find(&items)

	if result.Error != nil {
		return nil, result.Error
	}
	return items, nil
}

func GetCartDetailById(id int) *CartDetail {
	var item CartDetail
	configs.DB.Preload("Product").First(&item, "id = ?", id)
	return &item
}
func AddToCart(cart *Cart) error {
	result := configs.DB.Create(&cart)
	return result.Error
}
func AddToCartDetail(cartDetail *CartDetail) error {
	result := configs.DB.Create(&cartDetail)
	return result.Error
}
func UpdateCartDetail(id int, item *CartDetail) error {
	result := configs.DB.Model(&CartDetail{}).Where("id = ?", id).Updates(item)
	return result.Error
}
func UpdateChekedItem(id int, item *CartDetail) error {
	result := configs.DB.Model(&CartDetail{}).Where("id = ?", id).Updates(map[string]interface{}{
		"is_checked": item.IsChecked,
	})
	return result.Error
}
func DeleteCart(id uint) error {
	result := configs.DB.Delete(&Cart{}, "id = ?", id)
	return result.Error
}
func DeleteItemCartDetail(id uint) error {
	result := configs.DB.Delete(&CartDetail{}, "id = ?", id)
	return result.Error
}

func UpdateCart(id uint, item *Cart) error {
	result := configs.DB.Model(&Cart{}).Where("id = ?", id).Updates(&item)
	return result.Error
}
