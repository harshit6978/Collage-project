// const Order = require('../models/order');
const Order = require('../model/Order')
const stripe = require('stripe')(
    "sk_test_51OnaOiSISq8QzUEdbr9U1RI7oL96iScLH7n2B0aKrTY26huu4YHcyJteLRfDqfE0VMg7JSB8rmqcZKSbRhejbEM200QAKSZE2t"
);

const createOrder = async (req, res) => {
    try {
        const { user, items, totalAmount } = req.body;
        const session = await stripe.checkout.sessions.create({
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
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        order.status = "Delivered";
        await order.save();
        res.status(200).json({
            success: true,
            data: order,
            message: "Order marked as delivered",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

const markOrderAsPreparing = async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        order.status = "Preparing";
        await order.save();
        res.status(200).json({
            success: true,
            data: order,
            message: "Order marked as Preparing",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};


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
        console.log(req.body, "777777777777");
        const userOrders = await Order.find()
            .populate("items.food")
            .populate("user");
        res.status(200).json({
            success: true,
            data: userOrders,
        })
        console.log(userOrders, '?>?>?>>>>?>?>?>?>?');

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
        })
    }
}

const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;

        // Check if the order exists
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Delete the order
        await Order.findByIdAndDelete(orderId);

        res.status(200).json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};




module.exports = { createOrder, getAllOrders, getSingleOrder, markOrderAsDelivered, deleteOrder, markOrderAsPreparing }