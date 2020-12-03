const router = require('express').Router();
const { get } = require('mongoose');
const Solicitations = require('../models/solicitations');
const Address = require('../models/address.js');
const { all } = require('./transactions-route');
const uploadImage = require('../../helpers/helpers.js');

/* -------- BEGIN MODEL FUNCTIONS HERE -------- */

/** 
 * Function get_single_address returns a single address as a json object
 * @params  {array}                array of address ids we want to look up
 * @returns {object}               Object that contains an address.
*/
function get_all_addresses(addressIDArray){
    //return Address.find({_id: {$all: addressIDArray}});
    return Address.find( { _id : { $in : addressIDArray } } );
}


/**
  * Function get_address_solicitations returns array of solicitations
  *     in the database associated with a single address_id and still_active = 1 for true
  * @params {string}    address_id  Id of address we want to find solicitations from.
  * @return {object}                Object that contains array of solicitations.
  */
 function get_address_array(addressIDArray){
    return Address.find({
        $and : [
            { _id : { $in : addressIDArray } },
            { still_active : true}
        ]
    });
}
/** 
 * Function get_address_radius returns an array of addresses 
 * @params  {location[number], number} buyers longitude, latitude, radius  
 * @returns  [object]               Object(s) that contains an address, or addresses.
*/
function get_filter_address(loc, search){ 
    var METERS_PER_MILE = 1609.34; 
    var radius = search * METERS_PER_MILE;
 return Address.find({ location: { $near: { $geometry: { type: "Point", coordinates: loc }, $minDistance: 0, $maxDistance: radius } } });
}

/**
 * Function post_solicitation creates new Solicitation document in MongoDB
 * @param {string}      newSolicitation Data associated with a solicitation.
 * @returns {object}                    New solicitation object
 */
function post_solicitation(newSolicitation){
    return newSolicitation.save();
}


/**
 * Function get_all_solicitations_without_pagination
 *      returns array of all solicitations in the database
 * @returns {object}            Object that contains array of solicitations.
 */
function get_all_solicitation_addresses(){
    return Solicitations.find({});
    // activeSolicitations.forEach(element => {
    //     console.log("im here");
    //     console.log(element.address_id);
    // });
    // return activeSolicitations;
}


/**
 * Function get_all_solicitations_without_pagination
 *      returns array of all solicitations in the database
 * @returns {object}            Object that contains array of solicitations.
 */
function get_all_solicitations_without_pagination(){
    return Solicitations.find({});
}

/**
 * Function get_single_solicitation returns a single solicitation
 *      as a JSON object
 * @params {string}     solicitation_id Id of solicitation we want to find.
 * @returns {object}                    Object that contains a solicitation.
 */
function get_single_solicitation(solicitations_id){
    return Solicitations.find({_id: solicitations_id});
}

/**
  * Function get_address_solicitations returns array of solicitations
  *     in the database associated with a single address_id and still_active = 1 for true
  * @params {string}    address_id  Id of address we want to find solicitations from.
  * @return {object}                Object that contains array of solicitations.
  */
 function get_address_solicitations(addressIDArray){
    return Solicitations.find(  { $and: [ { still_active: { $eq: true } }, { address_id: { $in: addressIDArray } } ] } )
        // $and : [
        //     { _id : { $in : addressIDArray } },
          //  { still_active : true
       // ]
   // });
}

/**
 * Function get_seller_solicitations returns array of solicitations
 *      in the database associated with a single seller_sub 
 * @params {string}     seller_sub   Sub of seller we want to find solicitations from
 * @returns {object}                Object that contains array of solicitaitons.
 */

function get_seller_solicitations(this_seller_sub){
    return Solicitations.find({seller_sub: this_seller_sub});
}

// Not Implemented
 /**
 * Function get_product_solicitations returns array of solicitations
 *      in the database associated with a single product_id
 * @params {string}     product_id  Id of product we want to find solicitations for.
 * @return {object}                 Object that contains array of solicitations.
 */
