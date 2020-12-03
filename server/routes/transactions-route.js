const router = require('express').Router();
const { request } = require('express');
const { get } = require('mongoose');
const Transactions = require('../models/transactions.js');
const Solicitations = require('../models/solicitations.js');
const People = require('../models/people');


/* --------  BEGIN MODEL FUNCTIONS HERE ------------- */

/** 
 * Function post_transaction creates new Transactions document in MongoDB
 * @param  {string}     newTransaction  Data associated with a transaction.
 * @returns {object}                    New transaction object.
*/
function post_transaction(newTransaction){
    return newTransaction.save();
}

/** 
 * Function get_single_person returns a single person as a json object
 * @params  {string}    people_id  Id of person we want to find.
 * @returns {object}               Object that contains a person.
*/
function get_single_person(sub){
    return People.find({person_sub: sub});
}

/** 
 * Function get_all_transactions_without_pagination returns array of all transactions in the database
 * @returns {object}               Object that contains array of transactions.
*/
function get_all_transactions_without_pagination(){
    return Transactions.find({});
}

/** 
 * Function get_single_transaction returns a single transaction as a json object
 * @params  {string}    transaction_id  Id of transaction we want to find.
 * @returns {object}                    Object that contains a transaction.
*/
function get_single_transaction(transaction_id){
    return Transactions.find({_id: transaction_id});
}

/**
 *  Function get_buyer_transactions returns array of all transactions
 *      where buyer_sub matches passed string
 *  @params {string}    buyer_sub   Parameter we want to match on
 *  @returns {object}               Object that contains array of transactions.
 */
function get_buyer_transactions(buyerSub){
    return Transactions.find({buyer_sub : buyerSub});
}

/**
 *  Function get_seller_transactions returns array of all transactions
 *      where seller_sub matches passed string
 *  @params {string}    seller_sub   Parameter we want to match on
 *  @returns {object}               Object that contains array of transactions.
 */
function get_seller_transactions(sellerSub){
    return Transactions.find({seller_sub : sellerSub});
}


/**
 *  Function get_matching_solicitations returns array of all solicitations matching transactions id array
 *      where seller_sub matches passed string
 *  @params {string}    buyerTransacsIDArray   Array of transactions ids to match to solicits
 *  @returns {object}               Object that contains array of matching solicits.
 */
function get_matching_solicitations(buyerSolicitationsIDArray){
    return Solicitations.find( { _id: { $in: buyerSolicitationsIDArray}} );
}


/* --------  BEGIN CONTROLLER FUNCTIONS HERE ------------- */

// get all the transactions in the DB
router.get('/', (request, response, next) => {

    // call the model function
    get_all_transactions_without_pagination()
    .then((allTransactions) => {
        response.status(200).send(allTransactions);
    });
});


// get a transaction by id in the DB
router.get('/:transaction_id', (request, response, next) => {

    // call the model function with id of transaction to find
    get_single_transaction(request.params.transaction_id)
    .then((singleTransaction) => {
        response.status(200).send(singleTransaction);
    });
});

