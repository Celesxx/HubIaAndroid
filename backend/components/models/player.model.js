const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.pluralize(null);

const playerSchema = mongoose.Schema({
   username : {type: String, require: true},
   score : 
   [{
      Object : {type: String},
      Nbr : {type: Number}
   }]
});

playerSchema.plugin(AutoIncrement, {inc_field: 'player_id'});
module.exports = mongoose.model('Player', playerSchema);