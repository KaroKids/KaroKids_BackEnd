const axios = require('axios');
const fs = require('fs');

// URL de la imagen remota
const imageUrl = "https://limonada.cl/cdn/shop/files/L13202240585100_3.jpg?v=1706549809";

// Función para descargar una imagen remota y convertirla a base64
async function convertirImagenABase64(url) {
    try {
        // Realizar la solicitud para obtener la imagen
        const respuesta = await axios.get(url, { responseType: 'arraybuffer' });

        // Convertir el buffer de la respuesta a base64
        const base64 = Buffer.from(respuesta.data, 'binary').toString('base64');

        return base64;
    } catch (error) {
        console.error('Error al convertir la imagen a base64:', error);
        throw error;
    }
}

// Llamar a la función y obtener el resultado
convertirImagenABase64(imageUrl)
    .then(base64 => {
        console.log('Imagen convertida a base64:', base64);
        // Aquí puedes incluir la base64 en tu objeto JSON
    })
    .catch(error => {
        console.error('Error:', error);
    });
