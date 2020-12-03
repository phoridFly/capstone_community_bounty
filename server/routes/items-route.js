const router = require('express').Router();
const { get } = require('mongoose');
const Item = require('../models/items');


/** 
 * Function post_item creates new Item document in MongoDB
 * @param  {string}      newItem  Data associated with an item.
 * @returns {object}                 New item object.
*/
function post_item(newItem){
    return newItem.save();
}

/** 
 * Function get_single_item returns a single item as a json object
 * @params  {string}    item_id of item wanted.
 * @returns {object}               Object that contains an item.
*/
function get_single_item(item_id){
    return Item.find({_id: item_id});
}

/** 
 * Function get_all_items_without_pagination returns array of all items in the database
 * @returns {object}               Object that contains array of items.
*/
function get_all_items_without_pagination(){
    return Item.find({});
}

/** 
 * Function get_single_item returns a single item as a json object
 * @params  {string}    product_type  type of item we want
 * @returns  [object]               Object(s) that contain items matching type .
*/
function get_item_type(product_type){
    return Item.find({product_type: product_type});
}


 
/* --------  BEGIN CONTROLLER FUNCTIONS HERE ------------- */


// get all the items in the DB
router.get('/', (request, response, next) => {
    // call the model function
    get_all_items_without_pagination()
    .then((allItems) => {
        response.status(200).send(allItems);
    })
    .catch((err)=>next(err)); 
});

// get an item by id in the DB
router.get('/:item_id', (request, response, next) => {
    // call the model function with id of person to find
    get_single_item(request.params.item_id)
    .then((singleItem) => {
        if(singleItem[0]){
            response.status(200).send(singleItem);
        }else{
            response.status(404).send("Item Not Found");
        }    
    })
    .catch((err)=>next(err)); 
});

//get items based on type
router.get('/type/:product_type', (request, response, next) => {
    // call the model function with id of person to find
    get_item_type(request.params.product_type)
    .then((productType) => {
        if(productType[0]){
            response.status(200).send(productType);
        }else{
            response.status(404).send("Product Type Not Found");
        } 
    })
    .catch((err)=>next(err)); 
});



// create a new item in DB
router.post('/notPublic', (request, response, next) => { 

    var newItem = new Item();
    //update
    newItem.product_name = request.body.product_name;
    newItem.product_type = request.body.product_type;

    // call the model function
    post_item(newItem)
    .then((itemData) => {
        response.status(201).send(itemData);
    })
    .catch((err)=>next(err)); 
});

// delete an item in the DB
router.delete('/notPublic/:item_id', (request, response, next) => {
    Item.deleteOne({ "_id" : request.params.item_id }, err  => {
        if(err) {
            next(err);
        }
        else {
            response.status(204).send("item deleted.");
        }
    });
});

module.exports = router;