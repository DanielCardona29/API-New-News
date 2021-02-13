import User from '../models/User';
//Importamos el modelo de los roles
import Role from '../models/Role.js';

//Importamos nuestros controladores
import UserController from './user.controller'
import TokenController from './token.controller'
import ErrorController from './error.controller'

//
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
                console.log('hola');
                return _ErrorController.ErrorResponse(res, 1001);
            } else {

                //Comparamos las contraseñas 
                const machPass = await User.compareCryptPass(pass, userFound.pass);
                if (!machPass) {
                    //Si la contraseña no coincide envimaos un error
                    return res.status(401).json({
                        message: 'no pass valid',
                        _token: null
                    });
                } else {
                    //1. Creamos el token
                    console.log(userFound._id);
                    const _token = await _TokenController.createToken(userFound._id);
                    //Enviamos al usuario
                    return res.status(201).json({ value: true, _token });
                };

            };
        } else {
            res.status(406).json({ message: 'no data', value: false })
        };

    };

    //Iniciar Sesion
    async signUp(req, res) {
        const { user, email, pass, roles } = req.body;

        //Primero verificamos los datos que recibimos los datos necesarios
        if (!user, !email, !pass) {
            return res.status(406).json({ message: 'no data', value: false })
        }
        //Verificamos si nuestro usuario existe en la base de datos

        const _userFounder = await _UserController.userFounder(user);
        console.log(_userFounder);
        if (_userFounder) {
            return res.status(406).json({ message: 'El usuario se encuentra registrado en la base de datos' })
        }
        //Creamos el usuairo en el Schema
        const NewUser = new User({
            user,
            email,
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
                return res.status(500).json({ message: 'No rol found', value: false });
            }

        } else {
            try {
                const role = await Role.findOne({ name: 'user' });
                NewUser.roles = [role._id];
            } catch (error) {
                return res.status(500).json({ message: `Error desconocido intente nueva mente ${error.code}` })
            }
        }
        //Capturamos nuestros casos de error

        try {
            //guardamos nuestro nuevo usuario
            const SavedUser = await NewUser.save();
            // Creamos el token del usuario
            const _token = await this.tokenCreator(SavedUser.id);
            //Enviamos el token al usuario
            res.status(200).json({ value: true, _token });
        } catch (error) {
            res.status(500).json({ message: `Error al crear usuario ${error.code}`, value: false });
        }
    };

};

export default AuthController;