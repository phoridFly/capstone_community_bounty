const router = require('express').Router();
const { get } = require('mongoose');
const People = require('../models/people');
const Contacts = require('../models/contacts');
const Profile = require('../models/profile');
const uploadImage = require('../../helpers/helpers.js');
var axios = require("axios").default;
/* --------  BEGIN MODEL FUNCTIONS HERE ------------- */
function update_person(sub){

    var options = {
        method: 'POST',
        url: 'https://dev-oacyz0dc.us.auth0.com/oauth/token',
        headers: {'content-type': 'application/json'},
        data: {
          grant_type: 'client_credentials',
          client_id: `${PROCESS.ENV.CLIENTID}`,
          client_secret: `${PROCESS.END.CLIENTSECRET}`,
          audience: 'https://dev-oacyz0dc.us.auth0.com/api/v2/'
        }
      };
request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
}


/** 
 * Function post_person creates new People document in MongoDB
 * @param  {string}     newPerson  Data associated with a person.
 * @returns {object}               New person object.
*/
function post_person(newPerson){
    return newPerson.save();
}

/** 
 * Function get_all_people_without_pagination returns array of all people in the database
 * @returns {object}               Object that contains array of people.
*/
function get_all_people_without_pagination(){
    return People.find({});
}

/** 
 * Function get_single_person returns a single person as a json object
 * @params  {string}    people_id  Id of person we want to find.
 * @returns {object}               Object that contains a person.
*/
function get_single_person(sub){
    return People.find({person_sub: sub});
}


/* --------  BEGIN CONTROLLER FUNCTIONS HERE ------------- */

// get all the people in the DB
router.get('/', (request, response, next) => {

    // call the model function
    get_all_people_without_pagination()
    .then((allPeople) => {
        response.status(200).send(allPeople);
    });
});

// get a person by id in the DB
router.get('/:people_sub', (request, response, next) => {
    // call the model function with id of person to find
    get_single_person(request.params.people_sub)
    .then((singlePerson) => {
        response.status(200).send(singlePerson);
    });
});

// see if person exists
router.get('/check/:people_sub', (request, response, next) => {
    console.log("here",request.params.people_sub);
    get_single_person(request.params.people_sub)
    .then((singlePerson) => {
        console.log(singlePerson);
        if(singlePerson){
            response.status(200).send("person found");
        }else{
            response.status(404).send("person not found");
        }    
    })
    .catch((err) => next(err)); 
});

// create a new person in the DB
router.post('/', (request, response, next) => {

    // create a People object and set properties
    var newPerson = new People();
    newPerson.name = request.body.name;
    newPerson.nickname = request.body.nickname;
    newPerson.picture = request.body.picture;
    newPerson.person_sub = request.body.person_sub;

    // call the model function
    post_person(newPerson)
    .then((personData) => {

        response.status(201).send(personData);
    }); 
});

// update a solicitation image in the DB
router.post('/images/:person_sub', async (request, response, next) => {

    try {
        
        // the file object
        const myFile = request.file;
        // get the file name and append the solicitation id to it
        var oldName = myFile.originalname;
        var newName = request.params.person_sub + '_' + oldName;
        myFile.originalname = newName;
        const imageUrl = await uploadImage(myFile);
        //console.log("hear ye  " + myFile.originalname);
    
        // just like the PATCH, but we'll get the person then only update the picture name
        get_single_person(request.params.person_sub)
        .then( (peep) => {
            if( peep ) {
            var updateObject = request.body;
            updateObject.picture = newName;
            var sub = request.params.person_sub;
            People.updateOne(
                {person_sub: sub},
                {$set : updateObject},
                {new : true} )
                .then( (documentData) => {
                    console.log(documentData);
                    response.location('https' + "://" + request.get('host') + request.baseUrl + '/' + request.params.person_sub);
                    response.status(204).set("Content-Type", "application/json").end();
                });
        } else {
            response.status(404).send("Error: Person Not Found");
        }
          
    })   
        .catch((err) => next(err));
}    
        catch (error) {
            next(error)
        }
});
    




// patch update a person in the DB
// update properties of a transactions document in DB
router.patch('/:person_sub', (request, response, next) => {
    //update_person(request.params.sub) 
    People.findOne({person_sub: request.params.person_sub}, function(err, documentData){
        if(err) {
            next(err);
        }
        //console.log(documentData.nickname);

        if( documentData ) {
            var updateObject = request.body;
            var id = request.params.person_sub;
            //var ObjectID = require('mongodb').ObjectID;
            People.updateOne(
                {person_sub : id},
                {$set : updateObject},
                {new : true} )
                .then( (documentData) => {
                    console.log(documentData);
                    response.location('https' + "://" + request.get('host') + request.baseUrl + '/' + request.params.person_sub);
                    response.status(204).set("Content-Type", "application/json").end();
                });
        } else {
            response.status(404).send("Error: Person Not Found");
        }
    })
    .catch((err) => next(err));
});

// delete a person in the DB
router.delete('/:person_sub', (request, response, next) => {

    // first try to find the person with the people_id
    People.findOne({person_sub :request.params.person_sub}, function(err, documentData){
        if(err) {
            next(err);
            response.status(404).send("Error: Person Not Found");
        }
        else {

            // now delete the person
            People.deleteOne({ "person_sub" : request.params.person_sub }, err  => {
                if(err) {
                    next(err);
                }
            });

            // if no error, now delete the contact if there is one
            if (documentData.contact_id != null) {
                Contacts.deleteOne({ "_id" : documentData.contact_id }, err => {
                    if(err) {
                        next(err);
                        response.status(404).send("Error: Contact not found").end();
                    }
                });

            }

            // if no error, now delete the profile if there is one
            if (documentData.profile_id != null) {
                Profile.deleteOne({ "_id" : documentData.profile_id }, err => {
                    if(err) {
                        next(err);
                        response.status(404).send("Error: Profile not found").end();
                    }
                });   
            }
        }
    });

    response.status(204).send("Person deleted.");
});

module.exports = router;