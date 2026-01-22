const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

/**
 * @swagger
 * /api/menu:
 * get:
 * summary: Récupérer tout le menu
 * responses:
 * 200:
 * description: Liste des plats récupérée avec succès
 */
router.get('/', menuController.getMenuItems);

/**
 * @swagger
 * /api/menu:
 * post:
 * summary: Ajouter un nouveau plat (Admin)
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * title: { type: string }
 * description: { type: string }
 * price: { type: number }
 * category: { type: string, example: "main course" }
 * responses:
 * 201:
 * description: Plat créé
 */
router.post('/', menuController.createMenuItem);

module.exports = router;