const Food = require('../model/Food')

const createFood = async (req, res) => {
    try {
        const { name, price, description, catagory, weight, foodImage } = req.body;
        const newFood = new Food({
            name,
            price,
            description,
            catagory,
            weight,
            foodImage,
        })
        const saveFood = newFood.save();
        res.status(200).json({
            message: "Food successfully added",
            success: true,
            data: {
                food: saveFood
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "internal server error",
            success: false,
        })
    }
}

const getAllFoods = async (req, res) => {
    try {
        const { category } = req.query;
        if (category === "all") {
            const foodItems = await Food.find()
            res.status(200).json({
                message: "Food successfully added",
                success: true,
                data: {
                    food: foodItems,
                }
            })
        } else {
            const foodItems = await Food.find({ catagory: category })
            res.status(200).json({
                message: "Food successfully added",
                success: true,
                data: {
                    food: foodItems,
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "internal server error",
            success: false,
        })
    }
}


const getNewFoods = async (req, res) => {
    try {

        const foodItems = await Food.find().sort({ createdAt: -1 }).limit(12)
        res.status(200).json({
            message: "12 Register Food Showing",
            success: true,
            data: {
                food: foodItems,
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "internal server error",
            success: false,
        })
    }
}


const getFoodById = async (req, res) => {
    try {
        const { id } = req.params;

        const foodItems = await Food.findById(id)
        res.status(200).json({
            message: "Food details",
            success: true,
            data: {
                food: foodItems,
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "internal server error",
            success: false,
        })
    }
}


const getFoodsFromDistinctCatagory = async (req, res) => {
    try {
        const distinctCatagory = await Food.distinct("catagory");
        const distinctfood = await Promise.all(
            distinctCatagory.slice(0, 4).map(async (catagory) => {
                const food = await Food.findOne({ catagory });
                return food;
            })
        )
        res.status(200).json({
            message: "4 Different Catagory Food",
            success: true,
            data: {
                food: distinctfood,
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "internal server error",
            success: false,
        })
    }
}


const getTopRating = async (req, res) => {
    try {
        const topRatedFoods = await Food.find().sort({ "reviews.rating": -1 });

        res.status(200).json({
            message: "Get Top Rated Foods",
            success: true,
            data: {
                food: topRatedFoods,
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "internal server error",
            success: false,
        })
    }
}

module.exports = { createFood, getAllFoods, getFoodById, getNewFoods, getFoodsFromDistinctCatagory, getTopRating }