const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');


router.post('/create', productController.create)
router.get('/model/:id', productController.getAll)
// router.get('/:id', productController)
// router.delete('/delete', productController)


module.exports = router;