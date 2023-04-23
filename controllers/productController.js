// logic to get all products from mongodb

//import product collection 
const products = require("../models/productSchema")

exports.getAllProducts = async (req, res) => {
    //logic
    try {
        const allProducts = await products.find()
        //send to client
        res.status(200).json(allProducts)
    }
    catch (error) {
        res.status(401).json(error)
    }
}

//logic to get a perticular product from mongodb
exports.viewProduct = async (req, res) => {
    //get id of the product
    const id = req.params.id
    try { //logic
        const product = await products.findOne({
            id
        })
        //send product details to client
        res.status(200).json(product)

    }
    catch (error) {
        res.status(401).json(error)
    }
}