// get all transactions in DB with matching buyer_sub
router.get('/buyer/:buyer_sub', (request, response, next) => {
    // call the model function with buyer_sub to match on transactions
    get_buyer_transactions(request.params.buyer_sub)
    .then((buyerTransactions) => {

        var superReturnArray = [];
        var superReturnObject = {};

        if (buyerTransactions[0]) {
            // pull out all the solicition ids from transactions into an array
            var buyerSolicitationsIDArray = [];
            buyerTransactions.forEach(element => {
                buyerSolicitationsIDArray.push(element.solicitation_id);
            });
            // get the solicitations from the id array
            get_matching_solicitations(buyerSolicitationsIDArray)
            .then((buyerSolicitations) => {

                
                // for each solicitation, check all the transactions
                // if transaction is part of that solicitation then combine the data
                buyerSolicitations.forEach(sel => {
                    buyerTransactions.forEach(tel => {
                        if (tel.solicitation_id == sel._id) {
                            superReturnObject = {};
                            superReturnObject.food_pic = sel.food_pic;
                            superReturnObject.still_available = tel.still_available;
                            superReturnObject.still_active = tel.still_active;
                            superReturnObject.description = sel.description;
                            superReturnObject.cost_unit = sel.cost_unit;
                            superReturnObject.product_cost = sel.product_cost;
                            superReturnObject.product_name = sel.product_name;
                            superReturnObject._id = tel._id;
                            superReturnObject.buyer_review_verbose = tel.buyer_review_verbose;
                            superReturnObject.buyer_review_numeric = tel.buyer_review_numeric;
                            superReturnObject.seller_review_verbose = tel.seller_review_verbose;
                            superReturnObject.seller_review_numeric = tel.seller_review_numeric;
                            superReturnObject.completed = tel.completed;
                            superReturnObject.seller_sub = tel.seller_sub;
                            superReturnObject.seller_nickname = tel.seller_nickname;
                            superReturnObject.buyer_sub = tel.buyer_sub;
                            superReturnObject.buyer_nickname = tel.buyer_nickname;
                            superReturnObject.solicitation_id = sel._id;
                            superReturnObject.message_log = tel.message_log;
                            superReturnObject.secretMessage = "It's a me a Mario buyer transactions.";
                            
                            superReturnArray.push(superReturnObject);

                        };
                    });
                });

                response.status(200).send(superReturnArray); 
                
            })
            .catch((err) => next(err));
        } else {
            superReturnObject.error = "You have no buyer transactions.";
            superReturnObject.completed = true;
            superReturnArray.push(superReturnObject);
            response.status(404).send(superReturnArray);
        }
        
    })
    .catch((error) => next(error));
});

// get all transactions in DB with matching seller_sub
router.get('/seller/:seller_sub', (request, response, next) => {
        // call the model function with seller_sub to match on transactions
        get_seller_transactions(request.params.seller_sub)
        .then((sellerTransactions) => {
               
            var superReturnArray = [];
            var superReturnObject = {};
    
            if (sellerTransactions[0]) {
                // pull out all the solicition ids from transactions into an array
                var sellerSolicitationsIDArray = [];
                sellerTransactions.forEach(element => {
                    sellerSolicitationsIDArray.push(element.solicitation_id);
                });
                // get the solicitations from the id array
                get_matching_solicitations(sellerSolicitationsIDArray)
                .then((sellerSolicitations) => {
 
                    // for each solicitation, check all the transactions
                    // if transaction is part of that solicitation then combine the data
                    sellerSolicitations.forEach(sel => {
                        sellerTransactions.forEach(tel => {
                            if (tel.solicitation_id == sel._id) {
                                superReturnObject = {};
                                superReturnObject.food_pic = sel.food_pic;
                                superReturnObject.still_available = tel.still_available;
                                superReturnObject.still_active = tel.still_active;
                                superReturnObject.description = sel.description;
                                superReturnObject.cost_unit = sel.cost_unit;
                                superReturnObject.product_cost = sel.product_cost;
                                superReturnObject.product_name = sel.product_name;
                                superReturnObject._id = tel._id;
                                superReturnObject.buyer_review_verbose = tel.buyer_review_verbose;
                                superReturnObject.buyer_review_numeric = tel.buyer_review_numeric;
                                superReturnObject.seller_review_verbose = tel.seller_review_verbose;
                                superReturnObject.seller_review_numeric = tel.seller_review_numeric;
                                superReturnObject.completed = tel.completed;
                                superReturnObject.seller_sub = tel.seller_sub;
                                superReturnObject.seller_nickname = tel.seller_nickname;
                                superReturnObject.buyer_sub = tel.buyer_sub;
                                superReturnObject.buyer_nickname = tel.buyer_nickname;
                                superReturnObject.solicitation_id = sel._id;
                                superReturnObject.message_log = tel.message_log;
                                superReturnObject.secretMessage = "It's a me a Mario seller transactions.";
                                
                                superReturnArray.push(superReturnObject);
    
                            };
                        });
                    });
    
                    response.status(200).send(superReturnArray); 
                    
                })
                .catch((err) => next(err));
            } else {
                superReturnObject.error = "You have no seller transactions.";
                superReturnObject.completed = true;
                superReturnArray.push(superReturnObject);
                response.status(404).send(superReturnArray);
            }
            
        })
        .catch((error) => next(error));
});

