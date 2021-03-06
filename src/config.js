const dontenv = require('dotenv');
dontenv.config()
console.log(process.env.SECRET_TOKEN_ID);
module.exports = {
    secret: process.env.SECRET_TOKEN_ID
}