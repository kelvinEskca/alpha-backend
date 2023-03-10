const Order = require('../models/Order');
const router = require('express').Router();
const { verifyToken, verifyTokenAuthorization, verifyTokenAdmin } = require('./verifyToken');


//create a new order;
router.post('/', verifyToken, async(req,res)=>{
    const newOrder = new Order(req.body);
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json("Order Added");
        console.log(savedOrder);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

//update Order;
router.put("/:id", verifyTokenAdmin, async(req,res)=>{
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatedOrder);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//delete Order;
router.delete("/:id", verifyTokenAdmin, async (req,res)=>{
    try{
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedOrder);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//get User Order
router.get("/:id", verifyTokenAuthorization, async (req,res)=>{
    try{
        const orders = await Order.find({userId: req.params.userId});
        res.status(200).json(orders);
        console.log(req.params.userId);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

//get all Orders;
router.get('/', verifyTokenAdmin, async (req,res)=>{
    try{
        const orders =  await Order.find();
        res.status(200).json(orders);
    }
    catch(err){
        res.status(500).json(err)
        console.log(err)
    }
});

module.exports = router