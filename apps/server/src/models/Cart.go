package models

import (
	"errors"
	"fmt"
	"server/src/configs"

	"gorm.io/gorm"
)

type Cart struct {
	gorm.Model
	Quantity   uint         `json:"quantity" gorm:"default=1"`
	Status     string       `json:"status"`
	UserID     uint         `json:"user_id"`
	User       User         `gorm:"foreignKey:UserID"`
	CartDetail []CartDetail `json:"cart_detail" gorm:"foreignKey:CartID"`
}

type APICartDetail struct {
	gorm.Model
	TotalPrice float64 `json:"total_price"`
	ProductID  uint    `json:"product_id"`
	CartID     uint    `json:"cart_id"`
}

type CartDetail struct {
	gorm.Model
	TotalPrice float64 `json:"total_price"`
	ProductID  uint    `json:"product_id"`
	CartID     uint    `json:"cart_id"`
	Product    Product `gorm:"foreignKey:ProductID"`
	Quantity   uint    `json:"quantity"`
	// Cart       Cart    `gorm:"foreignKey:CartID"`
}
type AddToCartRequest struct {
	UserID   uint              `json:"user_id"`
	Products []ProductQuantity `json:"products"`
	Status   string            `json:"status"`
}

type ProductQuantity struct {
	ProductID uint `json:"product_id"`
	Quantity  uint `json:"quantity"`
}

type DeleteCartRequest struct {
	ProductIDs []uint `json:"product_ids"`
}

func GetAllCarts() []*Cart {
	var results []*Cart
	configs.DB.Model(&Cart{}).Preload("CartDetail", func(db *gorm.DB) *gorm.DB {
		var items []*APICartDetail
		return configs.DB.Model(&CartDetail{}).Find(&items)
	}).Find(&results)
	return results
}

func GetCartByUserId(id uint) []*Cart {
	// var result []*Cart
	// configs.DB.Model(&Cart{}).Preload("CartDetail", func(db *gorm.DB) *gorm.DB {
	// 	var items []*APICartDetail
	// 	return configs.DB.Model(&CartDetail{}).Find(&items)
	// }).
	// 	Preload("User").
	// 	Where("user_id = ?", id).First(&result)
	// return result

	var result []*Cart
	configs.DB.Model(&Cart{}).
		Preload("User").
		Preload("CartDetail").
		Preload("CartDetail.Product").
		Preload("CartDetail.Product.Category").
		Preload("CartDetail.Product.Store").
		// Preload("CartDetail.Product.ProductImage"). 
		Where("user_id = ?", id).
		Find(&result)
	return result
}

func GetAllCartDetails() []*CartDetail {
	var results []*CartDetail
	configs.DB.Model(&CartDetail{}).Find(&results)
	return results
}

func AddToCart(userID uint, request *AddToCartRequest) (*Cart, error) {
	var cart Cart

	tx := configs.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()
	if err := tx.Where("user_id = ?", userID).First(&cart).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			cart = Cart{
				Status: request.Status,
				UserID: userID,
			}
			if err := tx.Create(&cart).Error; err != nil {
				tx.Rollback()
				return nil, err
			}
		} else {
			tx.Rollback()
			return nil, err
		}
	}

	for _, item := range request.Products {
		var product Product

		if err := tx.Where("id = ?", item.ProductID).First(&product).Error; err != nil {
			tx.Rollback()
			return nil, fmt.Errorf("product with ID %d not found", item.ProductID)
		}

		if product.Stock < item.Quantity {
			tx.Rollback()
			// return nil, errors.New("product out of stock")
			return nil, fmt.Errorf("product with ID %d is out of stock", item.ProductID)
		}
		var cartDetail CartDetail
		if err := tx.Where("cart_id = ? AND product_id = ?", cart.ID, item.ProductID).First(&cartDetail).Error; err == nil {
			cartDetail.TotalPrice += product.Price * float64(item.Quantity)
			cartDetail.Quantity += item.Quantity
			if err := tx.Save(&cartDetail).Error; err != nil {
				tx.Rollback()
				return nil, err
			}
		} else {
			cartDetail = CartDetail{
				TotalPrice: product.Price * float64(item.Quantity),
				ProductID:  item.ProductID,
				CartID:     cart.ID,
				Quantity:   item.Quantity,
			}
			if err := tx.Create(&cartDetail).Error; err != nil {
				tx.Rollback()
				return nil, err
			}
		}

		cart.Quantity += item.Quantity
	}

	if err := tx.Save(&cart).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	return &cart, nil
}

func DeleteCartItems(userID uint, productIDs []uint) error {
	if err := configs.DB.
		Where("cart_id IN (SELECT id FROM carts WHERE user_id = ?) AND product_id IN (?)", userID, productIDs).
		Delete(&CartDetail{}).Error; err != nil {
		return err
	}

	return nil
}