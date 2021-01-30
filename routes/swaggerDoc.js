const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');

router.use('/api-docs', swaggerUi.serve);
//router.get('/api-docs', swaggerUi.setup(swaggerDocument));