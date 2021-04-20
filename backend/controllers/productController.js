import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc      Fetch all products
// @route     GET  /api/products
// @access    Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  console.log(
    "🚀 ~ file: productController.js ~ line 10 ~ getProducts ~ page",
    page
  );
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i", // case insensitive
        },
      }
    : {};

  const count = await Product.count({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize) // items per a page
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc      Fetch single products
// @route     GET  /api/products/:id
// @access    Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc      Delete a product
// @route     DELETE  /api/products/:id
// @access    Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc      Create a sample product
// @route     POST  /api/products
// @access    Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc      Update a product
// @route     PUT  /api/products/:id
// @access    Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    if (req.body.price === 0) {
      res.status(400);
      throw new Error("Price cannot zero");
    } else if (req.body.countInStock === 0) {
      res.status(400);
      throw new Error("CountInStock cannot zero");
    } else {
      product.name = req.body.name;
      product.price = req.body.price;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description ?? product.description;
      product.image = req.body.image ?? product.image;
      product.brand = req.body.brand ?? product.brand;
      product.category = req.body.category ?? product.category;
    }

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc      Create new review
// @route     POST  /api/products/:id/reviews
// @access    Private
const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    // add new review to reviews arr
    product.reviews.push(review);
    // numReviews are length of review arr
    product.numReviews = product.reviews.length;
    // dynamic average
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product review failed, please try again.");
  }
});

// @desc      Get top rated products
// @route     GET  /api/products/top
// @access    Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
