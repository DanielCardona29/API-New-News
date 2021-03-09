//Importamos el modulo del Router de expres
const { Router } = require('express')

//Importamos el controlador de los usuarios
const UserController = require('../controllers/user.controller')
const TokenController = require('../controllers/token.controller')
const NewsController = require('../controllers/news.controller')

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

//dDespublicar
router.post('/dispublic', [_TokenController.verifyToken], _NewsController.dispublisher);

//Eliminar una noticia
router.delete('/delete/?:id', [_TokenController.verifyToken], _NewsController.delete);

//Enviar un dislike a una noticia
router.post('/liker', [_TokenController.verifyToken], _NewsController.likeDislikeController);

//Crear un comentario
router.post('/comment', [_TokenController.verifyToken], _NewsController.comment);

//Encontrar todas las noticias publicas
router.get('/', [_TokenController.verifyToken], _NewsController.allFind);

//Encontrar todas las noticias publicas
router.post('/view', [_TokenController.verifyToken], _NewsController.view);


module.exports = router;