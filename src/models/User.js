import { Schema, model } from 'mongoose';

//Importamos el modulo para emcriptar la contraseña
import bcrypt from 'bcryptjs';

// Nuevo Schema para el registro del usuario
const userSchema = new Schema({
    // Le damos la propiedad de unico a el nombre 
    // y el Corrfeo
    user: ({
        type: String,
        unique: true,

    }),
    email: ({
        type: String,
        unique: true,

    }),
    pass: ({
        type: String,
        required: true
    }),
    // Los roles provienen de la base de datos 
    // La cual estamos relacionando
    roles: [{
            ref: 'Role',
            type: Schema.Types.ObjectId
        }]
        // Un usuario puede tener multiples roles
}, {
    timestamps: true,
    versionKey: false
});
//Cifrando la contraseña
// Los metodos estaticos son formas de llamar a un metodo
//Sin necesidad de instaciar un objeto
userSchema.statics.cryptPass = async(pass) => {
    // Encriptamos la contraseña
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass, salt);
};
//Comparamos la contraseña, que ingresa del usuario.
//Esto los usamos para el inicio de sesion 
//Comparando la contraseña con la que esta encriptada en la base de datos
userSchema.statics.compareCryptPass = async(recivendPass, pass) => {
    const compare = await bcrypt.compare(recivendPass, pass);
    return compare;
};


export default model('User', userSchema);