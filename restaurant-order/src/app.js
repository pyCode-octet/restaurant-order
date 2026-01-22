const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger.js');

// ... après tes autres middlewares
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Utilisation des routes
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);