import dontenv from 'dotenv';
dontenv.config()
console.log(process.env.SECRET_TOKEN_ID);
export default {
    secret: process.env.SECRET_TOKEN_ID
}