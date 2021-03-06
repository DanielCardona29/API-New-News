//Importamos el modulo del Router de expres
const { Router } = require('express')
//Validadores
const { body, validationResult } = require('express-validator')

//Importamos el controlador de los usuarios
const UserController = require('../controllers/user.controller')
const TokenController = require('../controllers/token.controller')
//Importamos el controlador de los usuarios
const AuthController = require('../controllers/auth.controller')
const ErrorController = require('../controllers/error.controller')

const _UserController = new UserController();
const _TokenController = new TokenController();
const _ErrorController = new ErrorController();






//Iniciamos el Router
const router = Router();

//Obtener la informacion de un usuario
router.get('/', [_TokenController.verifyToken], _UserController.findUserByID);

//Actualizar la informacion de un avatar
router.post('/avatar', [_TokenController.verifyToken], _UserController.avatar);

//Actualizar la contraseña
router.post('/changepass',
    body('newpass').isLength({ min: 5 }),
    [
        _TokenController.verifyToken,
        _ErrorController.ParamError,
    ],
    _UserController.passChanger)

router.get('/news',
    [
        _TokenController.verifyToken,
    ],
    _UserController.findUserNews)
module.exports = router;