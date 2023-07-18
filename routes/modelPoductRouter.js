const Router = require('express');
const router = new Router();
const modelProductController = require('../controllers/modelProductController');

router.post('/create', modelProductController.create);
router.get('/:id', modelProductController.getModelId);
router.get('/all', modelProductController.getAll);

module.exports = router;
