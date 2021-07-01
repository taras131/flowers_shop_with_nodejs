const ApiError = require('../error/APIError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Cart} = require('../models/models')

const generateToken = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SECKRET_KEY, {expiresIn: '24h'})
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.babRequest("неккоректный email или password"))
        }
        const candidate = User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.babRequest("пользавотель с таким email уже существует"))
        }
        const hashPassword = bcrypt.hash(password, 4)
        const user = await User.create({
            email, role, password: hashPassword
        })
        const cart = Cart.create({userId: user.id})
        const token = generateToken(user.id, email, role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = User.findOne({where:{email}})
        if(user){
            let comparePassword = bcrypt.compareSync(password, user.password)
            if(comparePassword) {
                const token = generateToken(user.id, email, user.role)
                return res.json({token})
            } else {
                return next(ApiError.babRequest("неверный login или password"))
            }
        } else {
            return next(ApiError.babRequest("неверный login или password"))
        }
    }

    async check(req, res, next) {
        const token =generateToken(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()