/*
function get_product_solicitations(product_id){
    return Solicitations.find(product_id: this_product_id});
}
*/


/* -------- END MODEL FUNCTIONS --------*/

/* -------- BEGIN CONTROLLER FUNCTIONS HERE --------*/






// Route 1
// get all the solicitations in the DB
router.get('/', (request, response, next) => {
    // call the model function
    get_all_solicitations_without_pagination()
    .then((allSolicitations) => {
        response.status(200).send(allSolicitations);
    })
    .catch((err) => next(err));
});




// Route 2
// still_available, compost_heap ?
//the SUPER ROUTE
router.get('/radius/:centerLong/:centerLat/:rad', (request, response, next) => {
    //console.log(request.params.centerLong);
    //console.log(request.params.centerLat);
    var location = [request.params.centerLong, request.params.centerLat];
    var radius = request.params.rad;
    get_filter_address(location, radius)
    .then((addresses) => {
        if(addresses[0]){
            var addressIDArray = [];
            addresses.forEach(element => {
            addressIDArray.push(element._id);
            });
           get_address_solicitations(addressIDArray)
           .then((posts) => {

                var superReturnArray = [];
                var superReturnObject = {};
                posts.forEach(pel => {
                    addresses.forEach(ael => {
                        if (pel.address_id == ael._id) {
                            superReturnObject = {};
                            superReturnObject._id = pel._id
                            superReturnObject.food_pic = pel.food_pic;
                            superReturnObject.product_name = pel.product_name;
                            superReturnObject.product_cost = pel.product_cost;
                            superReturnObject.cost_unit = pel.cost_unit;
                            superReturnObject.description = pel.description;
                            superReturnObject.seller_sub = pel.seller_sub;
                            superReturnObject.seller_nickname = pel.seller_nickname;
                            superReturnObject.cost_unit = pel.cost_unit;
                            superReturnObject.still_available = pel.still_available;
                            superReturnObject.item_id = pel.item_id;
                            superReturnObject.coordinates = ael.location.coordinates;
                            superReturnArray.push(superReturnObject);
                        }
                    });
                });

                 //console.log(superReturnArray);
                // console.log(posts);
                
                response.status(200).send(superReturnArray); 

               //may want to merge with locations, we would have to push the address id in 
               //and to a find for them 
            })
            .catch((err) => next(err));
        }else{
            response.status(404).send("Addresses Not Found");
        }    
    })
    .catch((err) => next(err));
 
    });

// Route 3
// get all solicitations associated with a seller_sub in the DB
router.get('/seller/:seller_sub', (request, response, next) => {
    // call the model function with seller_sub to find associated solicitations
    get_seller_solicitations(request.params.seller_sub)
    .then((sellerSolicitations) => {
        if (sellerSolicitations) {
            response.status(200).send(sellerSolicitations);
        } else {
            response.status(404).send("Solicitations Not Found");
        }

    });
});

// get a solicitation by id in the DB
router.get('/:solicitations_id', (request, response, next) => {
    // call the model function with id of solicitation to find
    get_single_solicitation(request.params.solicitations_id)
    .then((singleSolicitation) => {
        if( singleSolicitation ) {
            response.status(200).send(singleSolicitation);
        } else {
            response.status(404).send("Solicitation Not Found");
        }
    })
    .catch((err) => next(err));
});



// Not Implemented
/*
// get all solicitations associated with a product_id in the DB
router.get('/product/:solicitations_product_id', (request, response, next) => {
    // call the model function with product_id to find associated solicitations
    get_product_solicitations(request.params.solicitations_product_id)
    .then((productSolicitations) => {
        response.status(200).send(productSolicitations);
    });
}); 
*/

