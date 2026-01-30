const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Passer une commande
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menuItemId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       201:
 *         description: Commande enregistrée
 */
const { protect, authorize } = require("../middlewares/auth.middleware");

router.post("/", protect, orderController.createOrder);

/**
 * @swagger
 * /api/orders/me:
 *   get:
 *     summary: Voir mes commandes
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Historique des commandes
 */
router.get("/me", protect, orderController.getUserOrders);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Voir toutes les commandes (Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste complète des commandes
 */
router.get("/", protect, authorize("admin"), orderController.getAllOrders);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Mettre à jour le statut (Admin)
 *     tags: [Orders]
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
 *               status:
 *                 type: string
 *                 enum: [pending, preparing, ready, delivered]
 *     responses:
 *       200:
 *         description: Statut mis à jour
 */
router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  orderController.updateOrderStatus,
);

module.exports = router;
