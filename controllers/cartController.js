//import cartItems collection
const cartitems = require('../models/cartSchema')

//logic to add item to cart
exports.addToCart = async (req, res) => {

    // to get product properties from req body
    const { id, title, price, image, quantity } = req.body
    //logic
    try {
        //product is already in cart
        const item = await cartitems.findOne({ id })
        if (item) {
            //product is already in the cart
            //increament quantity
            item.quantity += 1
            //update total price from the product
            item.grandTotal = item.price * item.quantity
            // to save changes in mongodb
            await item.save()
            // send response to client
            res.status(200).json("Item added succesfully")
        }
        else {
            // product is doesn't exist in the cart
            //add product to cart collection
            const newItem = new cartitems({
                id,
                title,
                price,
                image,
                quantity,
                grandTotal: price
            })
            //to save changes
            await newItem.save()
            res.status(200).json("Items added to your cart")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}

exports.allCartProducts = async (req, res) => {
    // fetching all product added to the cart
    const allProducts = await cartitems.find()
    try {
        res.status(200).json(allProducts)
    }
    catch (error) {
        res.status(401).json("nothing found in the cart")
    }

}

//get total quantity
exports.removeCartItems = async (req, res) => {

    // get id of product should be removed
    const { id } = req.params
    //logic
    try {
        const removedItem = await cartitems.deleteOne({ id })
        if (removedItem) {
            // get remaining items other than deleted one from cart
            const allItems = await cartitems.find()
            res.status(401).json(allItems)
        }
        else {
            res.status(401).json("Item is not in the cart")
        }
    }
    catch (error) {
        res.staus(402).json(error)
    }
}

// increament cart item
exports.increamentCartItem = async (req, res) => {
    const { id } = req.params
    try {
        const item = await cartitems.findOne({ id })
        if (item) {
            item.quantity += 1
            item.grandTotal = item.price * item.quantity
            await item.save()
            //get all items from the cart
            const allItems = await cartitems.find()
            res.status(200).json(allItems)
        }
        else {
            res.status(404).json("Item is not in the cart")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }

}
// decreament cart
exports.decreamentCartItem = async (req, res) => {
    const { id } = req.params
    try {
        const item = await cartitems.findOne({ id })
        if (item) {
            item.quantity -= 1
            if (item.quantity == 0) {
                // remove item from the cart
                const deleteItem = await cartitems.deleteOne({ id })
                // get all items from cart
                const allProducts = await cartitems.find()
                res.status(200).json(allProducts)
            }

            else {
                item.grandTotal = item.price * item.quantity
                await item.save()
                //get all items from the cart
                const allItems = await cartitems.find()
                res.status(200).json(allItems)
            }

        }
        else {
            res.status(404).json("Item is not in the cart")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }

}

//empty cart logic

exports.emptyCart = async (req, res) => {

    try {
        const result = await cartitems.deleteMany({})
        res.status(200).json("your cart is empty")
    }
    catch (error) {
        res.status(401).json(error)
    }
}
