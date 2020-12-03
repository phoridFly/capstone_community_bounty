const mongoose = require('mongoose');
const People = require('../models/people');

// solicitations schema
const SolicitationsSchema = mongoose.Schema({

    product_name: String,
    product_cost: Number,
    cost_unit: String,
    description: String,
    still_active: Boolean,
    still_available: Boolean,
    compost_heap: Boolean,
    food_pic: String,
    seller_sub: String,
    seller_nickname: String,
    item_id: String,
    address_id: String,

});

/*-------- Post Hooks --------*/
// delete solicitation_id from people before we delete solicitation
SolicitationsSchema.post('findOneAndDelete', function(doc){
    People.updateOne(
        {person_sub : doc.person_sub},
        {$pull : {solicitation_id : doc._id}}).exec();
});

// save solicitation_id into people after we add it
SolicitationsSchema.post('save', function(){
    People.updateOne(
        {person_sub : this.seller_sub},
        {$push : {solicitations : this._id}},
        {multi : true}).exec();
});

// the model
const Solicitations = mongoose.model('Solicitations', SolicitationsSchema);

module.exports = Solicitations;
