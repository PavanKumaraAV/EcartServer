
// import wishlist collection
const wishlists = require("../models/wishlistSchema")
const wishlist = require("../models/wishlistSchema")

// logic to add item to wishlist
exports.addToWishlist = async (req, res) => {

    //get product details from request body
    const { id, title, price, image } = req.body

    try { //check product is already in wishlist
        const item = await wishlists.findOne({ id })
        if (item) {
            res.status(403).json("Item Already present in your wishlist")
        }
        else {
            //product is not available
            const newProduct = new wishlists({
                id,
                title,
                price,
                image
            })
            //save to db - giving await because it is an asynchronous function call
            await newProduct.save()
            res.status(200).json("Item successfuly added to wishlist")
        }
    }
    catch (error) {
        res.status(401).json("undefined error")
    }
}


//get all items in wishlist
exports.getAllWishlistItems = async (req, res) => {

    try {
        const allItems = await wishlists.find()
        if (allItems) {
            res.status(200).json(allItems)
        }
        else {
            res.status(402).json("your wishlist empty")
        }
    }
    catch (error) {
        res.status(402).json("Cant fetch data")
    }
}


//remove item from wishlist
exports.removeWishlistItem = async (req, res) => {
    //get prduct id from req url
    const { id } = req.params
    try {
        //logic
        const item = await wishlists.deleteOne({ id })
        if (item) {
            //get remaining item other than the deleted one
            const allItems = await wishlists.find()
            res.status(200).json(allItems)
        }
        else {
            res.status(401).json("Item is not in the wishlist")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}


/**************/
// destructuring
// emp = {id : 1 , name : 'Pavan'};
// const {id,name} = emp;
// by using destructuring we can use id instead of emp.id
/**************/