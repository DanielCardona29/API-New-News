import User from '../models/User';
//Importamos la libreria del token
import jwt from 'jsonwebtoken'
//Importamos nuestro config
import config from '../config.js';
//Importamos el modelo de los roles
import Role from '../models/Role.js';

// Clase para inciar sesion
class Auth {
    constructor() {};
    //vlaidar que el usuairo exista en la base de datos
    async userFounder(name) {
        const userFound = await User.findOne({ name: name }).populate("roles");
        return userFound;
    };

    // Validamos que el correo no exista en la base de datos
    async emailFoudnder(email) {
        const userFound = await User.findOne({ email: email });
        if (!userFound) {
            return false;
        } else {
            return true;
        }
    }

    //Creador de token
    async tokenCreator(id) {
        //Creamos un token
        const token = await jwt.sign({ id: id }, config.secret, {
            expiresIn: 60 * 60 * 24, //24 horas
        });
        return token;
    };

    //Inciar sesion
    async signIN(req, res) {
        const { name, pass } = req.body;
        //Validamos que recibimos los datos
        if (name, pass) {
            const userFound = await this.userFounder(name);
            //Primero validamos el que usuairo no exista en la base de datos
            if (!userFound) {
                return res.status(400).json('Not found user')
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
                    const _token = await this.tokenCreator(userFound._id);
                    //Enviamos al usuario
                    return res.status(201).json({ value: true, _token });
                };

            };
        } else {
            res.status(400).send('no data')
        };

    };

    //Iniciar Sesion
    async signUP(req, res) {
        const { name, email, pass, roles } = req.body;
        //Creamos el usuairo en el Schema
        const NewUser = new User({
            name,
            email,
            pass: await User.cryptPass(pass)
        });

        //Verficamos los roles 
        if (roles) {
            //Buscamos los roles que recibimos del usuario
            // en la base de datos
            const foundRole = await Role.find({
                name: { $in: roles }
            });
            NewUser.roles = foundRole.map(role => role.id);

        } else {
            const role = await Role.findOne({
                name: "user"
            });

            NewUser.roles = [role._id];
        }

        try {
            //guarnamos nuestro nuevo usuario
            const SavedUser = await NewUser.save();

            // Creamos el token del usuario
            const _token = await this.tokenCreator(SavedUser.id);

            //Enviamos el token al usuario
            res.status(200).json({ value: true, _token });
        } catch (error) {
            res.status(500).json('internal error');

        }


    };

};

export default Auth;