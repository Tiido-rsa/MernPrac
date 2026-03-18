import express from 'express';
import dotenv from 'dotenv';
import Product from './models/product.js';
import { connectDB } from './config/db.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(express.json()); // middle ware that allows us to accept json data


app.listen(3000, () => {
    connectDB();
    console.log("server running on port 3000")
});


// GET PRODUCTS
app.get('/api/products', async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({success:true, data:products})
    }catch(e){
        res.status(500).json({success:false, message:"Server error"})
    }
})

// ADD PRODUCTS
app.post('/api/products', async (req, res) => {
    const product = req.body; //sent by user
    if(!product.name || !product.price || !product.image ){
        return res.status(400).json({success:false, message:"Please provide all fields"})
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({success:true, data:newProduct});
    }catch(e){
        console.error("error in create product: ", e.message);
    }
})

// DELETE PRODUCTS
app.delete('/api/products/:id', async (req, res) =>{
    const {id} = req.params

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Product deleted"});
    }catch (e){
        res.status(400).send("Bad Request");
    }
})

// EDIT AN ITEM
app.put('/api/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"INvalid Product id"});
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success:true, data:updatedProduct});
    }catch(e){
        res.status(500).json({success:false, message:"Server Error"});
    }
})
