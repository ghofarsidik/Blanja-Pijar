package controllers

import (
	"server/src/middlewares"
	"server/src/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetAllCarts(c *fiber.Ctx) error {
	carts := models.GetAllCarts()
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"statusCode": fiber.StatusOK,
		"message":    "Successfully retrieved all carts",
		"data":       carts,
	})
}
func GetAllCartDetails(c *fiber.Ctx) error {
	carts_details := models.GetAllCartDetails()
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"statusCode": fiber.StatusOK,
		"message":    "Successfully retrieved all carts_details",
		"data":       carts_details,
	})
}
func GetCartByUserId(c *fiber.Ctx) error {
	claims := middlewares.GetUserClaims(c)
	userID := claims["ID"].(float64)
	res := models.GetCartByUserId(uint(userID))
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":    "OK",
		"statusCode": fiber.StatusOK,
		"data":       res,
	})

}
func GetActiveCartDetail(c *fiber.Ctx) error {
	claims := middlewares.GetUserClaims(c)
	userID := claims["ID"].(float64)
	res, _ := models.GetActiveCartDetail(uint(userID))
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":    "OK",
		"statusCode": fiber.StatusOK,
		"data":       res,
	})
}
func SelectAllChecked(c *fiber.Ctx) error {
	var request struct {
		ID      []uint64 `json:"id"`
		Checked bool     `json:"checked"`
	}
	claims := middlewares.GetUserClaims(c)
	userID := claims["ID"].(float64)
	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message":    "Failed to parse request body",
			"statusCode": fiber.StatusBadRequest,
		})
	}

	if err := models.SelectAllChecked(request.ID, request.Checked); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message":    "Failed to update cart details",
			"statusCode": fiber.StatusInternalServerError,
		})
	}
	cart, notFound := models.GetActiveCartByUserId(uint(userID))
	if notFound != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message":    "Failed to get cart",
			"statusCode": fiber.StatusInternalServerError,
		})
	}
	var total_amount float64
	for _, item := range cart.CartDetail {
		if !item.IsChecked {
			total_amount = float64(0)
			newCart := models.Cart{
				Status:     cart.Status,
				TotalAmout: &total_amount,
				UserID:     cart.UserID,
			}
			if err := models.UpdateCart(cart.ID, &newCart); err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"error": err.Error(),
				})
			}
		} else {
			total_amount += item.TotalPrice
			newCart := models.Cart{
				Status:     cart.Status,
				TotalAmout: &total_amount,
				UserID:     cart.UserID,
			}
			if err := models.UpdateCart(cart.ID, &newCart); err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"error": err.Error(),
				})
			}
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":    "Successfully updated cart details",
		"statusCode": fiber.StatusOK,
	})
}
func AddToCart(c *fiber.Ctx) error {
	var request models.AddToCartRequest
	claims := middlewares.GetUserClaims(c)
	userID := uint(claims["ID"].(float64))

	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message":    "Failed to parse request body",
			"statusCode": fiber.StatusBadRequest,
		})
	}

	cart, err := models.GetActiveCartByUserId(userID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message":    "Failed to get cart",
			"statusCode": fiber.StatusInternalServerError,
		})
	}

	if cart != nil {
		for _, item := range cart.CartDetail {
			if item.ProductID == request.ProductID && item.Size == request.Size && item.Color == request.Color && !item.DeletedAt.Valid {
				products := models.GetDetailProduct(int(item.ProductID))
				if products.Stock < request.Quantity {
					return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{
						"message": "Product out fo Stock",
					})
				}
				newQuantity := request.Quantity + item.Quantity
				newTotalPrice := newQuantity * uint(products.Price)
				newCartDetail := models.CartDetail{
					ProductID:  item.ProductID,
					CartID:     item.CartID,
					Size:       item.Size,
					Color:      item.Color,
					IsChecked:  true,
					Quantity:   newQuantity,
					TotalPrice: float64(newTotalPrice),
				}
				if err := models.UpdateCartDetail(int(item.ID), &newCartDetail); err != nil {
					return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
						"message": err.Error(),
					})
				}
				cart, notFound := models.GetActiveCartByUserId(userID)
				if notFound != nil {
					return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
						"message":    "Failed to get cart",
						"statusCode": fiber.StatusInternalServerError,
					})
				}
				var total_amount float64
				if len(cart.CartDetail) > 1 {
					for _, item := range cart.CartDetail {
						if item.IsChecked {
							total_amount += item.TotalPrice
						}
					}
				} else {
					total_amount = float64(newTotalPrice)
				}

				newCart := models.Cart{
					Status:     cart.Status,
					TotalAmout: &total_amount,
					UserID:     cart.UserID,
				}
				if err := models.UpdateCart(cart.ID, &newCart); err != nil {
					return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
						"error": err.Error(),
					})
				}
				return c.Status(fiber.StatusOK).JSON(fiber.Map{
					"message": "Product success added to your cart",
				})
			} else {
				products := models.GetDetailProduct(int(request.ProductID))
				var totalPrice float64
				if products.Stock < request.Quantity {
					return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{
						"message": "Product out fo Stock",
					})
				}

				totalPrice = products.Price * float64(request.Quantity)
				cartDetail := models.CartDetail{
					CartID:     cart.ID,
					ProductID:  products.ID,
					Size:       request.Size,
					Color:      request.Color,
					Quantity:   request.Quantity,
					IsChecked:  true,
					TotalPrice: totalPrice,
				}

				if err := models.AddToCartDetail(&cartDetail); err != nil {
					return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
						"message":    "Failed to add product to cart",
						"statusCode": fiber.StatusInternalServerError,
					})
				}
				cart, err := models.GetActiveCartByUserId(userID)
				if err != nil {
					return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
						"message":    "Failed to get cart",
						"statusCode": fiber.StatusInternalServerError,
					})
				}
				var total_amount float64
				for _, item := range cart.CartDetail {
					if item.IsChecked {
						total_amount += item.TotalPrice
					}
				}
				newCart := models.Cart{
					Status:     cart.Status,
					TotalAmout: &total_amount,
					UserID:     cart.UserID,
				}
				if err := models.UpdateCart(cart.ID, &newCart); err != nil {
					return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
						"error": err.Error(),
					})
				}
				return c.Status(fiber.StatusOK).JSON(fiber.Map{
					"message": "Product success added to your cart",
				})
			}
		}

	} else {
		products := models.GetDetailProduct(int(request.ProductID))
		var totalPrice float64
		if products.Stock < request.Quantity {
			return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{
				"message": "Product out fo Stock",
			})
		}
		totalPrice = products.Price * float64(request.Quantity)
		newCart := models.Cart{
			Status: "active",
			UserID: userID,
			CartDetail: []models.CartDetail{
				{
					ProductID:  products.ID,
					Quantity:   request.Quantity,
					IsChecked:  true,
					Size:       request.Size,
					Color:      request.Color,
					TotalPrice: totalPrice,
				},
			},
		}

		if err := models.AddToCart(&newCart); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message":    products,
				"statusCode": fiber.StatusInternalServerError,
			})
		}
	}
	cart, notFound := models.GetActiveCartByUserId(userID)
	if notFound != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message":    "Failed to get cart",
			"statusCode": fiber.StatusInternalServerError,
		})
	}
	var total_amount float64
	for _, item := range cart.CartDetail {
		if item.IsChecked {
			total_amount += item.TotalPrice
		}
	}
	newCart := models.Cart{
		Status:     cart.Status,
		TotalAmout: &total_amount,
		UserID:     cart.UserID,
	}
	if err := models.UpdateCart(cart.ID, &newCart); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Product success added to your cart",
	})
}

