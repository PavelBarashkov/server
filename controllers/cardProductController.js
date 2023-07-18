const { model } = require('../db');
const ApiError = require('../error/ApiError');
const { CardProduct, ModelProduct, Image, Product, Size } = require('../models/models');

class CardProductController {

    async create(req, res, next) {
        try {
            const {name, price, favorite} = req.body;

            const cardProduct = await CardProduct.create({name, price, favorite});
            
            return res.json(cardProduct)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    } 

    async getAll(req, res) {
        const cardProduct = await CardProduct.findAll({
            include: [
                {
                    model: ModelProduct,
                    include: [
                        {
                            model: Image,
                            attributes: ['url', 'id'],
                            through: {attributes: []},
                        },
                       {
                        model: Product,
                        include: [
                            {
                                model: Size,
                                attributes: ['name', 'id'],
                                through: {attributes: []},
                            }
                        ]
                       }
                    ]   
                }
            ]
        });
        return res.json(cardProduct)
    } 

    async getFavorite(req, res) {
        const favorite = 'true';
        const cardProduct = await CardProduct.findAll({
            where: {favorite: favorite},
            include: [
                {
                    model: ModelProduct,
                    include: [
                        {
                            model: Image,
                            attributes: ['url', 'id'],
                            through: {attributes: []},
                        },
                       {
                        model: Product,
                        include: [
                            {
                                model: Size,
                                attributes: ['name', 'id'],
                                through: {attributes: []},
                            }
                        ]
                       }
                    ]   
                }
            ]
        });
        return res.json(cardProduct)
    }
}

module.exports = new CardProductController();
