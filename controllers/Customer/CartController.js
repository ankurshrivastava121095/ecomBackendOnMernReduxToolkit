const CartModel = require("../../models/Cart")

class CartController{

    static storeProductInCart = async(req,res) => {
        try {
            const { userId, productId, productName, productPrice, quantity, productImage } = req.body

            const isProductExist = await CartModel.findOne({ userId: userId, productId: productId })

            if (!isProductExist) {
                const dataSave = new CartModel({
                    userId: userId,
                    productId: productId,
                    productName: productName,
                    productPrice: productPrice,
                    quantity: quantity,
                    productImage: productImage,
                })
                var data = await dataSave.save()
            } else {
                var data = await CartModel.findByIdAndUpdate(productId, {
                    productName: productName,
                    quantity: isProductExist.quantity + quantity,
                    productImage: productImage,
                    productPrice: productPrice,
                }) 
            }

            if (data) {
                res.status(201).json({ 'status': 'success', 'message': 'Product Added in Cart' })
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static fetchCartProducts = async(req,res) => {
        try {
            const data = await CartModel.find({ userId: req.params.id })
            res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static updateProductInCart = async(req,res) => {
        try {
            const { userId, productId, productName, productPrice, quantity, productImage } = req.body

            const isProductExist = await CartModel.findOne({ userId: userId, productId: productId })

            if (isProductExist) {
                var data = await CartModel.findByIdAndUpdate(isProductExist._id, {
                    productName: productName,
                    quantity: quantity,
                    productImage: productImage,
                    productPrice: productPrice,
                })

                if (data) {
                    res.status(201).json({ 'status': 'success', 'message': 'Product Updated in Cart' })
                } else {
                    res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
                }
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static deleteProductFromCart = async(req,res) => {
        try {
            const { userId, productId } = req.body

            const isProductExist = await CartModel.findOne({ userId: userId, productId: productId })

            if (isProductExist) {     
                const data = await CartModel.findByIdAndDelete(isProductExist._id)
    
                if (data) {
                    res.status(201).json({ 'status': 'success', 'message': 'Product Deleted from Cart' })
                } else {
                    res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
                }
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static clearCart = async (req, res) => {
        try {
            const { userId } = req.body;
    
            const carts = await CartModel.find({ userId: userId });
    
            if (carts.length !== 0) {
                const clearCart = await CartModel.deleteMany({ userId: userId });
            }
            res.status(201).json({ status: 'success', message: 'Cart cleared successfully' });
        } catch (err) {
            res.status(500).json({ status: 'failed', message: err.message });
        }
    };

}
module.exports = CartController