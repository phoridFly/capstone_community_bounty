const router = require('express').Router();
const { get } = require('mongoose');
const Address = require('../models/address');
const axios = require('axios');
/** 
 * Function post_address creates new Address document in MongoDB
 * @param  {string}      newAddress  Data associated with an address.
 * @returns {object}                 New address object.
*/
function post_address(newAddress){
    return newAddress.save();
}

/** 
 * Function get_single_address returns a single address as a json object
 * @params  {string}    address_id  Id of address we want to find.
 * @returns {object}               Object that contains an address.
*/
function get_single_address(address_id){
    return Address.findOne({_id: address_id});
}

/** 
 * Function get_address_geocode returns the long/lat of the google place
 * @params  {string}    plce_id  Id of address we want to geocode
 * @returns [array]               long/lat from google
*/
function get_address_geocode(place){

    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${place}&key=${process.env.APIKEY}`);
   
   
    //take place_id and get the geocode and send it back 

}
/** 
 * Function get_all_address_without_pagination returns array of all addresses in the database
 * @returns {object}               Object that contains array of addresses.
*/
function get_all_address_without_pagination(){
    return Address.find({});
}

/** 
 * Function get_single_address returns all addresses to a person as an array json object
 * @params  {string}    person_id  person's addresses we want to find we want to find.
 * @returns  [object]               Object(s) that contains an address.
*/
function get_person_addresses(person_s){
    return Address.find({person_sub: person_s});
}

/** 
 * Function get_address_radius returns an array of addresses 
 * @params  {location[number], number} buyers longitude, latitude, radius  
 * @returns  [object]               Object(s) that contains an address, or addresses.
*/
function get_filter_addresses(loc, search){ 
       var METERS_PER_MILE = 1609.34; 
       var radius = search * METERS_PER_MILE;
    return Address.find({ location: { $near: { $geometry: { type: "Point", coordinates: loc }, $minDistance: 0, $maxDistance: radius } } });
}
/* --------  BEGIN CONTROLLER FUNCTIONS HERE ------------- */


// get all the items in the DB
router.get('/', (request, response, next) => {
    // call the model function
    get_all_address_without_pagination()
    .then((allAddress) => {
        response.status(200).send(allAddress);
    })
    .catch((err) => next(err));
});

//geojson
router.put('/radius', (request, response, next) => {
    //var radius = 5;
    //var location = [-122.62, 48.413];
    //console.log(request.body.location);
    get_filter_addresses(request.body.location, request.body.radius)
    .then((addresses) => {
        if(addresses[0]){
            console.log(addresses);//yes I found them
            response.status(200).send(addresses);
        }else{
            response.status(404).send("Addresses Not Found");
        }    
    })
    //.catch((err) => next(err)); 
});

// get an address by id in the DB
router.get('/:address_id', (request, response, next) => {
    // call the model function with id of person to find
    get_single_address(request.params.address_id)
    .then((singleAddress) => {
        if(singleAddress){
            response.status(200).send(singleAddress);
        }else{
            response.status(404).send("Address Not Found");
        }    
    })
    .catch((err) => next(err)); 
});
//get addresses based on person_id
router.get('/person/:person_sub', (request, response, next) => {
    // call the model function with id of person to find
    console.log(request.params.person_sub);
    get_person_addresses(request.params.person_sub)
    .then((personAddress) => {
        if(personAddress[0]){
            response.status(200).send(personAddress);
        }else{
            response.status(404).send("Person Addresses Not Found");
        }
    })
    .catch((err) => next(err)); 
});





// create a new address in the DB
router.post('/', (request, response, next) => { 
    get_address_geocode(request.body.place_id)
    .then((res) => {
        var coords = [];
        coords[0] = res.data.results[0].geometry.location.lng;
        coords[1] = res.data.results[0].geometry.location.lat;
        var address_string = res.data.results[0].formatted_address;
        var obj = {"address_string": address_string, "coords": coords};
       // console.log (obj);
    // create a address object and set properties
        var newAddress = new Address();
        newAddress.person_sub = request.body.person_sub;
        newAddress.place_id = request.body.place_id
        newAddress.address_string = obj.address_string;
        newAddress.address_name = request.body.address_name;
        newAddress.location.coordinates = obj.coords;  
        get_person_addresses(request.body.person_sub)
        .then((list) => {
            //if first address set as default
            console.log(list);
            if(list){

            }else{
                newAddress.location.default_address = 1;
            }
    // call the model function
    post_address(newAddress)
    .then((addressData) => {
        //handle 409
        response.status(201).send(addressData);
    })
    .catch((err) => next(err)); 
})
.catch((err) => next(err)); 
    })
    .catch((err) => next(err)); 
});


// delete an address in the DB
router.delete('/:address_id', (request, response, next) => {
     Address.findOneAndDelete({ "_id" : request.params.address_id }, function(err,result) {
        if(err) {
            next(err);
        }
       // console.log(result);
        if(result){
            response.status(204).send("Address Deleted");
        }
        else {
            response.status(404).send("Address Not Found");
        }
    });
});

//change default address
router.patch('/default/:person_sub/:address_name', (request, response, next) => {
    Address.updateMany({person_sub: request.params.person_sub}, {$set:{default_address: 0}})
    .then((result)=>{
        Address.updateOne({address_name:request.params.address_name}, {default_address: 1})
        .then((res)=>{
            response.status(204).send(res);

        })
        .catch((err)=> next(err));
       })
       .catch((err)=> next(err));
    });
   

router.patch('/:address_id', (request, response, next) => {
    get_single_address(request.params.address_id)
    .then((addyData)=>{
       if(addyData){
        var updateObject = request.body; 
        var id = request.params.address_id;
        var ObjectID = require('mongodb').ObjectID;
        Address.updateOne({_id  : ObjectID(id)}, {$set: updateObject},{new:true})
        .then((addressData) => {
            response.status(204).send(addressData);
        });
    }
    else{
        response.status(404).send("Address Not Found");
    }
    })
    .catch((err)=> next(err));

});


module.exports = router;
  // add the code below
