//Importamos el modulo del Router de expres
import { Router } from 'express';
//Validadores
import { body, validationResult } from 'express-validator';

//Importamos el controlador de los usuarios
import AuthController from '../controllers/auth.controller';
import ErrorController from '../controllers/error.controller';
import TokenController from '../controllers/token.controller';

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

export default router;