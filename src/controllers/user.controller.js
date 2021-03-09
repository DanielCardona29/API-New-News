const User = require('../models/User.js')
const Role = require('../models/Role.js')
const News = require('../models/News')
const ErrorController = require('./error.controller')

const _ErrorController = new ErrorController();

class UserController {
    constructor() { };

    //Extraemos Toda la lista de usuarios que tenemos 
    async findUsersList(req, res) {
        const users = await User.find({ name: { $type: 2 } }, { pass: 0, id: 0, createdAt: 0, updatedAt: 0 }).populate('roles', { _id: 0 });
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
            const userFound = await User.findOne({ _id: req.userid }, { pass: 0, _id: 0 }).populate("roles");
            if (!userFound) {
                return _ErrorController.AuthErrorResponse(res, 1001)
            }
            return res.status(200).json({ result: userFound });
        } catch (error) {
            return _ErrorController.AuthErrorResponse(res, 'default')
        }
    };

    //Encontrar todas las noticias que ha escrito un usario
    async findUserNews(req, res, next) {
        try {
            const Newsfound = await News.find({ userid: req.userid });
            if (!Newsfound) {
                return _ErrorController.UserErrorController(res, 4003);
            }
            return res.status(200).json(Newsfound)
        } catch (error) {
            return _ErrorController.AuthErrorResponse(res, 'default')

        }
    }

    //Actualizar el avatar de un usuario
    async avatar(req, res, next) {
        try {

            const {
                avatar
            } = req.body;


            //Error al no tenen un avatar
            if (!avatar) {
                return _ErrorController.UserErrorController(res, 4001);
            }
            //Buscamos el usuario en la base de datos y lo actualizamos
            await User.findByIdAndUpdate(req.userid, { avatar: avatar });
            const user = await User.findById(req.userid)
            return res.status(200).json({ value: true, user });
        } catch (error) {
            return _ErrorController.UserErrorsResponse(res, 3003)
        }
    }

    //Actualizar la contraseña
    async passChanger(req, res, next) {
        try {
            //Capturamos los datos
            const {
                newpass
            } = req.body;
            //Si tenemos la nueva contraseña

            if (!newpass) {
                return _ErrorController.UserErrorController(res, 4002);

            }

            //Enpriptamos la contraseña
            const Crypted_Pass = await User.cryptPass(newpass)
            //Buscamos el usuario en la base de datos y lo actualizamos
            const user = await User.findByIdAndUpdate(req.userid, { pass: Crypted_Pass });
            return res.status(200).json({ value: true, user });
        } catch (error) {
            return _ErrorController.UserErrorController(res, 3003)
        }
    }

}

module.exports = UserController