const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
var jwt = require('jsonwebtoken');
const CartModel = require('../models/Cart');

class GuestController {

    static register = async(req,res) => {
        try {
            // console.log(req.body);
            const { name, userName, phone, email, password, role, dob, city, state, country, postalCode } = req.body

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt)

            const data = new UserModel({
                name: name,
                userName: userName,
                phone: phone,
                email: email,
                password: hashPassword,
                role: role,
                dob: dob,
                city: city,
                state: state,
                country: country,
                postalCode: postalCode,
            })

            const dataSaved = await data.save()

            if (dataSaved) {
                res.status(201).json({ 'status': 'success', 'message': 'Registration Successful!' })
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Error, Try Again!' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static login = async(req,res) => {
        try {
            // console.log(req.body);
            const { email, password, cartItems } = req.body

            if (email && password) {
                const user = await UserModel.findOne({ email: email })

                if (user != null) {
                    const isPasswordMatched = await bcrypt.compare(password, user.password)

                    if ((user.email === email) && isPasswordMatched) {

                        // check user in cart starts
                        if (user.role === 'customer') {
                            // If cartItems exist, update or save them in the database
                            if (cartItems.length != 0) {
                                for (const cartItem of cartItems) {
                                    const existingCartItem = await CartModel.findOne({
                                        userId: user._id,
                                        productId: cartItem.productId,
                                    });

                                    if (existingCartItem) {
                                        // Update existing cart item
                                        await CartModel.updateOne(
                                            { _id: existingCartItem._id },
                                            { quantity: existingCartItem.quantity == cartItem.quantity ? existingCartItem.quantity : existingCartItem.quantity + cartItem.quantity }
                                        );
                                    } else {
                                        // Save new cart item
                                        const newCartItem = new CartModel({
                                            userId: user._id,
                                            productId: cartItem.productId,
                                            quantity: cartItem.quantity,
                                            productName: cartItem.productName,
                                            productPrice: cartItem.productPrice,
                                            productImage: cartItem.productImage,
                                        });
                                        await newCartItem.save();
                                    }
                                }
                            }
                        }
                        // check user in cart ends

                        const carts = await CartModel.find({ userId: user._id });
                        const cartProducts = carts.length !== 0 ? carts : [];

                        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY)
                        // console.log(token);
                        res.cookie('token', token)

                        res.status(201).json({ 'status': 'success', 'message': 'Login Successfully with Web Token!', token, user, cartProducts })
                    } else {
                        res.status(401).json({ 'status': 'failed', 'message': 'User not Found!' })
                    }
                } else {
                    res.status(401).json({ 'status': 'failed', 'message': 'Email not Found!' })
                }
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'All Fields are required!' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static logout = async(req,res) => {
        try {
            res.cookie("token", null, {
                expires: new Date(Date.now())
            })

            res.status(201).json({ success: true, message: 'Logged Out' })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

}
module.exports = GuestController