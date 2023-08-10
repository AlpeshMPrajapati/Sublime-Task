const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    // { id: 1, first_name: 'Aman', last_name: 'Gupta', city: 'Ahmedabad', company: 'SublimeDataSystems' }
    id:{
        type: Number
    },
    first_name:{
        type : String,
        required:[true,'First Name is Required']        
    },
    last_name:{
        type :String,
        required:[true,"Last name is Required"]
    },
    city:{
        type : String,
        default:"Mumbai",
        required:[true,"city is Required"]
    },
    company:{
        type : String,
        required:[true,"company name is required"]    
    }
})

module.exports = mongoose.model('Customer',customerSchema);