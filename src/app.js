// babel convierte el codigo de js moderno a codigo soportado por node
import express from 'express';
//importamos el middlawere de morgan
import morgan from 'morgan';
//Importamos el pakage json
import pkg from '../package.json';

//Importamos las rutas de los Usuarios}
import AuthRoute from './routes/auth.routes';

//Importamos el creador de roles 
import {
    createRoles
} from './libs/roles.libs';
//Iniciamos express
const app = express();
createRoles();

//Asignamos el pkg a una variable
app.set('pkg', pkg);

//usamor morgan middlawere para controlar nuestra aplicacion
app.use(morgan('dev'));

//Usamos el middlawere de express apara que entienda los datos en JSON
app.use(express.json())

//creamos que muestras  la informacion del proyecto
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        description: app.get('pkg').description,
        author: app.get('pkg').author,
        version: app.get('pkg').version
    });
});

//Usamos las rutas para utentificar los usuarios
app.use('/auth', AuthRoute);

//Aprender Express Validations
export default app;