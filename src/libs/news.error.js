module.exports = NewsErrorList = {
    _3000: {
        message: `Para guardar la noticia se necesita el contenido`,
        method: 'News creator',
        code: 3000,
        value: false,
        status: 205
    },
    _3001: {
        message: `Para guardar la noticia se necesita el titulo`,
        method: 'News creator',
        code: 3001,
        value: false,
        status: 400
    },

    _3002: {
        message: `Falta imagen de la noticia`,
        method: 'News creator',
        code: 3002,
        value: false,
        status: 400
    },
    _3003: {
        message: `Error al crear la noticia, intenta nuevamente`,
        method: 'News creator',
        code: 3003,
        value: false,
        status: 400
    },
    _3004: {
        message: `Al parecer no tenemos información del id`,
        method: 'News',
        code: 3004,
        value: false,
        status: 400
    },
    _3005: {
        message: `No se encotró la noticia que busca`,
        method: 'News',
        code: 3005,
        value: false,
        status: 400
    },

    _3006: {
        message: `No se puede publicar la noticia`,
        method: 'News',
        code: 3006,
        value: false,
        status: 400
    },
    _3007: {
        message: `No se encuentra el valor publico`,
        method: 'News',
        code: 3007,
        value: false,
        status: 400
    },
    _3008: {
        message: `No tiene peromiso para editar esto`,
        method: 'News',
        code: 3005,
        value: false,
        status: 500
    }



}