import News from '../models/News.js';
import User from '../models/User.js';

class Main {
    //Coparador de elementos
    compare(el1, el2) {
        if (el1 == el2) {
            return true;
        } else {
            return false;
        }
    }

    //Transformamos la identidad de nuestro identity para saber si
    //se agrego a la base de datos o se elimino
    transform(identity) {
        if (typeof identity === 'number') {
            return true;
        } else {
            return false;
        }
    }

    //Esta funcion envia un like a la noticia
    async like(req, res, next) {
        const { id } = req.body;
        console.log(`este es el like id MainController linea 18 ${id}`);
        //Comprobar si tenemos el id de la noticia
        if (!id) {
            return false;
        }

        //Buscamos si nuestra noticia existe en la base de datos y comparamos el id del Usuario
        let findNew = await News.findById(id);

        //Guardamos la noticia
        try {
            let likes = findNew.likes.userslist;
            const index = likes.indexOf(req.userid)
            let identity;
            if (index === -1) {
                identity = likes.push(req.userid);
            } else {
                identity = likes.splice(index, 1);
            }
            const update = {
                likes: {
                    userslist: [
                        ...likes
                    ]
                }
            }

            const SavedNew = await News.findByIdAndUpdate(id, update);
            return { value: true, isLiked: this.transform(identity) };
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    //Esta funcion envia un dislikes a la noticia
    async dislikes(req, res, next) {
        const { id } = req.body;
        console.log(`este es el dislikes id MainController linea 18 ${id}`);
        //Comprobar si tenemos el id de la noticia
        if (!id) {
            return false;
        }

        //Buscamos si nuestra noticia existe en la base de datos y comparamos el id del Usuario
        let findNew = await News.findById(id);

        //Guardamos la noticia
        try {
            let dislikes = findNew.dislikes.userslist;
            const index = dislikes.indexOf(req.userid)
            let identity;
            if (index === -1) {
                identity = dislikes.push(req.userid);
            } else {
                identity = dislikes.splice(index, 1);
            }
            const update = {
                dislikes: {
                    userslist: [
                        ...dislikes
                    ]
                }
            }

            const SavedNew = await News.findByIdAndUpdate(id, update);
            return { value: true, isDisliked: this.transform(identity) };
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    //Encontrar si el usuario se encuentra en un array
    finder(array, id) {
        const find = array.indexOf(id);
        if (find === -1) {
            return false;
        } else {
            return true
        }

    }
}


export default Main;