// create a new transaction in the DB
router.post('/', (request, response, next) => {
    get_single_person(request.body.buyer_sub)
    .then((res)=>{
     var message = {"person_sub": request.body.buyer_sub, "message": request.body.mess};
    // create a transaction object and set properties
    var newTransaction = new Transactions();
    newTransaction.completed = false;
    newTransaction.buyer_sub = request.body.buyer_sub;
    newTransaction.buyer_nickname = res[0].nickname;
    newTransaction.seller_sub = request.body.seller_sub;
    newTransaction.seller_nickname = request.body.seller_nickname;
    newTransaction.solicitation_id = request.body.solicitation_id;
    // buyer initiates transaction
    newTransaction.message_log = message;
    // call the model function
    post_transaction(newTransaction)
    .then((transactionData) => {

        response.status(201).send(transactionData);
        //console.log("yay", transactionData);
    })
    .catch((err) => next(err)); 

})
.catch((err) => next(err)); 
});

// update properties of a transactions document in DB
router.patch('/:transactions_id', (request, response, next) => {
    Transactions.findOne({_id:request.params.transactions_id}, function(err, documentData){
        if(err) {
            next(err);
        }
    //get_single_transaction(request.params.transactions_id)
    //.then( (documentData) => {
        console.log(documentData);

        if( documentData ) {
            var updateObject = request.body;
            var id = request.params.transactions_id;
            var ObjectID = require('mongodb').ObjectID;
            Transactions.updateOne(
                {_id : ObjectID(id)},
                {$set : updateObject},
                {new : true} )
                .then( (documentData) => {
                    console.log(documentData);
                    response.location('https' + "://" + request.get('host') + request.baseUrl + '/' + request.params.transactions_id);
                    response.status(204).set("Content-Type", "application/json").end();
                });
        } else {
            response.status(404).send("Error: Transaction Not Found");
        }
    })
    .catch((err) => next(err));
});

// add a message to a transaction by id
router.put('/:transactions_id/messages', (request, response, next) => {
    
    var tid = request.params.transactions_id;
    var psub = request.body.person_sub;
    var newMessage = request.body.mess;
    var currentDate = new Date();
    var ObjectID = require('mongodb').ObjectID;
    Transactions.findByIdAndUpdate(
        tid,
        { $push: {message_log: {
                person_sub: psub,
                message: newMessage,
                time_stamp: currentDate
                }
            }
        }
    )
    .then((msgData) => {
        console.log(msgData);
        if(msgData){
            response.status(201).send(msgData);
        }
        else{
            response.status(404).send("Error: Transaction Not Found");
        }
    })
    .catch((err) => next(err));  
});

// delete a message from a transaction
router.delete('/:transactions_id/messages/:messages_id', (request, response, next) => {
    var tid = request.params.transactions_id;
    var mid = request.params.messages_id;
    Transactions.findByIdAndUpdate(
        //{ _id: ObjectID(tid)},
        tid,
        { $pull: {message_log: {
                _id: mid
                }
            }
        }
    )
    .then((msgData) => {
        console.log(msgData);
        if(msgData){
            response.status(204).end();
        }
        else{
            response.status(404).send("Error: Transaction Not Found");
        }
    })
    .catch((err) => next(err));  
});


// delete a transaction in the DB
router.delete('/:transactions_id', (request, response, next) => {

    Transactions.deleteOne({ "_id" : request.params.transactions_id }, err  => {
        if(err) {
            next(err);
        }
        else {
            response.status(204).send("Transaction deleted.");
        }
    });
});

module.exports = router;