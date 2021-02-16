//Importamos el modulo del Router de expres
import { Router } from 'express';

//Importamos el controlador de los usuarios
import UserController from '../controllers/user.controller';
import TokenController from '../controllers/token.controller';


const _UserController = new UserController();
const _TokenController = new TokenController();

//Iniciamos el Router
const router = Router();

//Obtener la informacion de un usuario
router.get('/', [_TokenController.verifyToken], _UserController.findUserByID)

export default router;