import heicConvert from 'heic-convert';

//todo Función para la conversión de las imágenes en formato HEIC a formato JPEG.
export const heicToJpeg = async (base64Image) => {
    try {
        const imgBuffer = Buffer.from(base64Image, 'base64');
    
        const { buffer } = await heicConvert({
            buffer: imgBuffer,
            format: 'JPEG',
            quality: 0.5,
        });

        // Retorna el buffer de la imagen convertida
        return buffer;
    } catch (error) {
        console.error(error);
        console.log('El formato de la imagen no era Heic')
        // Retorna la imagen original en Base64 si la conversión no es necesaria
        return base64Image;
    }
};