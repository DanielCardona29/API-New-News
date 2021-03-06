const User = require('../models/User')
//Importamos el modelo de los roles
const Role = require('../models/Role.js')

//Importamos nuestros controladores
const UserController = require('./user.controller')
const TokenController = require('./token.controller')
const ErrorController = require('./error.controller')

const _UserController = new UserController();
const _TokenController = new TokenController();
const _ErrorController = new ErrorController();

//Esta Clase se ejecuta para validar nuestros inicios de sesion
class AuthController {

    //Inciar sesion
    async signIn(req, res) {
        const { user, pass } = req.body;
        //Validamos que recibimos los datos
        if (user, pass) {
            const userFound = await _UserController.userFounder(user);
            //Primero validamos el que usuairo no exista en la base de datos
            if (!userFound) {
                return _ErrorController.AuthErrorResponse(res, 1001);
            } else {

                //Comparamos las contraseñas 
                const machPass = await User.compareCryptPass(pass, userFound.pass);
                if (!machPass) {
                    //Si la contraseña no coincide envimaos un error
                    return _ErrorController.AuthErrorResponse(res, 1002);
                } else {
                    //Creamos el token
                    const _token = await _TokenController.createToken(userFound._id);

                    //Enviamos al usuario
                    return res.status(201).json({ value: true, _token });
                };

            };
        } else {
            return _ErrorController.AuthErrorResponse(res, 1003)
        };

    };

    //Registrarse
    async signUp(req, res) {
        const { user, email, pass, roles } = req.body;
        //Primero verificamos los datos que recibimos los datos necesarios
        if (!user || !email || !pass) {
            return _ErrorController.AuthErrorResponse(res, 1003)
        }

        //Verificamos si nuestro usuario existe en la base de datos
        const _userFounder = await _UserController.userFounder(user);

        if (_userFounder) {
            return _ErrorController.AuthErrorResponseSignup(res, 1004);
        }

        //Verificamos si el correo existe en la base de datos
        const _emialFounder = await _UserController.emailVerify(email);
        if (_emialFounder) {
            return _ErrorController.AuthErrorResponseSignup(res, 1005);
        }

        //Creamos el usuairo en el Schema
        const NewUser = new User({
            user,
            email,
            avatar: 'https://censur.es/wp-content/uploads/2019/03/default-avatar.png',
            pass: await User.cryptPass(pass)
        });

        //Verficamos los roles 
        if (roles) {

            try {
                //Buscamos los roles que recibimos del usuario
                // en la base de datos
                const foundRole = await Role.find({
                    user: { $in: roles }
                });
                NewUser.roles = foundRole.map(role => role.id);

            } catch (error) {
                return _ErrorController.AuthErrorResponseSignup(res, 1006);
            }

        } else {
            try {
                const role = await Role.findOne({ name: 'user' });
                NewUser.roles = [role._id];
            } catch (error) {

                return _ErrorController.AuthErrorResponse(res, 'default');

            }
        }

        //Capturamos nuestros casos de error
        try {
            //guardamos nuestro nuevo usuario
            const SavedUser = await NewUser.save();
            // Creamos el token del usuario
            const _token = await _TokenController.createToken(SavedUser.id);
            //Enviamos el token al usuario
            res.status(201).json({ value: true, _token });

        } catch (error) {
            console.log(error);
            return _ErrorController.AuthErrorResponseSignup(res, 1007)
        }
    };

};

module.exports = AuthController;