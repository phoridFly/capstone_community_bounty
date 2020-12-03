const router = require('express').Router();
const { get } = require('mongoose');
const Profile = require('../models/profile');
const Item = require('../models/items');
const Person = require('../models/people');

/** 
 * Function post_Profiles creates new Profile document in MongoDB
 * @param  {string}      newProfile Data associated with profile.
 * @returns {object}                 New Profile object.
*/
function post_profile(newProfile){
    return newProfile.save();
}

/** 
 * Function get_single_profile returns a single Profile as a json object
 * @params  {string}    profile_id  Id of profile we want to find.
 * @returns {object}               Object that contains a Profile.
*/
function get_single_profile(sub){
    return Profile.findOne({person_sub: sub});
}

/** 
 * Function get_all_profiles_without_pagination returns array of all profiles in the database
 * @returns {object}               Object that contains array of profiles.
*/
function get_all_profiles_without_pagination(){
    return Profile.find({});
}

/** 
 * Function get_person_profile returns Profile as a json object for person
 * @params  {string}    person_id  person's prefernce we want to find we want to find.
 * @returns  [object]               Object(s) that contains a Profile.
*/
function get_person_profile(person_sub){
    return Profile.find({person_sub: person_sub});
}

/** 
 * Function get_item_object returns item as a json object for person
 * @params  {string}   product_name product we want to findto find.
 * @returns  [object]               Object(s) that contains an Item.
*/
function get_item_object(name){
    return Item.find({product_name: name});
}
//update for watchlist
/** 
 * Function get_multiple_items returns Profile as a json object for person
 * @params  [array]    item_id array array of items to lookup
 * @returns  [object]               Object(s) that contain item(s)
*/
function get_multiple_items(watchlist) {
    return Item.find({
        _id : { $in : watchlist } }
    );
}


/* --------  BEGIN CONTROLLER FUNCTIONS HERE ------------- */



router.delete('/oops/:profile_sub', (request, response, next) => {
    Person.deleteMany({ "person_sub" : request.params.profile_sub }, function(err,result) {
        if(err) {
            next(err);
        }
      //  console.log(result);
        if(result.n) {
            response.status(204).send("Profile deleted.");
        }
        else{
            response.status(404).send("Profile Not Foud");
        }
    });
});
// get all the profiles in the DB
router.get('/', (request, response, next) => {
    // call the model function
    get_all_profiles_without_pagination()
    .then((allProfile) => {
        response.status(200).send(allProfile);
    })
    .catch((err) => next(err));
});

// get a profile by id in the DB
router.get('/:profile_sub', (request, response, next) => {
    // call the model function with id of person to find
    get_single_profile(request.params.profile_sub)
    .then((singleProfile) => {
        //console.log(singleProfile);
        if(singleProfile.person_sub){
            response.status(200).send("found");
        }else{
            response.status(404).send("Profile Not Found");
        }    
   
    })
    .catch((err) => next(err)); 
});

//for the whole watchlist
// figure out how to return the whole watchlist
router.get('/watchlist/:person_sub', (request, response, next) => {
    // call the model function with id of person to find
    get_person_profile(request.params.person_sub)
    .then ((singleProfile)=>{
       var watchMe = singleProfile[0].watchlist;
    console.log("watching", watchMe);
        get_multiple_items(watchMe)
        .then((items) => {
        //console.log(singleProfile)
        if(items){
            response.status(200).send(items);
        }else{
            response.status(404).send("Items Not Found");
        }    
   
    })
    .catch((err) => next(err)); 
}) 
.catch((err) => next(err));
});

//get profile based on person_id
router.get('/person/:person_sub', (request, response, next) => {
    // call the model function with id of person to find
    get_person_profile(request.params.person_sub)
    .then((personProfile) => {
        //console.log(personProfile);
        if(personProfile[0]){
            response.status(200).send(personProfile);
        }else{
            response.status(404).send("Person Profile not found");
        }    
    })
    .catch((err) => next(err)); 
});


// create a new profile in the DB, set upon account creation with defaults. 
router.post('/', (request, response, next) => { 
    // create a profile object and set properties
    var newPref = new Profile();
    //update
    newPref.person_sub = request.body.person_sub;
    //newPref.contact_method = request.body.contact_method;
    //newPref.search_radius = request.body.search_radius;
    //newPref.loc_ambiguity = request.body.loc_ambiguity;
    //newPref.session_location = request.body.session_location;  
   // newPref.address_id = request.body.address_id;
    // call the model function
    post_profile(newPref)
    .then((prefData) => {
        //console.log(prefData);
        //how to handle 409?
        response.status(201).send(prefData);
    })
    .catch((err) => next(err)); 
});

// delete a Profile in the DB
router.delete('/:profile_id', (request, response, next) => {
    Profile.deleteOne({ "_id" : request.params.profile_id }, function(err,result) {
        if(err) {
            next(err);
        }
      //  console.log(result);
        if(result.n) {
            response.status(204).send("Profile deleted.");
        }
        else{
            response.status(404).send("Profile Not Foud");
        }
    });
});

//update profile
router.patch('/:person_sub', (request, response, next) => {
    Profile.findOne({person_sub:request.params.person_sub}, function(err,result){
        if(err){
            next(err); //what do we want to do here 
        }
        if(result){
        var updateObject = request.body; 
        var id = request.params.profile_id;
        var ObjectID = require('mongodb').ObjectID;
        Profile.updateOne({_id  : ObjectID(id)}, {$set: updateObject},{new:true})
        .then((profileData) => {
            console.log(profileData);
            response.status(204).send(profileData);
        })
        }
        else{
            response.status(404).send(" Profile Not Found");
        }
    });
});

//add to watchlist
router.put('/watchlist/:person_sub/:product_name', (request, response, next) => {
    get_item_object(request.params.product_name)
    .then((item)=> {
        var updateWatchlist = item[0]._id;
        console.log("watchlist: ", updateWatchlist);
    get_person_profile(request.params.person_sub)
    .then((profileData)=> {
        Profile.findByIdAndUpdate(
       profileData[0]._id ,{$push: {watchlist:updateWatchlist }},{new:true})
        //.populate({path:'watchlist', select:'_id', model: 'Profile'})    
        .then((watchData) => {
        //console.log(watchData);
        if(watchData){
            response.status(204).send(watchData);
        }else{
            response.status(404).send("Profile Not Found");
        }    
    })
    .catch((err) => next(err));  
   }) 
   .catch((err) => next(err));  
}) 
.catch((err) => next(err));  
});


router.delete('/watchlist/:person_sub/:item_id',(request,response,next) =>{
    var updateWatchlist = request.params.item_id
    get_person_profile(request.params.person_sub)
    .then((profileData)=> {
        Profile.findByIdAndUpdate(
       profileData[0]._id ,{$pull: {watchlist:updateWatchlist }},{new:true})
        //.populate({path:'watchlist', select:'_id', model: 'Profile'})    
        .then((watchData) => {
        //console.log(watchData);
        if(watchData){
            response.status(204).send(watchData);
        }else{
            response.status(404).send("Profile Not Found");
        }    
    })
    .catch((err) => next(err));  
   }) 
   .catch((err) => next(err));  
});

module.exports = router;