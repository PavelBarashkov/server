const { Size } = require('../models/models');

class SizeController {

    async create(req, res) {
        const {name} = req.body;
        const size = await Size.create({name});
        return res.json(size)
    } 

    async getAll(req, res) {
        const size = await Size.findAll();
        return res.json(size)
    } 
}

module.exports = new SizeController();
