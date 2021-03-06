"use strict"; // desde este archivo arrancamos la aplicacion

var _app = _interopRequireDefault(require("./app.js"));

require("./database.js");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Configuramos las variables de entorno
_dotenv["default"].config(); //Abrimos el puerto de nustra aplicacion
//1. Asignamos el puerto a una variable
// este valor lo capturamos de una variable de entorno.


var PORT = process.env.PORT || 3000;

_app["default"].listen(PORT);

console.log('Servidor abierto en el puerto', PORT);