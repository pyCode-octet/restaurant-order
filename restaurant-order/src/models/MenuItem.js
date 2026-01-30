const mongoose = require("mongoose");
const menuItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    description: { type: String, required: true, trim: true },

    price: { type: Number, required: true, min: [0, "Price must be positive"] },

    category: {
      type: String,
      required: true,
      enum: {
        values: ["starter", "main", "dessert", "drink"],
        message: "{VALUE} is not a valid category",
      },
    },

    available: { type: Boolean, default: true },

    imageUrl: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
