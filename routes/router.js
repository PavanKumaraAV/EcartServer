// import express
const express = require('express')

//import controller
const productController = require('../controllers/productController')
const wishlistController = require('../controllers/wishlistController')
const cartController = require('../controllers/cartController')

//Router()
const router = new express.Router()

//get all products api
//router.http-request(path,callback to define logic to resolve api)
router.get('/products/get-all-products', productController.getAllProducts)

//router for view single product  details
router.get('/products/:id', productController.viewProduct)

// route for add to wishlist
router.post('/products/add-to-wishlist', wishlistController.addToWishlist)

// router to get all wishlist item
router.get('/wishlist/get-all-items', wishlistController.getAllWishlistItems)

//router to remove an item from wishlist
router.delete('/wishlist/remove-item/:id',wishlistController.removeWishlistItem)

//router to add item to cart
router.post('/products/add-to-cart', cartController.addToCart)

// router to get all items in the cart
router.get('/cart/get-all-cartitems',cartController.allCartProducts)

// router to remove particular item from cart
router.delete('/cart/item/:id', cartController.removeCartItems)

// route for increamenting cart item quantity
router.get('/cart/increament-item/:id', cartController.increamentCartItem)

// route for decreamenting cart item quantity
router.get('/cart/decreament-item/:id', cartController.decreamentCartItem)

// route for empty cart
router.delete('/cart/empty-cart' , cartController.emptyCart)

//export router
module.exports =  router






//***router object is used to define routes for all api request which given by the client
//*  model view controller - mvc *//