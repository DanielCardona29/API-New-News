//Importamos el modulo del Router de expres
import { Router } from 'express';

//Importamos el controlador de los usuarios
import AuthController  from '../controllers/auth.controller';

const _AuthController = new AuthController();

//Iniciamos el Router
const router = Router();

//Iniciar sesion
router.post('/signin', _AuthController.signIn)

//Registrarse 
router.post('/signup', _AuthController.signUp)


export default router;