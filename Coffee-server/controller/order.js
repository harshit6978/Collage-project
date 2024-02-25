// const Order = require('../models/order');
const Order =require('../model/Order')
const stripe = require('stripe')(
    "sk_test_51OnaOiSISq8QzUEdbr9U1RI7oL96iScLH7n2B0aKrTY26huu4YHcyJteLRfDqfE0VMg7JSB8rmqcZKSbRhejbEM200QAKSZE2t"
);

const createOrder = async (req, res) => {
    try {
        const { user, items, totalAmount } = req.body;
        const session = await stripe.checkout.session.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: "Paid for Food",
                        },
                        unit_amount: totalAmount * 100,
                    },
                    quantity: 1,
                }
            ],
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
        })

        if (session.id) {
            const newOrder = new Order({
                user,
                items,
                totalAmount,
            })
            const saveOrder = await newOrder.save();
            await Order.findByIdAndUpdate(saveOrder._id, {
                payment: true,
            })

            res.status(200).json({
                message: "Order Created Successfull",
                success: true,
                data: saveOrder,
                sessionId: session.id,
            })
        } else {
            res.status(200).json({
                message: "Not Success",
                success: false,
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
        })
    }
}


const markOrderAsDelivered = async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await Order.findById(orderId);
        order.status = "Delivered";
        await order.save();
        res.status(200).json({
            success: true,
            data: order,
            message: "Deliverd",
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            success: false,
        })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("items.food").populate("user");
        res.status(200).json({
            success: true,
            data: orders,
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
        })
    }
}


const getSingleOrder = async (req, res) => {
    try {
        const { userId } = req.body;
        const userOrders = await Order.find({ user: userId })
            .populate("items.food")
            .populate("user");
        res.status(200).json({
            success: true,
            data: userOrders,
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
        })
    }
}
module.exports = { createOrder, getAllOrders, getSingleOrder, markOrderAsDelivered }