module.exports = authErrorList = {
    default: {
        message: `Error desconocido, intente nuevamente`,
        method: 'Authentication',
        code: 1000,
        value: false,
        status: 500
    },
    _1001: {
        message: `El usuario no se ha encontrado en la base de datos`,
        method: 'Authentication',
        code: 1001,
        value: false,
        status: 404
        },
    _1002: {
        message: `La contraseña del usuario es incorrecta`,
        method: 'Authentication',
        code: 1002,
        value: false,
        status: 404
    },
    _1003: {
        message: `La información del usuario esta incompleta`,
        method: 'Authentication',
        code: 1003,
        value: false,
        status: 500
    },
    _1004: {
        message: `El usuario se encuentra registrado en la base de datos y no se puede registrar`,
        method: 'Authentication Signup',
        code: 1004,
        value: false,
        status: 208
    },
    _1005: {
        message: `El correo del usuario se encuentra registrado en la base de datos y no se puede registrar`,
        method: 'Authentication Signup',
        code: 1005,
        value: false,
        status: 208
    },
    _1006: {
        message: `No se encontro algún rol que recibimos del usuario`,
        method: 'Authentication Signup',
        code: 1006,
        value: false,
        status: 404
    },
    _1007: {
        message: `Error desconocido al crear un usuario`,
        method: 'Authentication Signup',
        code: 1007,
        value: false,
        status: 500
    },
    _1008: {
        message: `Hay datos invalidos en el formulario`,
        method: 'Authentication Signup',
        code: 1008,
        value: false,
        status: 400
    }

}