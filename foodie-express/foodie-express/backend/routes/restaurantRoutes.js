
const express = require("express");
const router = express.Router();

const db = require("../db");


// ======================================
// GET RESTAURANT MENU
// ======================================
router.get("/:id/menu", async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // Check whether the restaurant exists
    const [restaurants] = await db.execute(
      "SELECT id FROM restaurants WHERE id = ? AND is_active = TRUE",
      [restaurantId]
    );

    if (restaurants.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    // Retrieve menu items belonging to this restaurant
    const [menuItems] = await db.execute(
      `SELECT
        menu_items.id,
        menu_items.restaurant_id,
        menu_items.category_id,
        menu_items.name,
        menu_items.description,
        menu_items.price,
        menu_items.image_url,
        menu_items.is_available,
        categories.name AS category_name
       FROM menu_items
       LEFT JOIN categories
         ON menu_items.category_id = categories.id
       WHERE menu_items.restaurant_id = ?
       ORDER BY menu_items.id ASC`,
      [restaurantId]
    );

    res.json({
      success: true,
      data: menuItems,
    });

  } catch (error) {
    console.error("Menu retrieval error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve restaurant menu",
    });
  }
});


// ======================================
// GET ALL RESTAURANTS
// ======================================
router.get("/", async (req, res) => {
  try {
    const [restaurants] = await db.query(
      "SELECT * FROM restaurants WHERE is_active = TRUE"
    );

    res.json({
      success: true,
      data: restaurants,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve restaurants",
    });
  }
});


// ======================================
// GET RESTAURANT BY ID
// ======================================
router.get("/:id", async (req, res) => {
  try {
    const [restaurants] = await db.execute(
      "SELECT * FROM restaurants WHERE id = ?",
      [req.params.id]
    );

    if (restaurants.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.json({
      success: true,
      data: restaurants[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve restaurant",
    });
  }
});


// ======================================
// ADD RESTAURANT
// ======================================
router.post("/", async (req, res) => {
  try {
    const {
      owner_user_id,
      name,
      description,
      address,
      image_url,
      delivery_fee,
      estimated_delivery_time,
    } = req.body;

    if (!name || !address) {
      return res.status(400).json({
        success: false,
        message: "Restaurant name and address are required",
      });
    }

    const [result] = await db.execute(
      `INSERT INTO restaurants
      (owner_user_id, name, description, address, image_url,
       delivery_fee, estimated_delivery_time)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        owner_user_id || null,
        name,
        description || null,
        address,
        image_url || null,
        delivery_fee ?? 0,
        estimated_delivery_time || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Restaurant added successfully",
      restaurant_id: result.insertId,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to add restaurant",
    });
  }
});


// ======================================
// UPDATE RESTAURANT
// ======================================
router.put("/:id", async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      image_url,
      delivery_fee,
      estimated_delivery_time,
    } = req.body;

    const [result] = await db.execute(
      `UPDATE restaurants
       SET name = ?,
           description = ?,
           address = ?,
           image_url = ?,
           delivery_fee = ?,
           estimated_delivery_time = ?
       WHERE id = ?`,
      [
        name,
        description,
        address,
        image_url,
        delivery_fee,
        estimated_delivery_time,
        req.params.id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.json({
      success: true,
      message: "Restaurant updated successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update restaurant",
    });
  }
});


// ======================================
// DELETE RESTAURANT
// ======================================
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.execute(
      "DELETE FROM restaurants WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.json({
      success: true,
      message: "Restaurant deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete restaurant",
    });
  }
});

module.exports = router;