// get all solicitations associated with an address_id that are still_active (= 1) in the DB
router.get('/address/:address_id', (request, response, next) => {
    // call the model function with address_id to find associated solicitations that are still_active (= 1)
    get_address_solicitations(request.params.address_id)
    .then((addressSolicitations) => {
        if( addressSolicitations ) {
            response.status(200).send(addressSolicitations);
        } else {
            response.status(404).send("Solicitations Not Found");
        }
    });
});



router.get('/coordinates/:coordinates', (request, response, next) => {
    conolse.log(request.params.coorindates);
    // call the model function
    get_all_solicitation_addresses()
    .then((allSolicitations) => {
        response.status(200).send(allSolicitations);
    })
    .catch((err) => next(err));

});


// create a new solicitation in the DB
router.post('/', (request, response, next) => {

    var newSolicitation = new Solicitations();

    newSolicitation.product_name = request.body.product_name;
    newSolicitation.product_cost = request.body.product_cost;
    newSolicitation.cost_unit = request.body.cost_unit;
    newSolicitation.description = request.body.description;
    newSolicitation.start_date = request.body.start_date;
    newSolicitation.end_date = request.body.end_date;
    newSolicitation.still_active = request.body.still_active;
    newSolicitation.still_available = request.body.still_available;
    newSolicitation.compost_heap = request.body.compost_heap;
    newSolicitation.food_pic = request.body.food_pic;
    newSolicitation.seller_sub = request.body.seller_sub;
    newSolicitation.item_id = request.body.item_id;
    newSolicitation.address_id = request.body.address_id;

    // call the model function
    post_solicitation(newSolicitation)
    .then((solicitationData) => {
        response.status(201).send(solicitationData);
    })
    .catch((err) => next(err));  
  
});

// delete a solicitation by id in the DB
router.delete('/:solicitations_id', (request, response, next) => {
    Solicitations.deleteOne({ "_id" : request.params.solicitations_id }, function(err, result) {
        if(err) {
            next(err);
        }
        if (result.n) {
            response.status(204).send("Solicitation Deleted");
        } else {
            response.status(404).send("Solicitation Not Found");
        }
    });
});

// update a solicitation image in the DB
router.post('/images/:solicitations_id', async (request, response, next) => {

try {
    
    // the file object
    const myFile = request.file;
    // get the file name and append the solicitation id to it
    var oldName = myFile.originalname;
    var newName = request.params.solicitations_id + '_' + oldName;
    myFile.originalname = newName;
    const imageUrl = await uploadImage(myFile);
    //console.log("hear ye  " + myFile.originalname);

    // just like the PATCH, but we'll get the solicit then only update the food_pic name
    get_single_solicitation(request.params.solicitations_id)
    .then( (solicityData) => {
        if( solicityData ) {

        var updateObject = request.body;
        updateObject.food_pic = newName;
        var id = request.params.solicitations_id;
        var ObjectID = require('mongodb').ObjectID;
        Solicitations.updateOne(
            {_id : ObjectID(id)},
            {$set : updateObject},
            {new : true} )
            .then( (solicitationData) => {
                response.status(204).send(solicitationData);
            });

        } else {
            response.status(404).send("Solicitation Not Found");
        }
    })
    .catch((err) => next(err));

} catch (error) {
    next(error)
}
 
});

// update a solicitation by id in the DB
router.patch('/:solicitations_id', (request, response, next) => {
    get_single_solicitation(request.params.solicitations_id)
    .then( (solicityData) => {
        if( solicityData ) {
            var updateObject = request.body;
            var id = request.params.solicitations_id;
            var ObjectID = require('mongodb').ObjectID;
            Solicitations.updateOne(
                {_id : ObjectID(id)},
                {$set : updateObject},
                {new : true} )
                .then( (solicitationData) => {
                    response.status(204).send(solicitationData);
                });
        } else {
            response.status(404).send("Solicitation Not Found");
        }
    })
    .catch((err) => next(err));
});

module.exports = router;