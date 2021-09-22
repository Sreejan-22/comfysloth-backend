const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// sample cart item
// const singleCartItem = {
//   name: "modern poster",
//   id: "recoAJYUCuEKxcPSr",
//   img: "https://dl.airtable.com/.attachments/e2eef862d9b7a2fb0aa74fa24fbf97bb/25c4bc17/0-pexels-pixabay-462235.jpg"
//   qty: 3,
//   price: 4561,
//   company: "ikea",
// };

const cartSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    cartItems: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        id: {
          type: String,
          required: true,
          trim: true,
        },
        img: {
          type: String,
          required: true,
          trim: true,
        },
        qty: {
          type: Number,
          required: true,
          trim: true,
        },
        price: {
          type: Number,
          required: true,
          trim: true,
        },
        company: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  { collection: "data" }
);

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
