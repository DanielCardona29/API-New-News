const dontenv = require('dotenv');
dontenv.config()
module.exports = {
    secret: process.env.SECRET_TOKEN_ID
}