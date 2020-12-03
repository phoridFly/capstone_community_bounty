const mongoose = require('mongoose');
const People = require('../models/people');

// solicitations schema
const TransactionsSchema = mongoose.Schema({

    buyer_review_verbose: String,
    buyer_review_numeric: { type: Number, min: 0, max: 5},
    seller_review_verbose: String,
    seller_review_numeric: { type: Number, min: 0, max: 5},
    completed: Boolean,
    buyer_sub: String,
    buyer_nickname: String,
    seller_sub: String,
    seller_nickname: String,
    solicitation_id: String,
    message_log: [{
                    person_sub: String,
                    time_stamp: {type:Date, default: Date.now},
                    message: String,
                 }]

});

 /*------------post hooks ----------------------------*/

 //delete transactions_id from people when we delete a transaction
//  TransactionsSchema.post('findOneAndDelete', function(doc){  
//     People.updateOne(
//         {_id: doc.person_id},
//         {$pull: {transactions_id: doc._id}}).exec();
//         //console.log(doc);
// });

//save transaction_id into people after we create a new transaction
TransactionsSchema.post('save', function(){
    People.updateOne(
        {person_sub: this.buyer_sub},
        {$push: {transactions_id: this._id}},
        {multi:true}).exec();
        //console.log(this);
});

// the model
const Transactions = mongoose.model('Transactions', TransactionsSchema);

module.exports = Transactions;