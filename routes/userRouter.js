const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login)
router.put('/loginUpdate', userController.loginUpdate)
router.get('/auth', userController.cheсk)


module.exports = router;