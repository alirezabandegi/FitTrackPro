
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    "name": {type: String, required: true, maxlength: 100},
    "email": {type: String, required: true, maxlength: 100},
    "password": {type: String, required: true, maxlength: 150},
    "created_at": {type: Date, required: true},
    "updated_at": {type: Date, required: true}
});

//Export model
module.exports = mongoose.model('Users', UsersSchema);