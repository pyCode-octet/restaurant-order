const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Récupérer tout le menu
 *     responses:
 *       200:
 *         description: Liste des plats récupérée avec succès
 */
const { protect, authorize } = require("../middlewares/auth.middleware");

// Public route to get all items
router.get("/", menuController.getMenuItems);

// Admin only routes

/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: Ajouter un nouveau plat (Admin)
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               category: { type: string, enum: [starter, main, dessert, drink] }
 *               available: { type: boolean }
 *     responses:
 *       201:
 *         description: Plat créé
 *       403:
 *         description: Non autorisé
 */
router.post("/", protect, authorize("admin"), menuController.createMenuItem);

/**
 * @swagger
 * /api/menu/{id}:
 *   put:
 *     summary: Modifier un plat (Admin)
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               price: { type: number }
 *     responses:
 *       200:
 *         description: Plat modifié
 */
router.put("/:id", protect, authorize("admin"), menuController.updateMenuItem);

/**
 * @swagger
 * /api/menu/{id}:
 *   delete:
 *     summary: Supprimer un plat (Admin)
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Plat supprimé
 */
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  menuController.deleteMenuItem,
);

module.exports = router;
