//Instalar las dependencias: 
    //npm install cloudinary

//Configuración:
require("dotenv").config()
const cloudinary = require('cloudinary').v2;

const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    // secure: true
});

module.exports = cloudinaryConfig;
