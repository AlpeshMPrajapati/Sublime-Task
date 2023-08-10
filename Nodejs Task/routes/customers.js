const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

//get All Customer
router.get('/customers', customerController.getCustomers);
//get Customer by it's id
router.get('/customers/:id', customerController.getCustomerById);
//get all cities with customer count
router.get('/cities', customerController.getCitiesWithCustomerCount);
//create Customer 
router.post('/customers', customerController.addCustomer);
//get customer by first_name , last_name and city with pagination
router.get('/customer/',customerController.getCustomerByAllFieldsAndPagination)
//update customer by it's id
router.put('/customers/:id', customerController.updateCustomer);
//delete customer by it's id
router.delete('/customers/:id', customerController.deleteCustomer);

module.exports = router;