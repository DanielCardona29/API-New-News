//Importamos la libreria del token
const jwt = require('jsonwebtoken');
//Importamos nuestro config
const config = require('../config.js');
const User = require('../models/User');
const ErrorController = require('./error.controller');

const _ErrorController = new ErrorController();

class TokenController {
    constructor() {
        this.jwt = jwt;
    }

    //Con este atributo de la clase Token creamos uno que expira
    async createToken(id) {
        //Creamos un token
        const token = await this.jwt.sign({ id: id }, config.secret, {
            //Nuestro token expira en 24 horas
            expiresIn: 60 * 60 * 24, //24 horas
        });
        return token;
    }

    //Con este token creamos uno que  no expira
    async NoExpireCreateToken(id) {
        //Creamos un token
        const token = await jwt.sign({ id: id }, config.secret);
        return token;
    }

    //Verificamos el token
    async verifyToken(req, res, next) {
        const token = req.headers['x-access-token'];
        //Validamos la cabezera
        if (!token) {
            return _ErrorController.TokenValidationResponse(res, 2001)
        }
        //Ahora decodificamos el token
        try {
            //Verificamos el Token 
            const decode = jwt.verify(token, config.secret);
            //Guardamos el id del usuario en la cabezera
            req.userid = decode.id;
            //Buscamos el id ne la abase de datos
            const user = await User.findById(req.userid, { pass: 0 });
            //Si el id no existe reentornammos
            if (!user) { return _ErrorController.AuthErrorResponse(res, 1001) }
            //Si todo esta correcto continuamos
            next();
        } catch (error) {
            //Si el token no existe reentornnamos el error
            return _ErrorController.TokenValidationResponse(res, 2000)
        }
    };

}

module.exports = TokenController;