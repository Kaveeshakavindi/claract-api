// models/model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//product schema
const productSchema = new Schema({
    name: String,
    price: Number,
    stock: Number,
    imgUrl: String,
    id: Number,
    benifits: Array,
    application: String,
    description: String,
    ingredients: Array,
    
  },{versionKey: false, collection: 'claractcollection'});

  
  

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
