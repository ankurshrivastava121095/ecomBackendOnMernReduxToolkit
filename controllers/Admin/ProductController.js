const CategoryModel = require("../../models/CAtegory");
const ProductModel = require("../../models/Product")
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'depjzfj9a', 
    api_key: '489915939841262', 
    api_secret: '5tBdTUHJ33XMIN3iP-49Rfeps9I',
    // secure: true
});

class ProductController {

    static storeProduct = async(req,res) => {
        try {
            // console.log(req.body);
            // console.log(req.files);
            const { productName, productDescription, productCategory, productPrice, productQuantity } = req.body
            
            const file = req.files.productImage
    
            const myCloud = await cloudinary.uploader.upload(file.tempFilePath,{
                folder : 'oriolEcomImages'
            })
            const data = new ProductModel({
                productName : productName,
                productDescription : productDescription, 
                productCategory : productCategory, 
                productPrice : productPrice, 
                productQuantity : productQuantity,
                productImage: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
            })

            const isDataSaved = await data.save()

            if (isDataSaved) {
                res.status(201).json({ 'status': 'success', 'message': 'Project Saved Successfully' })
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static fetchProducts = async(req,res) => {
        try {
            const data = await ProductModel.aggregate([
                {
                    $match: {
                        isDeleted: 0,
                    },
                },
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'productCategory',
                        foreignField: '_id',
                        as: 'categoryData',
                    },
                },
                {
                    $unwind: '$categoryData',
                },
                {
                    $addFields: {
                        categoryId: '$categoryData._id',
                    },
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: ['$categoryData', '$$ROOT'] }}
                },
                {
                    $project: {
                        'categoryData._id': 0,
                    },
                },
            ]);
            // const data = await ProductModel.find({ isDeleted: 0 }).sort({ _id: -1 })
            // console.log('Data--->>',data);
            res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static fetchProductsCategoryWise = async(req,res) => {
        try {
            const products = await ProductModel.find({ productCategory: req.params.id })
            const category = await CategoryModel.findById(req.params.id)
            const data = { products, category }
            res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static fetchProduct = async(req,res) => {
        try {
            const data = await ProductModel.findById(req.params.id)
            // console.log(data);
            res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }
    
    static updateProduct = async(req,res) => {
        try {
            // console.log(req.body);
            // console.log(req.file);
            const { productName, productDescription, productCategory, productPrice, productQuantity } = req.body

            if (req.files != null) {
                var productImg = await ProductModel.findById(req.params.id)

                if (productImg.productImage.public_id) {
                    var imageId = productImg.productImage.public_id
        
                    await cloudinary.uploader.destroy(imageId)
                }
                
                var file = req.files.productImage
      
                var myCloud = await cloudinary.uploader.upload(file.tempFilePath,{
                    folder : 'oriolEcomImages'
                })
                var data = await ProductModel.findByIdAndUpdate(req.params.id,{
                    productName : productName,
                    productDescription : productDescription, 
                    productCategory : productCategory, 
                    productPrice : productPrice, 
                    productQuantity : productQuantity,
                    productImage: {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url,
                    },
                })
            } else {
                var data = await ProductModel.findByIdAndUpdate(req.params.id,{
                    productName : productName,
                    productDescription : productDescription, 
                    productCategory : productCategory, 
                    productPrice : productPrice, 
                    productQuantity : productQuantity,
                })
            }

            if (data) {
                res.status(201).json({ 'status': 'success', 'message': 'Project Updated Successfully' })
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static deleteProduct = async(req,res) => {
        try {
            const data = await ProductModel.findByIdAndUpdate(req.params.id,{
                isDeleted : 1,
            })

            if (data) {
                res.status(201).json({ 'status': 'success', 'message': 'Project Deleted Successfully' })
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

}
module.exports = ProductController