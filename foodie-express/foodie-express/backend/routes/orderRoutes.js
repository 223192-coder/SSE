const express = require("express");
const crypto = require("crypto");

const router = express.Router();
const db = require("../db");
const authenticateToken = require("../middleware/authMiddleware");

// ======================================
// CREATE NEW ORDER
// ======================================
router.post("/", authenticateToken, async (req, res) => {
  const { items, delivery_address, payment_method } = req.body;

  if (
    !Array.isArray(items) ||
    items.length === 0 ||
    !delivery_address ||
    !payment_method
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide your order items, delivery address and payment method.",
    });
  }

  // Validate item IDs and quantities
  for (const item of items) {
    if (
      !Number.isInteger(Number(item.menu_item_id)) ||
      !Number.isInteger(Number(item.quantity)) ||
      Number(item.quantity) < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid menu item or quantity.",
      });
    }
  }

  // Combine duplicate menu items
  const quantityMap = new Map();

  for (const item of items) {
    const id = Number(item.menu_item_id);
    const quantity = Number(item.quantity);

    quantityMap.set(id, (quantityMap.get(id) || 0) + quantity);
  }

  const menuItemIds = [...quantityMap.keys()];
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Retrieve menu items and their actual database prices
    const placeholders = menuItemIds.map(() => "?").join(",");

    const [menuItems] = await connection.execute(
      `SELECT id, restaurant_id, name, price, is_available
       FROM menu_items
       WHERE id IN (${placeholders})
       FOR UPDATE`,
      menuItemIds
    );

    if (menuItems.length !== menuItemIds.length) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: "One or more menu items could not be found.",
      });
    }

    if (menuItems.some(item => !item.is_available)) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: "One or more menu items are currently unavailable.",
      });
    }

    // Ensure all items belong to the same restaurant
    const restaurantIds = [
      ...new Set(menuItems.map(item => item.restaurant_id))
    ];

    if (restaurantIds.length !== 1) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: "Please order from one restaurant at a time.",
      });
    }

    const restaurantId = restaurantIds[0];

    // Retrieve delivery fee from the restaurant
    const [restaurants] = await connection.execute(
      `SELECT id, delivery_fee
       FROM restaurants
       WHERE id = ? AND is_active = TRUE`,
      [restaurantId]
    );

    if (restaurants.length === 0) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: "This restaurant is currently unavailable.",
      });
    }

    // Calculate subtotal using database prices
    let subtotal = 0;

    const orderItems = menuItems.map(item => {
      const quantity = quantityMap.get(item.id);
      const price = Number(item.price);
      const itemSubtotal = price * quantity;

      subtotal += itemSubtotal;

      return {
        menu_item_id: item.id,
        item_name: item.name,
        quantity,
        price_at_purchase: price,
        subtotal: itemSubtotal,
      };
    });

    const deliveryFee = Number(restaurants[0].delivery_fee);
    const total = subtotal + deliveryFee;

    // Generate unique order number
    const orderNumber =
      "FE-" +
      Date.now() +
      "-" +
      crypto.randomBytes(3).toString("hex").toUpperCase();

    // Create order
    const [orderResult] = await connection.execute(
      `INSERT INTO orders
       (order_number, user_id, restaurant_id, delivery_address,
        subtotal, delivery_fee, total, payment_method, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderNumber,
        req.user.id,
        restaurantId,
        delivery_address,
        subtotal,
        deliveryFee,
        total,
        payment_method,
        "pending",
      ]
    );

    const orderId = orderResult.insertId;

    // Save individual order items
    for (const item of orderItems) {
      await connection.execute(
        `INSERT INTO order_items
         (order_id, menu_item_id, item_name, quantity,
          price_at_purchase, subtotal)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.menu_item_id,
          item.item_name,
          item.quantity,
          item.price_at_purchase,
          item.subtotal,
        ]
      );
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      data: {
        id: orderId,
        order_number: orderNumber,
        subtotal,
        delivery_fee: deliveryFee,
        total,
        status: "pending",
      },
    });

  } catch (error) {
    await connection.rollback();

    console.error("Order creation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to place order.",
    });

  } finally {
    connection.release();
  }
});

module.exports = router;