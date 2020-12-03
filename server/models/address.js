const mongoose = require('mongoose');
const People = require('../models/people');
// address schema
const AddressSchema = mongoose.Schema({
    person_sub: String, 
    address_string: String,
    place_id: String,
    default_address: { type: Boolean, default: 0},
    address_name: String,
    location: {
        type: {
          type: String, 
          default: 'Point'
        },
        coordinates: {
          type: [Number] //long lat 
        }
      }
});

 /*------------post hooks ----------------------------*/

 //delete addressid from people before we delete the address 
 AddressSchema.post('findOneAndDelete', function(doc){  
    // console.log(doc);
     People.updateOne(
        {person_sub: doc.person_sub},
        {$pull: {address_id: doc._id}}).exec();
});

//save addressid into people after we add it
AddressSchema.post('save', function(){
    People.updateOne(
        {person_sub: this.person_sub},
        {$push: {address_id: this._id}},
        {multi:true}).exec();
       // console.log(this);
});

AddressSchema.index({location: '2dsphere'});
const Address = mongoose.model('Address', AddressSchema);
module.exports = Address;