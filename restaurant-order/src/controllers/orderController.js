const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    let totalPrice = 0;
    let processedItems = [];

    for (let item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);

      if (!menuItem || !menuItem.available) {
        return res.status(404).json({
          message: `Menu item with ID ${item.menuItemId} not found or unavailable.`,
        });
      }

      const subtotal = menuItem.price * item.quantity;
      totalPrice += subtotal;

      processedItems.push({
        menuItemId: menuItem._id,
        quantity: item.quantity,
        priceAtPurchase: menuItem.price,
      });
    }

    const newOrder = new Order({
      userId: req.user.id,
      items: processedItems,
      totalPrice: totalPrice,
      status: "pending",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.menuItemId")
      .populate("userId", "name email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate(
      "items.menuItemId",
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
