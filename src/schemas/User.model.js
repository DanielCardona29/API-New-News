const bcrypt = require('bcryptjs');


const { Schema, model } = require('mongoose');

//Abre un schema que controla los datos de entrada a la base de datos
const userSchema = new Schema({
    user: ({
        type: String,
        unique: true
    }),
    email: ({
        type: String,
        unique: true
    }),
    password: ({
        type: String,
        unique: true
    }),
    access: ({
        type: String,
        unique: true
    }),
    //Creamos nuestro Role
    role: [{
            ref: 'Role',
            type: Schema.Types.ObjectId
        }]
}, {
    timestamps: true,
    versionKey: false
});

//Creamos un metodo para encriptar la contraseña
userSchema.methods.encrypPass = async (pass) => {
    const salt = await bcrypt.genSalt(15);
    return bcrypt.hash(pass, salt);
};

//Creamos un metodo para validar la contraseña
userSchema.methods.validatePass = async (pass) => {
    const validate = await bcrypt.compare(pass, this.password);
    return validate;
};

module.exports = model('User', userSchema);