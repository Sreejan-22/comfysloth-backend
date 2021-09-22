require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Cart = require("./models/cart.model");

const app = express();

app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const port = process.env.PORT;
const dbURI = process.env.MONGO_URI;

mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

// routes

// get all cart items
app.get("/cart", async (req, res) => {
  const { email } = req.body;

  try {
    const cart = await Cart.findOne({ email });
    const cartItems = cart ? cart.cartItems : null;
    res.status(200).json({ status: "ok", cartItems });
  } catch (err) {
    res.status(400).json({
      status: "err",
      message: "failed to fetch cart items",
      errorMessage: err,
    });
  }
});

// modify the list of cart items - either add, delete, or edit the qty of one or more cart item
app.post("/cart", async (req, res) => {
  const { email, cartItems } = req.body;
  try {
    const cart = await Cart.findOne({ email });
    if (cart) {
      cart.cartItems = cartItems;
      await cart.save();
      res.status(200).json({ status: "ok", message: "cart updated" });
    } else {
      const cartData = {
        email,
        cartItems,
      };
      const newCartItem = await Cart.create(cartData);
      res.status(200).json({ status: "ok", message: "cart updated" });
    }
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "failed to update the cart",
      errorMessage: err,
    });
  }
});

// 404
app.use("/", (req, res) => {
  res.status(404).json({ status: "error", message: "404 page!! Not found!!" });
});
