const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Coffeebar = new Schema({
    name: String,
    description: String,
    latitude: String,
    longitude: String,
    itemswithprice: [String],
    opentimings: String,
    markfavourite: String,
    contactnumber: Number,
    emailid: String,
    rating: Number,
    review:{
        type: [String]
    }

});

const User= mongoose.model('Coffeebar',Coffeebar);
module.exports = User;