const express = require("express");
const router = express.Router();
const restoController = require("../controllers/Resto.controllers");
// Get all restaurants with optional filtering

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Récupère la liste des restaurants avec filtrage
 *     description: Permet de lister tous les restaurants ou de les filtrer par quartier (ex Dapoya, Pissy) ou par catégorie.
 *     tags: [Restaurants]
 *     parameters:
 *       - in: query
 *         name: neighborhood
 *         schema:
 *           type: string
 *         description: Le nom du quartier pour filtrer les résultats
 *         example: "Patte d'Oie"
 *       - in: query
 *         name: Food_type
 *         schema:
 *           type: string
 *         description: Filtrer par type de cuisine
 *         example: "Local"
 *     responses:
 *       200:
 *         description: Liste des restaurants récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 15
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Restaurant'
 *       500:
 *         description: Erreur serveur
 */
router.get("/", restoController.getAllRestaurants);

module.exports = router;
