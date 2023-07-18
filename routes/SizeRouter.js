const Router = require('express');
const router = new Router();
const sizeController = require('../controllers/SizeController');

router.post('/create', sizeController.create);

module.exports = router;
