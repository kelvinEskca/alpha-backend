const Product = require("../models/Product");
const router = require("express").Router();
const upload = require("../multer");
const {verifyToken,verifyTokenAuthorization,verifyTokenAdmin} = require("./verifyToken");

//create a new product;
router.post("/", verifyTokenAdmin, upload.array("image"), async (req, res) => {
  console.log(req.body);

  const newProduct = new Product({ ...req.body, image: req.body.file });
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json("Product Added");
    console.log(savedProduct);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//update product;
router.put("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//delete product;
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//get product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//get all products;
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
