// Hacemos un Schema para el manejo de los Roles
import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
    name: String
}, {
    versionKey: false
});

export default model('Role', RoleSchema);