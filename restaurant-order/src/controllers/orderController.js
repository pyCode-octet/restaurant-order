const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

exports.createOrder = async (req, res) => {
    try{
        const {items} = req.body;
        let totalPrice = 0;
        let processedItems = [];

        for (let item of items){
            const menuItem = await MenuItem.findById(item.menuItemId);

            if (!menuItem || !menuItem.available){
                return res.status(404).json({message: `Menu item with ID ${item.menuItemId} not found or unavailable.`});
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
            userId: req.user._id,
            items: processedItems,
            totalPrice: totalPrice,
            status: 'pending',
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        // On vérifie que le statut est valide selon ton Enum dans Order.js
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};