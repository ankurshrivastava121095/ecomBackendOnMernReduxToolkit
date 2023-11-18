const WishlistModel = require("../../models/Wishlist")

class WishlistController {

    static storeProductInWishlist = async(req,res) => {
        try {
            const { userId, productId, productDetail } = req.body

            const isProductExist = await WishlistModel.findOne({ userId: userId, productId: productId })

            if (isProductExist) {
                await WishlistModel.findByIdAndDelete(isProductExist._id)
            }

            const data = new WishlistModel({
                userId: userId,
                productId: productId,
                productDetail: {
                    productName: productDetail.productName,
                    productPrice: productDetail.productPrice,
                    productImage: productDetail.productImage,
                }
            })
            const dataSaved = await data.save()

            if (dataSaved) {
                res.status(201).json({ 'status': 'success', 'message': 'Product Added in Wishlist' })
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static fetchAllWishlistProducts = async(req,res) => {
        try {
            const data = await WishlistModel.find().sort({ _id: -1 })
            res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static fetchWishlistProducts = async(req,res) => {
        try {
            const data = await WishlistModel.find({ userId: req.params.id })
            // console.log(data);

            res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

    static deleteProductFromWishlist = async(req,res) => {
        try {
            const { userId } = req.body
            const productId = req.params.id

            const isProductExist = await WishlistModel.findOne({ userId: userId, productId: productId })

            if (isProductExist) {
                const data = await WishlistModel.findByIdAndDelete(isProductExist._id)

                if (data) {
                    res.status(201).json({ 'status': 'success', 'message': 'Product Deleted Successfully' })
                } else {
                    res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
                }
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Product does not Exist' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

}
module.exports = WishlistController