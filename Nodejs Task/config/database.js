const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology : true
    })
    .then(()=>console.log("Database Connected"))
    .catch((err)=> console.error(`Error in connecting to database ${err.message}`)) 
}

module.exports=dbConnect;