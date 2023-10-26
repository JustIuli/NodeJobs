const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({

     company:{
        type:String,
        required:true
    },
    jobTitle:{
        type:String,
        required:true
    },
    jobLocation:{
        type:String,
        required:true
    },
    contactEmail:{
        type:String,
        required:true
    },
    applicationJobURL:{
        type:String,
        required:true
    },
    jobTags: {
        type:Array,
        required:true
    },
    jobDescription:{
        type:String,
        required:true
    },
    jobLogo:{
        type:String,
        required:true
    },  
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }

});

module.exports = mongoose.model('Listing' , listingSchema);
