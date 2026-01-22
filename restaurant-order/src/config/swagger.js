const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Restaurant Menu & Ordering API',
      version: '1.0.0',
      description: 'Documentation de l\'API pour la gestion du menu et des commandes',
      contact: { name: 'Développeur B' },
      servers: [{ url: 'http://localhost:5000' }]
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    }
  },
  apis: ['./src/routes/*.js'], // Chemin vers tes fichiers de routes pour extraire la doc
};

module.exports = swaggerJsDoc(swaggerOptions);