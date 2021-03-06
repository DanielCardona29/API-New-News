// Hacemos un Schema para el manejo de los Roles
import { Schema, model, SchemaType } from 'mongoose';

const NewsSchema = new Schema({
    content: String,
    img: String,
    title: String,
    viwes: Number,
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    likes: {
        userslist: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    dislikes: {
        userslist: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    coments: [
        {
            _id: String,
            userid: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            content: String,
            likes: {
                userslist: [{
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                }]
            },
        }
    ],
    aling: String,
    isPublic: Boolean

}, {
    timestamps: true,
    versionKey: false
});



export default model('News', NewsSchema);