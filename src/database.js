//Conectamos a la base de datos
import mongoose from 'mongoose';


mongoose.connect("mongodb://localhost/companydb", {
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