/**
 * Created by johnsont on 23/07/2015.
 */
var mongoose = require('mongoose');




var numbersSchema = new mongoose.Schema({
   newNumber : Number


})


//mongoose.model('numbers', numbers);

module.exports = mongoose.model('Numbers', numbersSchema);