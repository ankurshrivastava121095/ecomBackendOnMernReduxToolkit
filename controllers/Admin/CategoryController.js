const CategoryModel = require("../../models/Category")
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'depjzfj9a', 
    api_key: '489915939841262', 
    api_secret: '5tBdTUHJ33XMIN3iP-49Rfeps9I',
    // secure: true
});

class CategoryController {

    static storeCategory = async(req,res) => {
        try {
            // console.log(req.body);
            // console.log(req.files);
            const { categoryName, categoryDescription } = req.body
            
            const file = req.files.categoryImage

            if (file.size >= 1500000) {
                res.status(401).json({ 'status': 'failed', 'message': 'File Size is too long, Select less than 15MB' })
            } else {
                const myCloud = await cloudinary.uploader.upload(file.tempFilePath,{
                    folder : 'oriolEcomImages'
                })
                const data = new CategoryModel({
                    categoryName : categoryName,
                    categoryDescription : categoryDescription,
                    categoryImage: {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url,
                    },
                })
    
                const isDataSaved = await data.save()
    
                if (isDataSaved) {
                    res.status(201).json({ 'status': 'success', 'message': 'Category Saved Successfully' })
                } else {
                    res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
                }
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failedyyyyyy', 'message': err })
        }
    }

    static fetchCategories = async(req,res) => {
        try {
            const data = await CategoryModel.find({ isDeleted: 0 }).sort({ _id: -1 })
            // console.log(data);
            res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static fetchCategory = async(req,res) => {
        try {
            const data = await CategoryModel.findById(req.params.id)
            // console.log(data);
            res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }
    
    static updateCategory = async(req,res) => {
        try {
            // console.log(req.body);
            // console.log(req.file);
            const { categoryName, categoryDescription } = req.body

            if (req.files != null) {
                var categoryImg = await CategoryModel.findById(req.params.id)

                if (categoryImg.categoryImage.public_id) {
                    var imageId = categoryImg.categoryImage.public_id
        
                    await cloudinary.uploader.destroy(imageId)
                }
                
                var file = req.files.categoryImage
      
                var myCloud = await cloudinary.uploader.upload(file.tempFilePath,{
                    folder : 'oriolEcomImages'
                })
                var data = await CategoryModel.findByIdAndUpdate(req.params.id,{
                    categoryName : categoryName,
                    categoryDescription : categoryDescription,
                    categoryImage: {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url,
                    },
                })
            } else {
                var data = await CategoryModel.findByIdAndUpdate(req.params.id,{
                    categoryName : categoryName,
                    categoryDescription : categoryDescription,
                })
            }

            if (data) {
                res.status(201).json({ 'status': 'success', 'message': 'Category Updated Successfully' })
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static deleteCategory = async(req,res) => {
        try {
            const data = await CategoryModel.findByIdAndUpdate(req.params.id,{
                isDeleted : 1,
            })

            if (data) {
                res.status(201).json({ 'status': 'success', 'message': 'Category Deleted Successfully' })
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

}
module.exports = CategoryController