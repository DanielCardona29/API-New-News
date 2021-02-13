//Importamos nuestra lista de errores  de los autenticadores
import { error_list } from '../libs/auth.error';

export default class ErrorController {
    constructor() {
        this.ErroList = error_list;
    }
    //Aqui se manejan todos los estados de error y las respuestas que le damos al usuario
    ErrorResponse(res, code) {
        switch (code) {
            //Error de usuario no encontrado en la base de datos
            case 1001:
                return res.status(this.ErroList._1001.status).json({
                    message: this.ErroList._1001.message,
                    code: this.ErroList._1001.code,
                    value: this.ErroList._1001.value
                });



            default:
                return res.status(this.ErroList.default.status).json({
                    message: this.ErroList.default.message,
                    code: this.ErroList.default.code,
                    value: this.ErroList.default.value
                });

        }
    }

}