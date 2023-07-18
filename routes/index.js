const Router = require('express');
const router = new Router();
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const sizeRouter = require('./SizeRouter');

const cardProductRouter = require('./cardProductRouter');
const modelProductRouter = require('./modelPoductRouter');

const imageRouter = require('./imageRouter');


router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/size', sizeRouter);

router.use('/card/product', cardProductRouter);
router.use('/model/product', modelProductRouter);


router.use('/image', imageRouter);



module.exports = router;