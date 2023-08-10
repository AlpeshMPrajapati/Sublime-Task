const Customer = require('../models/customer')

// api of get all customer
exports.getCustomers = async (req, res) => {
    try {
        let customers = await Customer.find();
        if (customers) {
            console.log("customers", customers);
            //return res.send('Hello World');
            return res.json({
                message: 'success',
                data: customers
            })
        }
        else {
            return res.json({
                message: "fail to load customer",
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: "Error",
            data: error.message
        })
    }
}

//api of get customer by it's id
exports.getCustomerById = async (req, res) => {
    try {
        const id = req.params.id;
        let customer = await Customer.findById(id);
        if (customer) {
            return res.json({
                success: "true",
                customer: customer
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: "false",
            message: error.message
        })
    }
}

//api for all cities with customer count
exports.getCitiesWithCustomerCount = async (req, res) => {
    try {
        const customers = await Customer.find();
        var cities = [];
        for (let i of customers) {
            // console.log("i",i._doc["city"]);
            if (!cities[i._doc['city']]) {
                cities[i._doc['city']] = {
                    count: 1
                };
            }
            else {
                cities[i._doc['city']].count++;
            }
        }
        let result = [];

        Object.keys(cities).forEach((key) => result.push({ "city": key, "customers": cities[key]['count'] }));

        return res.json({
            success: "true",
            data: result
        });

    }
    catch (error) {
        return res.status(500).json({
            success: "false",
            message: error.message
        })
    }

}

//api for create customer
exports.addCustomer = async (req, res) => {
    try {
        const { first_name, last_name, city, company } = req.body;

        const customer = await Customer({
            first_name,
            last_name,
            city,
            company
        })

        await customer.save();

        return res.json({
            success: "true",
            data: customer
        })

    } catch (error) {
        return res.status(500).json({
            success: "false",
            message: error.message
        })
    }
}


//api for search by first_name ,last_name,city with pagination
exports.getCustomerByAllFieldsAndPagination = async (req, res) => {

    const { first_name, last_name, city, page, limit } = req.query;
    const query = {};

    if (first_name) {
        query.first_name = first_name;
    }

    if (last_name) {
        query.last_name = last_name;
    }

    if (city) {
        query.city = city;
    }

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skipPage = (pageNumber - 1) * pageSize;

    try {
        const totalCustomers = await Customer.countDocuments(query);
        const customers = await Customer.find(query).skip(skipPage).limit(pageSize);

        return res.json({
            totalCustomers,
            totalPages: Math.ceil(totalCustomers / pageSize),
            currentPage: pageNumber,
            data: customers,
        });

    } catch (error) {
        return res.status(500).json({
            success: 'false',
            message: error.message
        });
    }

}

//api for update customer
exports.updateCustomer = async (req, res) => {
    try {

        const id = req.params.id;
        const updateData = req.body;

        if(!updateData.first_name && !updateData.last_name && !updateData.city && !updateData.company){
            throw new Error('Please provide details to update');
        }
    
        const customer = await Customer.findByIdAndUpdate({_id:id},updateData,{new:true});
    
        if(customer){
            return res.json({
                success:"true",
                message:'Customer updated successfully',
                data:customer
            })
        }
        else {
            res.status(404).json({
                success:'false',
                message: 'Customer not found' 
            });
          }
        
    } catch (error) {
        return res.status(500).json({
            success:'false',
            message : error.message
        })
    }
}

//api for delete customer
exports.deleteCustomer = async (req, res) => {
    try {
        const id=  req.params.id ;

        let customer =await Customer.findOneAndDelete({"_id":id})

        if (customer ) {
            return res.json({
                success:'true',
                message:"customer deleted successfully",
                data : customer
            })
            }else{
                return res.status(201).json({
                    success:'false',
                    message:"customer dosn't exist with thid ID"
                })
            }    

    } catch (error) {
        return res.status(500).json({
            success:'false',
            message : error.message
        })
    }
}