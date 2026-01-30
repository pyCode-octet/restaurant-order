const mongoose= require('mongoose');

const restoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        required: true,
        default: 'Ouagadouguou',   // default city
        trim: true
    },
    neighborhood: {      // quartier
        type: String,
        trim: true
    },
    address: {            // detailed address
        type: String,
        required: true,
        trim: true
    },
    food_types: [{     // types de cuisine
        type: String,
        trim: true
    }],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },

    imageUrl: {
        type: String,
        trim: true 
    },

});    

module.exports = mongoose.model('Restaurant', restoSchema);