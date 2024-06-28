package models

import (
	"errors"
	"server/src/configs"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name         string        `json:"name" validate:"required,min=3"`
	Email        string        `json:"email" validate:"required,email"`
	Password     string        `json:"password" validate:"required"`
	Image        string        `json:"image"`
	Gender       string        `json:"gender" type:"string;null"`
	Birthday     string        `json:"birthday"`
	Phone_number string        `json:"phone_number" validate:"min=10,max=13"`
	Role         string        `json:"role" type:"string;null"`
	IsVerified   bool          `json:"isVerified" gorm:"default:0"`
	Address      []APIAddress  `json:"address"`
	Store        []APIStore    `json:"store"`
	Transaction  []Transaction `json:"transaction"`
}

type UserVerification struct {
	gorm.Model
	UserID uint64 `json:"user_id"`
	Token  string `json:"token"`
	User   User   `gorm:"foreignKey:UserID;references:ID;constraint:OnDelete:CASCADE"`
}

type APIAddress struct {
	gorm.Model
	Label          string  `json:"label"`
	ReceivedName   string  `json:"received_name"`
	ContactNumber  string  `json:"contact_number"`
	Address        string  `json:"address" `
	PostalCode     string  `json:"postal_code"`
	City           string  `json:"city"`
	PrimaryAddress bool    `json:"primary" gorm:"default:0"`
	Longitude      float64 `json:"longitude"`
	Latitude       float64 `json:"latitude"`
	UserID         int     `json:"user_id"`
}

type APIStore struct {
	gorm.Model
	Name        string `json:"name" validate:"required,min=3"`
	Description string `json:"description" validate:"required,min=3"`
	Address     string `json:"address" validate:"required,min=3"`
	UserID      uint   `json:"user_id"`
}

type APICart struct {
	gorm.Model
	Quantity   uint         `json:"quantity"`
	Status     string       `json:"status"`
	UserID     string       `json:"user_id"`
	CartDetail []CartDetail `json:"cart_detail"`
}

type APITransaction struct {
	gorm.Model
	Quantity        uint64  `json:"quantity"`
	TotalAmount     float64 `json:"total_amount"`
	ShippingAddress string  `json:"shipping_address" `
	Status          string  `json:"status"`
	UserID          uint    `json:"user_id"`
	ProductID       uint64  `json:"product_id"`
	PaymentMethod   string  `json:"payment_method"`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	validRoles := map[string]bool{
		"seller":   true,
		"customer": true,
	}
	if !validRoles[u.Role] {
		return errors.New("invalid role")
	}
	return
}

func GetAllUser() []*User {
	var results []*User
	configs.DB.Preload("Address", func(db *gorm.DB) *gorm.DB {
		var items []*APIAddress
		return db.Model(&Address{}).Find(&items)
	}).Preload("Stores", func(db *gorm.DB) *gorm.DB {
		var items []*APIStore
		return db.Model(&Store{}).Find(&items)
	}).Preload("Transactions", func(db *gorm.DB) *gorm.DB {
		var items []*APITransaction
		return db.Model(&Transaction{}).Preload("Product", func(db *gorm.DB) *gorm.DB {
			return db.Preload("Product")
		}).Find(&items)
	}).Find(&results)
	return results
}

func GetDetailUser(id interface{}) *User {
	var user User
	configs.DB.Preload("Address", func(db *gorm.DB) *gorm.DB {
		var items []*APIAddress
		return db.Model(&Address{}).Find(&items)
	}).Preload("Store", func(db *gorm.DB) *gorm.DB {
		var items []*APIStore
		return db.Model(&Store{}).Find(&items)
	}).Preload("Transaction", func(db *gorm.DB) *gorm.DB {
		return db.Preload("Product").Preload("TransactionDetail")
	}).First(&user, "id = ?", id)
	return &user
}

func GetUserByEmail(email string) (*User, error) {
	var user User
	results := configs.DB.Preload("Address", func(db *gorm.DB) *gorm.DB {
		var items []*APIAddress
		return db.Model(&Address{}).Find(&items)
	}).First(&user, "email = ?", email)
	return &user, results.Error
}

func VerifyUser(verify *UserVerification) error {
	results := configs.DB.Create(&verify)
	return results.Error
}
func CheckUsersVerification(token string) (*UserVerification, error) {
	var userVerification UserVerification
	if err := configs.DB.Where("token = ?", token).First(&userVerification).Error; err != nil {
		return nil, err
	}
	return &userVerification, nil
}

func UpdateAccountVerification(ID uint) error {
	return configs.DB.Model(&User{}).Where("id = ?", ID).Update("is_verified", "true").Error
}
func DeleteUsersVerification(ID uint, token string) error {
	return configs.DB.Where("id = ? AND token = ?", ID, token).Delete(&UserVerification{}).Error
}

func CreateUser(newUser *User) error {
	results := configs.DB.Create(&newUser)
	return results.Error
}
func UpdateUser(id uint, user *User) error {
	results := configs.DB.Model(&User{}).Where("id = ?", id).Updates(user)
	return results.Error
}

func DeleteUser(id int) error {
	results := configs.DB.Delete(&User{}, "id = ?", id)
	return results.Error
}
func UploadPhotoUser(id uint, images map[string]interface{}) error {
	result := configs.DB.Model(&User{}).Where("id = ?", id).Updates(&images)
	return result.Error
}
