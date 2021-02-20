//Importamos el modulo del Router de expres
import { Router } from 'express';

//Importamos el controlador de los usuarios
import UserController from '../controllers/user.controller';
import TokenController from '../controllers/token.controller';
import NewsController from '../controllers/news.controller';

const _NewsController = new NewsController();
const _TokenController = new TokenController();

//Iniciamos el Router
const router = Router();

//Obtener la informacion de una noticia de la base de ddatos
router.get('/?:id', [_TokenController.verifyToken], _NewsController.Find);

//Crear una noticia
router.post('/create', [_TokenController.verifyToken], _NewsController.create);

//Editar una noticia
router.post('/update', [_TokenController.verifyToken], _NewsController.update);

//Publicar una noticia
router.post('/public', [_TokenController.verifyToken], _NewsController.publisher);

//Eliminar una noticia
router.delete('/delete/?:id', [_TokenController.verifyToken], _NewsController.delete);


export default router;