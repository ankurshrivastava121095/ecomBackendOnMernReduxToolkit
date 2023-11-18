const express = require('express')
const GuestController = require('../controllers/GuestController')
const CategoryController = require('../controllers/Admin/CategoryController')
const ProductController = require('../controllers/Admin/ProductController')
const CartController = require('../controllers/Customer/CartController')
const OrderController = require('../controllers/Customer/OrderController')
const WishlistController = require('../controllers/Customer/WishlistController')
const router = express.Router()


// GuestController
router.post('/register',GuestController.register)
router.post('/login',GuestController.login)


//CategoryController
router.post('/storeCategory',CategoryController.storeCategory)
router.get('/fetchCategories',CategoryController.fetchCategories)
router.get('/fetchCategory/:id',CategoryController.fetchCategory)
router.put('/updateCategory/:id',CategoryController.updateCategory)
router.delete('/deleteCategory/:id',CategoryController.deleteCategory)


//ProductController
router.post('/storeProduct',ProductController.storeProduct)
router.get('/fetchProducts',ProductController.fetchProducts)
router.get('/fetchProduct/:id',ProductController.fetchProduct)
router.get('/fetchProductsCategoryWise/:id',ProductController.fetchProductsCategoryWise)
router.put('/updateProduct/:id',ProductController.updateProduct)
router.delete('/deleteProduct/:id',ProductController.deleteProduct)


//CartController
router.post('/storeProductInCart',CartController.storeProductInCart)
router.get('/fetchCartProducts',CartController.fetchCartProducts)
router.put('/updateProductInCart',CartController.updateProductInCart)
router.put('/deleteProductFromCart',CartController.deleteProductFromCart)
router.put('/clearCart',CartController.clearCart)


//OrderController
router.post('/orderPlaced',OrderController.orderPlaced)
router.get('/fetchOrders',OrderController.fetchOrders)
router.get('/fetchOrders/:id',OrderController.fetchOrdersByUserId)
router.get('/fetchOrder/:id',OrderController.fetchOrder)
router.put('/updateOrder/:id',OrderController.updateOrder)


//WishlistController
router.post('/storeProductInWishlist',WishlistController.storeProductInWishlist)
router.get('/fetchWishlistProducts',WishlistController.fetchAllWishlistProducts)
router.get('/fetchWishlistProducts/:id',WishlistController.fetchWishlistProducts)
router.put('/deleteProductFromWishlist/:id',WishlistController.deleteProductFromWishlist)



module.exports = router