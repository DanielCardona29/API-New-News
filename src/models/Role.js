// Hacemos un Schema para el manejo de los Roles
const { Schema, model } = require('mongoose');

const RoleSchema = new Schema({
    name: String
}, {
    versionKey: false
});

module.exports = model('Role', RoleSchema);