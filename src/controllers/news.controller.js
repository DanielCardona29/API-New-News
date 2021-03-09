const User = require('../models/User.js')
const News = require('../models/News.js')
const ErrorController = require('./error.controller')
const Main = require('./main.controller')
const unique = require('uniqid')

const _ErrorController = new ErrorController();
const _Main = new Main();

class NewsController {
    constructor() {
    };
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
            const news = await News.findById(id)
                .populate('userid', { pass: 0 })
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
                views: news.viwes,

                coments: {
                    count: news.coments.length,
                    content: news.coments,
                },
                create_date: news.createdAt,
                update_date: news.updatedAt,
                isPublic: news.isPublic,
                likes: {
                    isUserLike: _Main.finder(news.likes.userslist, req.userid),
                    count: news.likes.userslist.length,
                    userslist: [
                        ...news.likes.userslist
                    ]
                },
                dislikes: {
                    isUserLike: _Main.finder(news.dislikes.userslist, req.userid),
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
            views: 0,
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

    //Esta funcion publicamos  una noticia
    async publisher(req, res, next) {
        const {

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
            if (!compareID) {
                return _ErrorController.NewsErrorsResponse(res, 3008)
            }
        } catch (error) {
            return _ErrorController.NewsErrorsResponse(res, 'default')

        }


        //Guardamos la noticia
        try {
            const updatedNew = {
                isPublic: true,
            }
            const SavedNew = await News.findByIdAndUpdate(newID, updatedNew);

            return res.status(200).json({ value: true, ID: newID, response: SavedNew });
        } catch (error) {
            return _ErrorController.NewsErrorsResponse(res, 3003)
        }
    }

    //Esta funcion despublicamos una noticia
    async dispublisher(req, res, next) {
        const {
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
            if (!compareID) {
                return _ErrorController.NewsErrorsResponse(res, 3008)
            }
        } catch (error) {
            return _ErrorController.NewsErrorsResponse(res, 'default')

        }


        //Guardamos la noticia
        try {
            const updatedNew = {
                isPublic: false,
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
                if (!compareID) {
                    return _ErrorController.NewsErrorsResponse(res, 3008)
                }
            } catch (error) {
                return _ErrorController.NewsErrorsResponse(res, 'default')

            }

            //Eliminamos la noticia
            await News.findByIdAndDelete(id)
                .then(value => {
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

    //Esta funcion controla si el usuario esta enviando un like o un dislike
    async likeDislikeController(req, res, next) {
        try {
            //Extraemos la info de la noticia
            const {
                id,
                isLiking,
                isDisliking
            } = req.body;

            //Comprobar si tenemos el id de la noticia
            if (!id) {
                return _ErrorController.NewsErrorsResponse(res, 3004)
            }
            //Buscamos la noticia que queremos 
            let findNew = await News.findById(id);

            //Si estamos dando like verificamos que el usurio no tenga uun dislike
            if (isLiking) {
                let dislikes = findNew.dislikes.userslist;
                const index = dislikes.indexOf(req.userid);
                //--//
                if (index !== -1) {
                    //--//
                    const consulta = await _Main.dislikes(req, res, next);
                    //--//
                    if (!consulta.value) {
                        //--//
                        return res.status(204).json({ value: false });
                        //--//
                    }
                    //--//
                }
                //--//
                const consult = _Main.like(req, res, next);
                const response = await consult;
                //Enviamos nuestra respuesta
                if (response.value) {
                    return res.status(200).json({ value: true, isLiked: response.isLiked, isDisliked: false });
                } else {
                    return _ErrorController.NewsErrorsResponse(res, 'default')
                }
            }


            //Si estamos enviando un dislike
            if (isDisliking) {
                let likes = findNew.likes.userslist;
                const index = likes.indexOf(req.userid);
                ///--///
                if (index !== -1) {
                    const consulta = await _Main.like(req, res, next);
                    ///--///
                    if (!consulta.value) {
                        return res.status(204).json({ value: false });
                    }
                    ///--///
                }
                ///--///
                const consult = _Main.dislikes(req, res, next);
                const response = await consult;
                //Enviamos nuestra respuesta
                if (response.value) {
                    return res.status(200).json({ value: true, isLiked: false, isDisliked: response.isDisliked });
                } else {
                    return _ErrorController.NewsErrorsResponse(res, 'default')
                }
            }

        } catch (error) {
            console.log(error);
            return _ErrorController.NewsErrorsResponse(res, 'default')
        }
    }

    //Crear un comentario en una noticia 
    async comment(req, res, next) {
        //Guardamos la noticia
        try {
            const {
                content,
                newID
            } = req.body;
            //Comprobar si tenemos el contenido
            if (!content) {
                return _ErrorController.NewsErrorsResponse(res, 3000)
            }
            //Verificamos si tenemos el id de la noticia
            if (!newID) {
                return _ErrorController.NewsErrorsResponse(res, 3004)
            }

            //Buscamos si nuestra noticia existe en la base de datos y comparamos el id del Usuario
            let findNew = await News.findById(newID);
            //Comparamos el id que recibimos por el que tiene nuestra noticia
            const compareID = _Main.compare(findNew.userid, req.userid);
            if (!compareID) {
                return _ErrorController.NewsErrorsResponse(res, 3008)
            }
            const updatedNew = {
                coments: [
                    ...findNew.coments,
                    {
                        likes: {
                            userslist: [

                            ]
                        },
                        _id: unique(),
                        content,
                        userid: req.userid
                    }]

            }
            await News.findByIdAndUpdate(newID, updatedNew);
            findNew = await News.findById(newID);
            return res.status(200).json({ value: true, ID: newID, response: findNew });
        } catch (error) {
            console.log(error);
            return _ErrorController.NewsErrorsResponse(res, 3003)
        }
    }

    //Find all news
    async allFind(req, res, next) {
        //Controlamos el error que hacemos 
        try {
            //Si tenemos el id los buscamos en la base de datos
            const news = await News.find({
                isPublic: true
            })
                .populate('userid', { pass: 0 })
            if (!news) {
                return _ErrorController.NewsErrorsResponse(res, 3005);
            }

            //Enviamos nuestra noticia
            return res.status(200).json({
                news
            });

        } catch (error) {
            console.log(error);
            return _ErrorController.NewsErrorsResponse(res, 'default');
        }
    }


    //Enviar los views 
    async view(req, res, next) {
        const { newID } = req.body
        //Verificamos que el usuario sea el que escribió la noticia para guardarlo
        try {
            //Buscamos si nuestra noticia existe en la base de datos y comparamos el id del Usuario
            const findNew = await News.findById(newID)
            //Comparamos el id que recibimos por el que tiene nuestra noticia
            const updatedNew = {
                views: findNew.views + 1
            }
            await News.findByIdAndUpdate(newID, updatedNew);
            return res.status(200).json({ value: true });
        } catch (error) {
            return _ErrorController.NewsErrorsResponse(res, 3003)
        }
    }
}




module.exports = NewsController