func UpdateQuantityCartDetail(c *fiber.Ctx) error {
	var request models.CartDetail
	claims := middlewares.GetUserClaims(c)
	userID := uint(claims["ID"].(float64))
	id, _ := strconv.Atoi(c.Params("id"))

	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message":    "Failed to parse request body",
			"statusCode": fiber.StatusBadRequest,
		})
	}
	foundDetail := models.GetCartDetailById(id)
	if foundDetail.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Cart detail not found",
		})
	}
	newQuantity := request.Quantity
	newTotalPrice := newQuantity * uint(foundDetail.Product.Price)
	newCartDetail := models.CartDetail{
		ProductID:  foundDetail.ProductID,
		CartID:     foundDetail.CartID,
		IsChecked:  true,
		Quantity:   newQuantity,
		TotalPrice: float64(newTotalPrice),
	}
	if err := models.UpdateCartDetail(id, &newCartDetail); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	cart, notFound := models.GetActiveCartByUserId(userID)
	if notFound != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message":    "Failed to get cart",
			"statusCode": fiber.StatusInternalServerError,
		})
	}
	var total_amount float64
	if len(cart.CartDetail) > 1 {
		for _, item := range cart.CartDetail {
			if item.IsChecked {
				total_amount += item.TotalPrice
			}
		}
	} else {
		total_amount = float64(newTotalPrice)
	}
	newCart := models.Cart{
		Status:     cart.Status,
		TotalAmout: &total_amount,
		UserID:     cart.UserID,
	}
	if err := models.UpdateCart(cart.ID, &newCart); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Updated successfully",
	})
}

