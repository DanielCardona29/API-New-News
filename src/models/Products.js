import { Schema, model } from 'mongoose';
//Creamos el Schema para guardar la info en la base de datos

const productSchema = new Schema({
    name: String,
    category: String,
    price: Number,
    imgURL: String
}, {
    timestamps: true,
    versionKey: false
});


export default model('Product', productSchema);