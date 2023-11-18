const OrderModel = require("../../models/Order");
const OrderedProductModel = require("../../models/OrderedProduct");

class OrderController {

    static orderPlaced = async(req,res) => {
        try {
            const { userId, shippingInfo, otherData } = req.body

            const order = new OrderModel({
                userId: userId,
                shippingInfo: {
                    name: shippingInfo.name,
                    email: shippingInfo.email,
                    userName: shippingInfo.userName,
                    phone: shippingInfo.phone,
                    city: shippingInfo.city,
                    state: shippingInfo.state,
                    country: shippingInfo.country,
                    postalCode: shippingInfo.postalCode,
                    address: shippingInfo.address,
                },
                subTotal: otherData.subTotal,
                discount: otherData.discount,
                deliveryCharge: otherData.deliveryCharge,
                grandTotal: otherData.grandTotal,
                paymentMode: otherData.paymentMode,
            });

            const savedOrder = await order.save();

            for (const product of otherData.productData) {
                const orderedProduct = new OrderedProductModel({
                    userId: userId,
                    orderId: savedOrder._id,
                    productDetail: {
                        productId: product.productId,
                        productName: product.productName,
                        productPrice: product.productPrice,
                        productQuantity: product.quantity,
                        productImage: product.productImage,
                    }
                });

                await orderedProduct.save();
            }
            res.status(201).json({ 'status': 'success', 'message': 'Order Placed Successfully' })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static fetchOrders = async(req,res) => {
        try {
            // const data = await OrderedProductModel.find().sort({ _id: -1 })

            const data = await OrderedProductModel.aggregate([
                {
                    $lookup: {
                        from: 'orders',
                        localField: 'orderId',
                        foreignField: '_id',
                        as: 'orderData',
                    },
                },
                {
                    $unwind: '$orderData',
                },
                {
                    $addFields: {
                        orderedProductId: '$_id',
                    },
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: ['$orderData', '$$ROOT'] }}
                },
                {
                    $project: {
                        'orderData._id': 0,
                    },
                },
                {
                    $sort: {
                        '_id': -1
                    }
                }
            ]);
            // console.log(data);
            res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static fetchOrdersByUserId = async(req,res) => {
        try {
            const data = await OrderedProductModel.find({ userId: req.params.id }).sort({ _id: -1 })
            // console.log(data);
            res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static fetchOrder = async(req,res) => {
        try {
            const orderedProduct = await OrderedProductModel.findById(req.params.id)
            const order = await OrderModel.findOne({ _id: orderedProduct.orderId})
            const data = { orderedProduct, order }
            // console.log(data);
            res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static updateOrder = async(req,res) => {
        try {
            const { status } = req.body

            const today = new Date();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');
            const year = today.getFullYear();
          
            const currentDate = `${month}/${day}/${year}`;

            if (status == 'Shipped') {
                var data = await OrderedProductModel.findByIdAndUpdate(req.params.id, {
                    status: status,
                    isShipped: 1,
                    shipmentDate: currentDate,
                    isOutForDelivery: 0,
                    isDelivered: 0,
                })
            }
            if (status == 'Out for delivery') {
                var data = await OrderedProductModel.findByIdAndUpdate(req.params.id, {
                    status: status,
                    isShipped: 1,
                    isOutForDelivery: 1,
                    outForDeliveryDate: currentDate,
                    isDelivered: 0,
                })
            }
            if (status == 'Delivered') {
                var data = await OrderedProductModel.findByIdAndUpdate(req.params.id, {
                    status: status,
                    isShipped: 1,
                    isOutForDelivery: 1,
                    isDelivered: 1,
                    deliveryDate: currentDate
                })
            }
            if (status == 'Cancelled') {
                var data = await OrderedProductModel.findByIdAndUpdate(req.params.id, {
                    status: status,
                    isCancelled: 1,
                    cancellationDate: currentDate
                })
            }

            if (data) {
                res.status(201).json({ 'status': 'success', 'message': 'Order Status Updated Successfully' })
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

}
module.exports = OrderController