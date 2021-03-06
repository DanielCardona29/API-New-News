export const userErrorList = {
    default: {
        message: `Error desconocido, intente nuevamente`,
        method: 'Authentication',
        code: 1000,
        value: false,
        status: 500
    },
    _4000: {
        message: `El usuario no se ha encontrado en la base de datos`,
        method: 'Usuarios',
        code: 4000,
        value: false,
        status: 404
    },
    _4001: {
        message: `No tenemos la direccion de un avatar`,
        method: 'Usuarios',
        code: 4001,
        value: false,
        status: 404
    },


    _4002: {
        message: `No es posible cambiar la contraseña`,
        method: 'Usuarios',
        code: 4002,
        value: false,
        status: 404
    },

    _4003: {
        message: `Error al encontrar noticias`,
        method: 'Usuarios',
        code: 4003,
        value: false,
        status: 404
    },
}