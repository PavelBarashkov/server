const ApiError = require('../error/ApiError');
const { ModelProduct, Image } = require('../models/models');

class ModelProductController {

    async create(req, res, next) {
        try {
            const {cardId, color, description, img} = req.body;

            const modelProduct = await ModelProduct.create({cardId, color, description});

            const imgPromises = img.map(item => {
                return Image.findAll({ where: { url: item } });
            });
            const imgInstances = await Promise.all(imgPromises);
            const images = imgInstances.map(img => img[0]);
            
            await modelProduct.addImages(images);
            
            return res.json(modelProduct)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    } 

    async getModelId(req, res) {
        const modelProduct = await ModelProduct.findAll(
            { 
                where: { 
                    cardId: req.params.id 
                }, 
                include: [
                    {
                        model: Image,
                        attributes: ['url', 'id'],
                        through: {attributes: []},
                    }
                ]
            });
        return res.json(modelProduct)
    } 

    async getAll(req, res, next) {
        try {
            const modelProducts = await ModelProduct.findAll()
            return res.json(modelProducts);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new ModelProductController();
