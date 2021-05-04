import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', 
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
); //to send the products to frontend

productRouter.get('/seed', 
  expressAsyncHandler(async (req, res) => {
    //await Product.remove({}); //removes all products
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get('/:id',  
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' })
    }    
  })
); //api for product details


export default productRouter;