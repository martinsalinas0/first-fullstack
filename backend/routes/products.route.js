const router = require("express").Router();
const Product = require("../models/product");

//GET /products
//Returns all products
router.get("/products", async (req, res) => {
  try {
    const perPage = 9; //products per page
    const page = req.query.page || 1; //page requested, and set DEFAULT to page 1

    const products = await Product.find()
      .skip((page - 1) * perPage)
      .limit(perPage);

    const count = await Product.countDocuments(); //number on the page

    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET /products/:product:
// Returns a specific product by its id

router.get("/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//DELETE /products/:productId
//delets a product byId
router.delete("/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const productToDelete = await Product.findByIdAndDelete(productId);
    if (!productToDelete) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET /products/productid/review
//GETs the all reviews for a certain product (4 at a time)
router.get("/product/:productId/reviews", async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    //if no product
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    //if yes prodcut but no reviews
    if (product.reviews.length === 0) {
      return res.status(404).json({ message: "No reviews available" });
    }
    res.status(200).json(product.reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//POST /products
//adds a new product
router.post("/products", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/product/:productId/reviews", async (req, res) => {
  try {
    const { productId } = req.params;

    const { User, Stars, reviewText } = req.body;

    if (!User || !Stars || !reviewText) {
      return res.status(400).json({
        message: "username, starts, and review description are required.",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newReview = {
      User,
      Stars,
      reviewText,
      datePosted: new Date(),
    };

    product.reviews.push(newReview);
    await product.save();

    res.status(201).json({ message: "Review added", review: newReview });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//DELETE /product/productId/review
//deletes a review from the product
router.delete("/reviews/:reviewId", async (req, res) => {
  try {
    const { reviewId } = req.params;

    const product = await Product.findOne({ "reviews._id": reviewId });
    if (!product) {
      return res.status(404).json({ message: "Review not found" });
    }

    product.reviews = product.reviews.filter(
      (review) => review._id.toString() !== reviewId
    );

    await product.save();

    res.status(200).json({ message: "review has been deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
