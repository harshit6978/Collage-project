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

        const foodItems = await Food.find().sort({ createdAt: -1 }).limit(10)
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
            distinctCatagory.slice(0, 8).map(async (catagory) => {
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

const deleteFood = async function (req, res) {
    try {
        const fooddatadelete = await Food.findByIdAndDelete({
            _id: req.params.id,
        });
        if (!fooddatadelete) {
            return res.status(400).json({
                status: "Fail",
                message: "food not found",
            });
        }
        res.status(200).json({
            status: "Sucess",
            message: "food delete sucessfully",
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: "food not found",
        });
    }
};


const updateFood = async (req, res) => {
    const { id } = req.params;
    const { price, foodImage, name } = req.body;

    try {
        // Find the food item by ID
        let food = await Food.findById(id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        // Update the price and/or foodImage
        if (price) {
            food.price = price;
        }
        if (name) {
            food.name = name;
        }
        if (foodImage) {
            food.foodImage = foodImage;
        }

        // Save the updated food item
        await food.save();

        res.status(200).json({ success: true, message: "Food details updated successfully", data: food });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};




module.exports = { createFood, getAllFoods, getFoodById, getNewFoods, getFoodsFromDistinctCatagory, getTopRating, deleteFood, updateFood }