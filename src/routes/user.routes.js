//Importamos el modulo del Router de expres
import { Router } from 'express';

//Importamos el controlador de los usuarios
import user_Controller from '../controllers/user.controller';


const user_ControllerVar = new user_Controller();

//Iniciamos el Router
const router = Router();

//Crear un usuario
router.get('/', user_ControllerVar.findUsersList)

export default router;