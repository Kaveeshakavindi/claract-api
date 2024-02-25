// routes/routes.js


const express = require("express");
const router = express.Router();
const Product = require("../model/model");
const Cart = require('../model/cartSchema');
const Order = require('../model/orderSchema');
const User = require('../model/userSchema');

// Define route

//get all products - product schema
router.get('/getAll', async (req, res) => {
    try {
        const data = await Product.find();
        console.log("Retrieved data:", data);
        
        res.json(data);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });
    }
});

//get by id
router.get('/item/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const item = await Product.findById(id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json(item);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});


//get cart - cart schema
router.get('/cart/:id', async (req, res)=> {
    const id = req.params.id;
    try{
        let cart = await Cart.findOne({userId});
        if (cart && cart.items.length > 0){
            res.send(cart);
        }else{
            res.send(null);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
    
})

//add to cart
router.get('/cart/:id', async (req, res)=>{
    const userId = req.params.id;
    const {id, quantity} = 
})
  

module.exports = router;
