package models

import (
	"errors"
	"server/src/configs"

	"gorm.io/gorm"
)

type Cart struct {
	gorm.Model
	Quantity   uint         `json:"quantity" gorm:"default=1"`
	Status     string       `json:"status"`
	UserID     uint         `json:"user_id"`
	User       User         `gorm:"foreignKey:UserID"`
	CartDetail []CartDetail `json:"cart_detail"`
}

type CartDetail struct {
	gorm.Model
	TotalPrice float64 `json:"total_price"`
	ProductID  uint    `json:"product_id"`
	CartID     uint    `json:"cart_id"`
	Product    Product `gorm:"foreignKey:ProductID"`
	Cart       Cart    `gorm:"foreignKey:CartID"`
}

func GetAllCarts() []*Cart {
	var results []*Cart
	configs.DB.Model(&Cart{}).Preload("CartDetail").Find(&results)
	return results
}

func GetAllCartDetails() []*CartDetail {
	var results []*CartDetail
	configs.DB.Model(&CartDetail{}).Find(&results)
	return results
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

func AddToCart(request AddToCartRequest) (*Cart, error) {
	var user User
	var cart Cart

	tx := configs.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Check if user exists
	if err := tx.First(&user, request.UserID).Error; err != nil {
		tx.Rollback()
		return nil, errors.New("User not found")
	}

	// Check if a cart already exists for this user
	if err := tx.Where("user_id = ?", request.UserID).First(&cart).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// Create a new cart if none exists
			cart = Cart{
				Status: request.Status,
				UserID: request.UserID,
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
		// Check if product exists
		if err := tx.First(&product, item.ProductID).Error; err != nil {
			tx.Rollback()
			return nil, errors.New("Product not found")
		}

		// Check if the cart already has this product
		var cartDetail CartDetail
		if err := tx.Where("cart_id = ? AND product_id = ?", cart.ID, item.ProductID).First(&cartDetail).Error; err == nil {
			// Cart detail exists, update the quantity and total price
			cartDetail.TotalPrice += product.Price * float64(item.Quantity)
			if err := tx.Save(&cartDetail).Error; err != nil {
				tx.Rollback()
				return nil, err
			}
		} else {
			// Create new cart detail if it doesn't exist
			cartDetail = CartDetail{
				TotalPrice: product.Price * float64(item.Quantity),
				ProductID:  item.ProductID,
				CartID:     cart.ID,
			}
			if err := tx.Create(&cartDetail).Error; err != nil {
				tx.Rollback()
				return nil, err
			}
		}

		// Update the cart quantity
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

func UpdateCartQuantity(userID uint, productID uint, quantityChange int) (*Cart, error) {
	var user User
	var cart Cart

	tx := configs.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Check if user exists
	if err := tx.First(&user, userID).Error; err != nil {
		tx.Rollback()
		return nil, errors.New("User not found")
	}

	// Check if a cart already exists for this user
	if err := tx.Where("user_id = ?", userID).First(&cart).Error; err != nil {
		tx.Rollback()
		return nil, errors.New("Cart not found")
	}

	// Check if the cart already has this product
	var cartDetail CartDetail
	if err := tx.Where("cart_id = ? AND product_id = ?", cart.ID, productID).First(&cartDetail).Error; err != nil {
		tx.Rollback()
		return nil, errors.New("Product not found in cart")
	}

	// Update the quantity and total price
	if quantityChange < 0 && uint(-quantityChange) > cart.Quantity {
		tx.Rollback()
		return nil, errors.New("Quantity cannot be less than zero")
	}

	cartDetail.TotalPrice += float64(quantityChange) * cartDetail.Product.Price
	cart.Quantity = uint(int(cart.Quantity) + quantityChange)

	if cartDetail.TotalPrice < 0 {
		tx.Rollback()
		return nil, errors.New("Total price cannot be less than zero")
	}

	if err := tx.Save(&cartDetail).Error; err != nil {
		tx.Rollback()
		return nil, err
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
