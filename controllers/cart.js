const Cart = require('../model/cart');

module.exports.createCart = async (req, res) => {
    try {
        const { itemId, itemName, quantity } = req.body;
        
        // Create a new cart item using the Cart model
        const newCartItem = new Cart({
            itemId: itemId,
            itemName: itemName,
            quantity: quantity
        });

        // Save the new cart item to the database
        const savedCartItem = await newCartItem.save();

        res.status(201).json({ item: savedCartItem });
    } catch (error) {
        res.status(500).json(error);
    }
};
  

  module.exports.getCarts = async (req, res) => {
    try {
        // Retrieve cart items from the database
        const cartItems = await Cart.find();

        res.json({ items: cartItems });
    } catch (error) {
        res.status(500).json(error);
    }
};

  module.exports.updateCart = async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        {
          new: true
        });
      res.status(200).json({
        message: "Cart is updated successfully.",
        updatedCart
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  module.exports.deleteCart = async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "Cart is deleted successfully."
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };

