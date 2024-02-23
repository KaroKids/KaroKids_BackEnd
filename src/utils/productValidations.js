const productValidations = ( 
    nombre,
    descripcion,
    imagen_principal,
    imagenes_secundarias,
    video,
    edad,
    genero,
    precio,
    destacado,
    inactivo,
    stock
    ) => {
        // const numberRegExp = /^([1-9][0-9]{0,2}|1000)$/;
        const urlRegex = /(http|https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/;

        // const imageExtensionRegex = /\.(jpeg|jpg|png|webp|gif|svg)$/i
        const imageCombinedRegex = /((http|https?):\/\/)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}(([-a-zA-Z0-9@:%_.~#?&//=]*)\.(png|jpg|jpeg|gif|webp|svg))/i;

        // const videoExtensionRegex = /\.(mp4|MOV)$/i
        const videoCombinedRegex = /((http|https?):\/\/)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}(([-a-zA-Z0-9@:%_.~#?&//=]*)\.(mp4|MOV))/i;

        const precioRegex = /^(?=.*[1-9])\d{1,6}(?:\.\d{1,2})?$/


        let errors = {};

        // Validación del campo nombre
        if (nombre === '') {
            errors.nombre = true
            throw new Error ('Campo nombre requerido')
        }

        // Validación del campo descripción
        if (descripcion === '') {
            errors.nombre = true
            throw new Error ('Campo descripción requerido')
        }

        // Validación del campo imagen_principal
        // if (imagen_principal === '') {
        //     errors.imagen_principal = true
        //     throw new Error ('Imagen principal requerida')
        // } else if (!urlRegex.test(imagen_principal)) {
        //     errors.imagen_principal = true
        //     throw new Error ('URL de imagen principal inválida')
        // } else if (!imageCombinedRegex.test(imagen_principal)) {
        //     errors.imagen_principal = true
        //     throw new Error ('Formato de imagen principal inválido')
        // }
        

        // Validación del campo imagenes_secundarias
        // if (imagenes_secundarias.length > 0) {
        //     imagenes_secundarias.map((image, index) => {
        //         if (!urlRegex.test(image)) {
        //             errors.imagenes_secundarias = true
        //             throw new Error (`URL ${index} inválida`)
        //         } else if (!imageCombinedRegex.test(image)) {
        //             errors.imagenes_secundarias = true
        //             throw new Error ('Formato de imagen secundaria inválido')
        //         }
        //     })
        // }

        // Validación del campo video
        // if (video) {
        //     if (!urlRegex.test(video)) {
        //         errors.video = true
        //         throw new Error ('video URL inválida')
        //     } else if (!videoCombinedRegex.test(video)) {
        //         errors.video = true
        //         throw new Error ('Formato de video inválido')
        //     }
        // }

        //Validación del campo precio
        if (!precioRegex.test(precio)) {
            errors.precio = true
            throw new Error ('Formato de precio inválido')
        }

        //Validación del campo edad
        if (!edad) {
            errors.edad = true
            throw new Error ('Campo edad requerido')
        }

        //Validación del campo genero
        if (!genero) {
            errors.genero = true
            throw new Error ('Campo genero requerido')
        }

        // // Iterar sobre cada talla en el objeto de stock
        // Object.keys(stock).forEach(talla => {
        //     console.log(`Talla: ${talla}`);
            
        //     // Validación del campo talla
        //     if (!talla) {
        //         throw new Error('Talla requerida');
        //     }
            
        //     // Obtener el array de objetos de la talla actual
        //     const items = stock[talla];
            
        //     // Iterar sobre los objetos (color y cantidad) de la talla actual
        //     items.forEach(item => {
        //     console.log(`Color: ${item.color}, Cantidad: ${item.cantidad}`);

        //     // Validación del campo color
        //     if (!item.color) {
        //         throw new Error(`Color requerido para el stock ${stock.talla}`);
        //     }
            
        //     // Validación del campo cantidad
        //     if (!item.cantidad) {
        //         throw new Error(`Cantidad requerida para el stock ${stock.talla}`);
        //     }
        //     });
        // });
        
        return errors;
};

module.exports = productValidations;