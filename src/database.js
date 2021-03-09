//Conectamos a la base de datos
const dontenv = require('dotenv')
dontenv.config()
const mongoose = require('mongoose')
const CONNECTION_STRING = process.env.CONNECTION_STRING
const connection = mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // para solucionar el error de "DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead."
    //Iniciamos el UseCreateIndex En verdadero
    useCreateIndex: true,
    //Para solucionar el error del findAndModify() function se setea el estado de esas funciones en falso
    useFindAndModify: false
})
    .then(value => {
        console.log('Base de datos conectada');
    })
    .catch(err => {
        console.log(`Error al conectar la base de datos: ${err}`);
    });

module.exports = connection;