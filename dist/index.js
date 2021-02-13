"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// babel convierte el codigo de js moderno a codigo soportado por node
//Iniciamos express
var app = (0, _express["default"])(); //Abrimos el puerto de nustra aplicacion
//1. Asignamos el puerto a una variable
// este valor lo capturamos de una variable de entorno.

var PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('Servidor abierto en el puerto', PORT);