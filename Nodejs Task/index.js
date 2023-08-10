// Node.js Technical Test: Create a simple Node.JS Rest API which provides data about customers. You are supposed to follow the following conditions:

//  1) Create a customers.js on file with multiple customers. Sample customer data. { id: 1, first_name: 'Aman', last_name: 'Gupta', city: 'Ahmedabad', company: 'SublimeDataSystems' } or You can use database of your choice and add the sample data in it. 

// 2) Create a list API with search by first_name, last_name and city with pagination. 

//3) Create an API to get single customer data by its id. 

// 4) Create an API to list all the unique cities with number of customers from a particular city.

// 5) Create an API to add a customer with validations. All fields required and the city and company should already exists for an existing customer. No new city or company can be added. 

//  we can add these two: • Create an API to update customer resource's attributes such as first_name, last_name, etc. • Create an API to delete a customer



const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;


//middleware to parse json request body 
app.use(express.json())


//import routes
const customer = require('./routes/customers')


//mount the api routes
app.use('/api', customer);



app.listen(port,()=>{
    console.log(`listening on ${port}`)
})


//connect to DB
const dbConnect  = require('./config/database')
dbConnect();

//default route mandatory
app.get('/',(req,res)=>{
    res.send(`<h1>This is HOME Page</h1>`)
})