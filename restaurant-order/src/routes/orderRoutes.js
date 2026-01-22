const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

/**
 * @swagger
 * /api/orders:
 * post:
 * summary: Passer une commande
 * security:
 * - bearerAuth: []
 * requestBody:
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * items:
 * type: array
 * items:
 * type: object
 * properties:
 * menuItemId: { type: string }
 * quantity: { type: number }
 * responses:
 * 201:
 * description: Commande enregistrée
 */
router.post('/', orderController.createOrder);
/**
 * @swagger
 * /api/orders/me:
 * get:
 * summary: Récupérer l'historique des commandes de l'utilisateur connecté
 * tags: [Orders]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Liste des commandes récupérée avec succès
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Order'
 * 401:
 * description: Non authentifié
 */
router.get('/me', orderController.getUserOrders);

/**
 * @swagger
 * /api/orders/{id}/status:
 * patch:
 * summary: Mettre à jour le statut d'une commande (Admin uniquement)
 * tags: [Orders]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: ID de la commande
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * status:
 * type: string
 * enum: [pending, preparing, delivering, completed, cancelled]
 * description: Le nouveau statut de la commande
 * responses:
 * 200:
 * description: Statut mis à jour avec succès
 * 400:
 * description: Statut invalide
 * 404:
 * description: Commande non trouvée
 */
router.patch('/:id/status', orderController.updateOrderStatus);

module.exports = router;