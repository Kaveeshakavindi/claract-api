// routes/routes.js
const express = require("express");
const router = express.Router();
const Product = require("../model/model");
const Cart = require('../model/cart')


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

// POST => /cart


router.post('/cart', async (req, res) => {

  try{
    
    const cart = await Cart.findOneAndUpdate(
        {},
        { $push: { items: req.body } },
        { upsert: true, new: true }
    );
    
    res.status(201).json(cart);
  }catch (err) {
    res.status(400).json({message: err.message});
  }


});




/// GET => /cart
router.get("/cart", getCart,async (req, res) => {
    res.json(res.cart);
});

async function getCart(req, res, next){
    let cart;
    try{
        cart = await Cart.findOne({});
        if(cart == null){
            return res.status(404).json({message: 'Cart not found'});
        }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
    res.cart = cart;
    next();
}


// // PATCH => /cart/:id
router.patch('/cart/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
     

        // Find the cart document
        const cart = await Cart.findOne({});

        // Find the index of the item within the items array
        const itemIndex = cart.items.findIndex(item => item._id.toString() === id);
        console.log(id, quantity);

        // If the item is not found, return 404
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        // Update the quantity, price of the item
        cart.items[itemIndex].quantity = quantity;
    
       

        // Save the updated cart document
        await cart.save();

        res.status(200).json(cart.items[itemIndex]);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//delete cart
// DELETE => /cart
router.delete('/cart', async (req, res) => {
    try {
      await Cart.deleteOne({}); // Delete the cart document
      res.status(204).end(); // Respond with no content (204 No Content)
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

  //delete one item
  router.delete('/cart/:itemId', async (req, res) => {
    const itemId = req.params.itemId;
  
    try {
      // Find the cart document
      const cart = await Cart.findOne({});
  
      // Find the index of the item to remove
      const itemIndex = cart.items.findIndex(item => item.id === itemId);
  
      // If the item is found, remove it from the cart
      if (itemIndex !== -1) {
        cart.items.splice(itemIndex, 1); // Remove the item
        await cart.save(); // Save the updated cart document
        res.status(204).end(); // Respond with no content (204 No Content)
      } else {
        res.status(404).json({ message: "Item not found in the cart" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

module.exports = router;
