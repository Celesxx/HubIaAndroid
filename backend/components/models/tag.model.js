const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Tag = mongoose.Schema({
   username : {type: String, require: true},
   name : {type: String},
   box : {type: Array},
   score : {type: String},
   image : {type: String}
});

Tag.plugin(AutoIncrement, {inc_field: 'tag_id'});
module.exports = mongoose.model('tags', Tag);