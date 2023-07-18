const ApiError = require('../error/ApiError');
const { User } = require('../models/models');
const jwt = require('jsonwebtoken');

const generateJwt = function(id, name, phone, email) {
    return jwt.sign(
        {id, name, phone, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async login(req, res, next) {
        const {id} = req.query;
        if (!id) {
            return next(ApiError.badRequest('Нет Id'));
        }
        const existingUser = await User.findOne({where: {id}});
        if (existingUser) {
            const token = generateJwt(existingUser.id);
          return res.json({ token });
        }
        const user = await User.create({id});
        const token = generateJwt(user.id);
        user.save();
        return res.json({ token });
    }

    async loginUpdate(req, res, next) {
        const {id} = req.query;
        const {name, phone, email} = req.body;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).send('User not found');
            }
            if(!name || !phone || !email) {
                return next(ApiError.badRequest('Неверное: Имя или Телефон или Email'));
            }
            user.user_name = name;
            user.number_phone = phone;
            user.email = email; 
            const token = generateJwt(user.id, user.user_name, user.number_phone, user.email);
            await user.save();
            return res.json({ token });
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }

    async cheсk(req, res, next) {
        const token = generateJwt(req.user.id, req.user.user_name, req.user.number_phone, req.user.email);
        return res.json({token});
    }
       
}

module.exports = new UserController();