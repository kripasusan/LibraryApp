const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    // _id: { 
        
    //    // type: Schema.Types.ObjectId
    //    type : String
    // },
    nationality : String,
    name : String,
    image : String,
    born : String,
    description  : String
    
})

const authorData = mongoose.model('authorData', authorSchema);
module.exports = authorData;