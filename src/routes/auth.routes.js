//Importamos el modulo del Router de expres
const { Router } = require('express');
//Validadores
const { body, validationResult } = require('express-validator');
//Importamos el controlador de los usuarios
const AuthController = require('../controllers/auth.controller');
const ErrorController = require('../controllers/error.controller');
const TokenController = require('../controllers/token.controller');

const _TokenController = new TokenController();
const _ErrorController = new ErrorController();
const _AuthController = new AuthController();

//Iniciamos el Router
const router = Router();

//Iniciar sesion
router.post('/signin', _AuthController.signIn)

//Registrarse 
router.post('/signup',
    body('email').isEmail(),
    body('pass').isLength({ min: 5 }),
    _ErrorController.ParamError,
    _AuthController.signUp);

router.post('/tokenValidation', _TokenController.verifyToken, (req, res) => {
    return res.status(200).json({ value: true })
})

module.exports = router;