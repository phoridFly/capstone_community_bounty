const mongoose = require('mongoose');

// items schema
const ItemSchema = mongoose.Schema({
    product_name: String,
    product_type: {
        type: String,
        enum:['produce','animal product'],
        default:['produce']
    }, 
});

// the model
const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;