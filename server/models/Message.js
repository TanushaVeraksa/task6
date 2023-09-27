const {Schema, model, ObjectId} = require("mongoose");

const Message = new Schema({
    message: {type: String},
    tag: {type: String}
})


module.exports = model('Message', Message);