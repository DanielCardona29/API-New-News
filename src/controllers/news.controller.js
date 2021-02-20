import User from '../models/User.js';
import News from '../models/News.js';
import ErrorController from './error.controller';
import Main from './main.controller';

const _ErrorController = new ErrorController();
const _Main = new Main();

export default class NewsController {
    constructor() { };
    //Esta funcion extrae la informacion de una noticia
    async Find(req, res, next) {
        //Controlamos el error que hacemos 
        try {
            //Sacamos el id de los parametros
            const { id } = req.params;
            //Si no hay id enviamos el error
            if (!id) {
                return _ErrorController.NewsErrorsResponse(res, 3004);
            }

            //Si tenemos el id los buscamos en la base de datos
            const news = await News.findById(id);
            if (!news) {
                return _ErrorController.NewsErrorsResponse(res, 3005);
            }

            const response = {
                _id: news._id,
                content: news.content,
                title: news.title,
                img: news.img,
                aling: news.aling,
                userid: news.userid,
                viwes: news.viwes,
                coments: {
                    count: news.coments.length,
                    content: news.coments,
                },
                create_date: news.createdAt,
                update_date: news.updatedAt,
                isPublic: news.isPublic,
                likes: {
                    count: news.likes.userslist.length,
                    userslist: [
                        ...news.likes.userslist
                    ]
                },
                dislikes: {
                    count: news.dislikes.userslist.length,
                    userslist: [
                        ...news.dislikes.userslist
                    ]
                }
            }

            //Enviamos nuestra noticia
            return res.status(200).json({
                response
            });

        } catch (error) {
            console.log(error);
            return _ErrorController.NewsErrorsResponse(res, 'default');
        }
    }

    //Esta funcion crea una nueva noticia
    async create(req, res, next) {
        const {
            content,
            img,
            title,
            aling,

        } = req.body;
        //Comprobar si tenemos el contenido
        if (!content) {
            return _ErrorController.NewsErrorsResponse(res, 3000)
        }
        //Comprobar si tenemos el titulo
        if (!title) {
            return _ErrorController.NewsErrorsResponse(res, 3001)
        }
        //Creamo el objeto que vamos a guardar
        const NewObject = new News({
            content,
            viwes: 0,
            title,
            img: img || 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
            aling: aling || 'center',
            isPublic: false,
            userid: req.userid,
        });

        //Guardamos la noticia
        try {
            const SavedNew = await NewObject.save();
            const newID = SavedNew.id;
            return res.status(200).json({ value: true, ID: newID })
        } catch (error) {
            return _ErrorController.NewsErrorsResponse(res, 3003)
        }
    }

    //Esta funcion actualiza la información de una noticia
    async update(req, res, next) {
        const {
            content,
            img,
            title,
            aling,
            isPublic,
            newID
        } = req.body;
        //Comprobar si tenemos el contenido
        if (!content) {
            return _ErrorController.NewsErrorsResponse(res, 3000)
        }
        //Comprobar si tenemos el titulo
        if (!title) {
            return _ErrorController.NewsErrorsResponse(res, 3001)
        }



        //Verificamos que el usuario sea el que escribió la noticia para guardarlo
        try {
            //Buscamos si nuestra noticia existe en la base de datos y comparamos el id del Usuario
            const findNew = await News.findById(newID)
            //Comparamos el id que recibimos por el que tiene nuestra noticia
            const compareID = _Main.compare(findNew.userid, req.userid);
            console.log(compareID);
            if (!compareID) {
                return _ErrorController.NewsErrorsResponse(res, 3008)
            }
        } catch (error) {
            return _ErrorController.NewsErrorsResponse(res, 'default')

        }

        //Guardamos la noticia
        try {
            const updatedNew = {
                content,
                title,
                img,
                aling,
                isPublic,
            }
            const SavedNew = await News.findByIdAndUpdate(newID, updatedNew);
            return res.status(200).json({ value: true, ID: newID, response: SavedNew });
        } catch (error) {
            return _ErrorController.NewsErrorsResponse(res, 3003)
        }
    }

    //Esta funcion actualiza la información de una noticia
    async publisher(req, res, next) {
        const {
            isPublic,
            newID
        } = req.body;

        //Comprobar si tenemos el titulo
        if (!newID) {
            return _ErrorController.NewsErrorsResponse(res, 3004)
        }

        //Verificamos que el usuario sea el que escribió la noticia para guardarlo
        try {
            //Buscamos si nuestra noticia existe en la base de datos y comparamos el id del Usuario
            const findNew = await News.findById(newID)
            //Comparamos el id que recibimos por el que tiene nuestra noticia
            const compareID = _Main.compare(findNew.userid, req.userid);
            console.log(compareID);
            if (!compareID) {
                return _ErrorController.NewsErrorsResponse(res, 3008)
            }
        } catch (error) {
            return _ErrorController.NewsErrorsResponse(res, 'default')

        }


        //Guardamos la noticia
        try {
            const updatedNew = {
                isPublic: isPublic,
            }
            const SavedNew = await News.findByIdAndUpdate(newID, updatedNew);

            return res.status(200).json({ value: true, ID: newID, response: SavedNew });
        } catch (error) {
            return _ErrorController.NewsErrorsResponse(res, 3003)
        }
    }

    //Con esta función se elimina una noticia
    async delete(req, res, next) {
        //Controlamos el error que hacemos 
        try {
            //Sacamos el id de los parametros
            const { id } = req.params;
            //Si no hay id enviamos el error
            if (!id) {
                return _ErrorController.NewsErrorsResponse(res, 3004);
            }
            try {
                //Buscamos la noticia que queremos eliminar
                const findNew = await News.findById(id);
                if (!findNew) {
                    return _ErrorController.NewsErrorsResponse(res, 3005);
                }
                const compareID = _Main.compare(findNew.userid, req.userid);
                console.log(compareID);
                if (!compareID) {
                    return _ErrorController.NewsErrorsResponse(res, 3008)
                }
            } catch (error) {
                return _ErrorController.NewsErrorsResponse(res, 'default')

            }

            //Eliminamos la noticia
            await News.findByIdAndDelete(id)
                .then(value => {
                    console.log(`Se ha eliminado la noticia ${id} de manera satifactoria`);
                    return res.status(200).json({
                        message: `Se ha eliminado satisfactoriamente la noticia`,
                        value: true
                    });
                })

        } catch (error) {
            console.log(error);
            return _ErrorController.NewsErrorsResponse(res, 'default');
        }
    }

}


