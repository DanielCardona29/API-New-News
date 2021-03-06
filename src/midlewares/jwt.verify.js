//Importamos el jwt
const jwt = require('jsonwebtoken')
const config = require('../config.js')
const User = require('../models/User.js')
const Role = require('../models/Role.js')


//Aqui se valida si el token es valido
export const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    //Validamos la cabezera

    if (!token) {
        return res.status(403).json({
            message: 'No token provided'
        })
    }
    //Ahora decodificamos el token
    try {
        //Verificamos el Token 
        const decode = jwt.verify(token, config.secret);
        //Guardamos el id del usuario en la cabezera
        req.userid = decode.id;
        //Buscamos el id ne l abase de datos
        const user = await User.findById(req.userid, { pass: 0 });
        //Si el id no existe reentornammos
        if (!user) return res.status(404).json({ message: 'no user found' })
        //Si todo esta correcto continuamos
        next();
    } catch (error) {
        //Si el token no existe reentornnamos el error
        return res.status(500).json({
            message: 'token invalido'
        });
    }

};

//Aqui validamos si el usuario es un moderador
export const isModerator = async (req, res, next) => {
    //Controlamos un posible error
    try {
        //Guardamos el id del usuario en una constante
        const id = req.userid;
        //Buscamos el usuario en la base de datos
        const user = await User.findById(id);
        //Ahora buscamos todos los roles que tiene el usauri
        const roles = await Role.find({
            _id: { $in: user.roles }
        });
        //Buscamos el rol del moderador en el arreglo
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
                next();
                return;
            }
        }
        //Si no encontramos el rol entonces reenetornamos al usuario;
        return res.status(403).json('require moderador');
    } catch (error) {
        //Si hay un error buscado el error enviamos el error al front;
        return res.status(500).json('Serching moderator role error');
    }
};



//Aqui validamos si el usuario es un moderador
export const isAdmin = async (req, res, next) => {
    //Controlamos un posible error
    try {
        //Guardamos el id del usuario en una constante
        const id = req.userid;
        //Buscamos el usuario en la base de datos
        const user = await User.findById(id);
        //Ahora buscamos todos los roles que tiene el usauri
        const roles = await Role.find({
            _id: { $in: user.roles }
        });
        //Buscamos el rol del moderador en el arreglo
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                next();
                return;
            }
        }
        //Si no encontramos el rol entonces reenetornamos al usuario;
        return res.status(403).json('require admin');
    } catch (error) {
        //Si hay un error buscado el error enviamos el error al front;
        return res.status(500).json('Serching moderator role error');
    }
};