func DeleteAllCart(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	if err := models.DeleteCart(uint(id)); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})

	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Successfull deleted cart",
	})
}

func DeleteCartDetailItem(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	claims := middlewares.GetUserClaims(c)
	userID := uint(claims["ID"].(float64))
	if err := models.DeleteItemCartDetail(uint(id)); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	cart, _ := models.GetActiveCartByUserId(userID)
	var total_amount float64
	for _, item := range cart.CartDetail {
		if item.IsChecked {
			total_amount += item.TotalPrice
		} else {
			total_amount = float64(0)
		}
	}
	newCart := models.Cart{
		Status:     cart.Status,
		TotalAmout: &total_amount,
		UserID:     cart.UserID,
	}
	if err := models.UpdateCart(cart.ID, &newCart); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Successfull delete item",
	})
}

func UpdateIsChekedItem(c *fiber.Ctx) error {
	var request models.CartDetail
	claims := middlewares.GetUserClaims(c)
	userID := uint(claims["ID"].(float64))
	id, _ := strconv.Atoi(c.Params("id"))

	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message":    "Failed to parse request body",
			"statusCode": fiber.StatusBadRequest,
		})
	}
	foundDetail := models.GetCartDetailById(id)
	if foundDetail.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Cart detail not found",
		})
	}
	newCartDetail := models.CartDetail{
		ProductID:  foundDetail.ProductID,
		CartID:     foundDetail.CartID,
		IsChecked:  request.IsChecked,
		Quantity:   foundDetail.Quantity,
		TotalPrice: foundDetail.TotalPrice,
	}
	if err := models.UpdateChekedItem(id, &newCartDetail); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	cart, notFound := models.GetActiveCartByUserId(userID)
	if notFound != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message":    "Failed to get cart",
			"statusCode": fiber.StatusInternalServerError,
		})
	}
	var total_amount float64
	anyChecked := false
	for _, item := range cart.CartDetail {
		if item.IsChecked {
			total_amount += item.TotalPrice
			anyChecked = true
		}
		if !anyChecked {
			total_amount = 0
		}
		newCart := models.Cart{
			Status:     cart.Status,
			TotalAmout: &total_amount,
			UserID:     cart.UserID,
		}
		if err := models.UpdateCart(cart.ID, &newCart); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": err.Error(),
			})
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Success updating item list",
	})
}

// func DeleteCartItems(c *fiber.Ctx) error {
// 	claims := middlewares.GetUserClaims(c)
// 	userID := uint(claims["ID"].(float64))

// 	var request models.DeleteCartRequest
// 	if err := c.BodyParser(&request); err != nil {
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"message":    "Failed to parse request body",
// 			"statusCode": fiber.StatusBadRequest,
// 		})
// 	}

// 	err := models.DeleteCartItems(userID, request.ProductIDs)
// 	if err != nil {
// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 			"message":    fmt.Sprintf("Failed to delete cart items, %v", err.Error()),
// 			"statusCode": fiber.StatusInternalServerError,
// 		})
// 	}

// 	return c.Status(fiber.StatusOK).JSON(fiber.Map{
// 		"message":    "Deleted items successfully",
// 		"statusCode": fiber.StatusOK,
// 	})
// }
