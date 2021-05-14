const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.pluralize(null);

const user = mongoose.Schema({
    firstName : {type: String, require: true},
    lastName : {type: String, require: true},
    mail : {type: String, require: true},
    username : {type: String, require: true},
    password : {type: String, require: true},
    score : 
    [{
       Object : {type: String},
       Nbr : {type: Number}
    }],
    token : {type: String, require: true}
});

user.plugin(AutoIncrement, {inc_field: 'user_id'});
module.exports = mongoose.model('User', user);