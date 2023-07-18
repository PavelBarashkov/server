const ApiError = require("../error/ApiError");
const { Product, ModelProduct, Size } = require("../models/models");

class ProductController {
    async create(req, res, next) {
        try {
          const { modelId, size, compound } = req.body;
          const product = await Product.create({ modelId, compound });
    

        const sizePromises = size.map(item => {
            return Size.findOrCreate({ where: { name: item } });
        });
        const sizeInstances = await Promise.all(sizePromises);
        const sizes = sizeInstances.map(item => item[0]);
        
        await product.addSizes(sizes);
          const modelProduct = await ModelProduct.findByPk(modelId);
    
          modelProduct.productId = product.id;
          await modelProduct.save();
    
          return res.json(product);
        } catch (e) {
          return next(ApiError.badRequest(e.message));
        }
      }

    async getAll(req, res) {
        const product = await Product.findAll(
            { 
                where: { 
                    modelId: req.params.id 
                }, 
                include: [
                    {
                        model: Size,
                        attributes: ['name', 'id'],
                        through: {attributes: []},
                    }
                ]
            });
        return res.json(product)
    }
    

    async getOne(req, res) {
        
    }
}

module.exports = new ProductController();
