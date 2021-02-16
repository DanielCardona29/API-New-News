import User from '../models/User.js';
import Role from '../models/Role.js';

import ErrorController from './error.controller';

const _ErrorController = new ErrorController();

export default class UserController {
    constructor() { };

    //Extraemos Toda la lista de usuarios que tenemos 
    async findUsersList(req, res) {
        const users = await User.find({ name: { $type: 2 } }, { pass: 0, id: 0, createdAt: 0, updatedAt: 0 }).populate('roles', { _id: 0 });
        console.log(users);
        res.status(200).json(users)
    }
    //validar que un nombre de usuario exista en las bases de datos
    async userFounder(user) {
        const userFound = await User.findOne({ user: user }).populate("roles");
        return userFound;
    };

    //Validar que un correo exista en las base de datos
    async emailVerify(email) {
        const _email = await User.findOne({ email: email });
        if (!_email) {
            return false;
        } else {
            return true;
        }
    }

    //Encontrar un usuario por id
    async findUserByID(req, res, next) {
        try {
            console.log(req.userid);
            const userFound = await User.findOne({ _id: req.userid }, {pass: 0, _id: 0}).populate("roles");
            if (!userFound) {
                return _ErrorController.AuthErrorResponse(res, 1001)
            }
            return res.status(200).json({ result: userFound });
        } catch (error) {
            return _ErrorController.AuthErrorResponse(res, 'default')
        }
    };
}