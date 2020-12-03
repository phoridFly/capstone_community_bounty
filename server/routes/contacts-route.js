const router = require('express').Router();
const { get } = require('mongoose');
const Contacts = require('../models/contacts');

/* -------- BEGIN MODEL FUNCTIONS HERE -------- */

/**
 * Function post_contact creates new Contact document in MongoDB
 * @param {string}      newContact Data associated with a contact.
 * @returns {object}                    New contact object
 */
function post_contact(newContact){
    return newContact.save();
}

/**
 * Function get_all_contacts_without_pagination
 *      returns array of all contacts in the database
 * @returns {object}            Object that contains array of contacts.
 */
function get_all_contacts_without_pagination(){
    return Contacts.find({});
}

/**
 * Function get_single_contact returns a single contact
 *      as a JSON object
 * @params {string}     contact_id Id of contact we want to find.
 * @returns {object}                    Object that contains a contact.
 */
function get_single_contact(contact_id){
    return Contacts.find({_id: contact_id});
}

/* -------- END MODEL FUNCTIONS --------*/

/* -------- BEGIN CONTROLLER FUNCTIONS HERE --------*/

// get all the contacts in the DB
router.get('/', (request, response, next) => {
    // call the model function
    get_all_contacts_without_pagination()
    .then((allContacts) => {
        response.status(200).send(allContacts);
    })
    .catch((err) => next(err));
});

// get a contact by id in the DB
router.get('/:contacts_id', (request, response, next) => {
    // call the model function with id of contact to find
    get_single_contact(request.params.contacts_id)
    .then((singleContact) => {
        if( singleContact ) {
            response.status(200).send(singleContact);
        } else {
            response.status(404).send("Contact Not Found");
        }
    })
    .catch((err) => next(err));
});


// create a new contact in the DB
router.post('/', (request, response, next) => {

    var newContact = new Contacts();
    newContact.email = request.body.email;
    newContact.phone_number = request.body.phone_number;
    

    // call the model function
    post_contact(newContact)
    .then((contactData) => {
        response.status(201).send(contactData);
    })
    .catch((err) => next(err));    
});

// delete a contact by id in the DB
router.delete('/:contacts_id', (request, response, next) => {
    Contacts.deleteOne({ "_id" : request.params.contacts_id }, function(err, result) {
        if(err) {
            next(err);
        }
        if (result.n) {
            response.status(204).send("Contact Deleted");
        } else {
            response.status(404).send("Contact Not Found");
        }
    });
});

// update a contact by id in the DB
router.patch('/:contacts_id', (request, response, next) => {
    get_single_contact(request.params.contacts_id)
    .then((contactyData) => {
        if( contactyData ) {
            var updateObject = request.body;
            var id = request.params.contacts_id;
            var ObjectID = require('mongodb').ObjectID;
            Contacts.updateOne(
                {_id : ObjectID(id)},
                {$set : updateObject},
                {new : true} )
                .then( (contactData) => {
                    response.status(204).send(contactData);
                });
        } else {
            response.status(404).send("Contact Not Found");
        }
    })
    .catch((err) => next(err));
});

module.exports = router;