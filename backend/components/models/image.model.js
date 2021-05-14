const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.pluralize(null);

const image = mongoose.Schema({
    name : {type: String, require: true},
    content : {type: String, require: true},
    type : {type: String, require: true},
});

image.plugin(AutoIncrement, {inc_field: 'image_id'});
module.exports = mongoose.model('Image', image);