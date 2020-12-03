const mongoose = require('mongoose');
const People = require('../models/people');

// contact schema
const ContactsSchema = mongoose.Schema({
//need to connect to a person?
    person_sub: String,
    email: String,
    phone_number: String,
    social_id: [String],

});

 /*------------post hooks ----------------------------*/

//  //delete contactid from people before we delete the address
//  ContactsSchema.post('findOneAndDelete', function(doc){  
//     People.updateOne(
//         {person_sub: doc.person_sub},
//         {$pull: {contact_id: doc._id}}).exec();
//         //console.log(doc);
// });

//save contactid into people after we add it/////////////////
ContactsSchema.post('save', function(){
    People.updateOne(
        {person_sub: this.person_sub},
        {$set: {contact_id: this._id}}).exec();
        //console.log(this);
});

// the model
const Contacts = mongoose.model('Contacts', ContactsSchema);

module.exports = Contacts;
