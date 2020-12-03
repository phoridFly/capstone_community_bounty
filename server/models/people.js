const mongoose = require('mongoose');

// person schema
const PeopleSchema = mongoose.Schema({
    name: String,
    nickname: String,
    picture: String,
    person_sub: String,
    seller_rating: { type: Number, min: 0, max: 5, default: 0},
    buyer_rating: { type: Number, min: 0, max: 5, default: 0},
    solicitations: [String],
    address_id: [String],
    contact_id: String,
    profile_id: String,
    transactions_id: [String],

});

// the model
const People = mongoose.model('People', PeopleSchema);

module.exports = People;
