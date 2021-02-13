//Importamos la libreria del token
import jwt from 'jsonwebtoken'
//Importamos nuestro config
import config from '../config.js';

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
}

export default TokenController;