const mongoose = require('mongoose');
const People = require('../models/people');


// Profiles schema
const ProfileSchema = mongoose.Schema({
    person_sub: String, 
    contact_method: {
        type: String, 
        enum: ['email', 'text', 'app'],
        default: 'app'
    },
    search_radius: {
        type: String,
        enum:['5', '10', '15', '20', '30', '40', '50','75'],
        default: '30' 
    },    
    loc_ambiguity: {
        type: String,
        enum:['1','5','10'],
        default:'5'
    },  
    session_location: { 
        type: String,
        enum:['true', 'false'],
        default:'true'
    },  
    watchlist: [String]
});

 /*------------post hooks ----------------------------*/

//save profileid into people after we add it
ProfileSchema.post('save', function(){
    People.updateOne(
        {person_sub: this.person_sub},
        {$set: {profile_id: this._id}}).exec();
        console.log(this);
});

// the model
const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;