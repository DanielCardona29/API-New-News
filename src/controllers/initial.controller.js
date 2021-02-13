class initial {
    constructor(){}
    
    //En esta funcion controlamos nuestro primer 
    info(req, res, next) {
        res.json({
            name: 'New News API',
            description: 'API para el control de contenidos de la app web new news',
            author: 'Daniel Cardona Calderon',
            version: '1.0.0'
        });
    }

    //Esta ruta da la bienvenida
    welcome(req, res, next) {
        res.send('Bienvenido')
    }
}

module.exports = initial;