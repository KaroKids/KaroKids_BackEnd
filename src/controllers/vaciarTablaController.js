const {
  Carritos,
  Colores,
  Configuraciones,
  Direcciones,
  Entidades,
  Ordenes,
  Productos_Descuentos,
  Productos,
  Promociones,
  Tallas,
  Usuarios,
} = require("../db");

const vaciarTabla = async (table, clave) => {
  const claveConfirmar = process.env.CLAVE;

  try {
    if (clave === claveConfirmar) {
      if (table === "Carritos") {
        await Carritos.truncate({ cascade: true });

        return `Tabla ${table} vaciada exitosamente`;
      }

      if (table === "Colores") {
        await Colores.truncate({ cascade: true });

        return `Tabla ${table} vaciada exitosamente`;
      }

      if (table === "Configuraciones") {
        await Configuraciones.truncate({ cascade: true });

        return `Tabla ${table} vaciada exitosamente`;
      }

      if (table === "Direcciones") {
        await Direcciones.truncate({ cascade: true });

        return `Tabla ${table} vaciada exitosamente`;
      }

      if (table === "Entidades") {
        await Entidades.truncate({ cascade: true });

        return `Tabla ${table} vaciada exitosamente`;
      }

      if (table === "Ordenes") {
        await Ordenes.truncate({ cascade: true });
        return `Tabla ${table} vaciada exitosamente`;
      }

      if (table === "Productos_Descuentos") {
        await Productos_Descuentos.truncate({ cascade: true });
        return `Tabla ${table} vaciada exitosamente`;
      }

      if (table === "Productos") {
        await Productos.truncate({ cascade: true });
        return `Tabla ${table} vaciada exitosamente`;
      }

      if (table === "Promociones") {
        await Promociones.truncate({ cascade: true });
        return `Tabla ${table} vaciada exitosamente`;
      }

      if (table === "Tallas") {
        await Tallas.truncate({ cascade: true });
        return `Tabla ${table} vaciada exitosamente`;
      }

      if (table === "Usuarios") {
        await Usuarios.truncate({ cascade: true });
        return `Tabla ${table} vaciada exitosamente`;
      }

      return `La tabla ${table} no se pudo vaciar, verifica que esté incluida en "vaciarTablaController"`;
    }

    return "Contraseña incorrecta";
  } catch (error) {
    return error;
  }
};

module.exports = {
  vaciarTabla,
};
