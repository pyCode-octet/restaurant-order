const Restaurant = require('../models/resto.model');


// Get all restaurants with optional filtering by neighborhood and food type

exports.getAllRestaurants = async (req, res) => {
    try {
        const {neighborhood, food_type} = req.query;
        let filter = {};
        if (neighborhood) {
            filter.neighborhood = { $regex: neighborhood, $options: 'i' }; // case-insensitive exemple Pissy and pissy
        }
        if (food_type) {
            filter.food_types = { $regex: food_type, $options: 'i' }; // case-insensitive exemple Italian and italian
        }
        const restaurants = await Restaurant.find(filter);
        res.status(200).json({
            count: restaurants.length,
            data: restaurants
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};