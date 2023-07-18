const Router = require('express');
const router = new Router();
const cardProductController = require('../controllers/cardProductController');

router.post('/create', cardProductController.create);
router.get('/all', cardProductController.getAll);
router.get('/favorite', cardProductController.getFavorite);


module.exports = router;
