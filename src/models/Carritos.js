const { DataTypes, UUIDV4, ARRAY } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Carritos",
    {
      carrito_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      //usuario_id: FK, //Para asociar el carrito al usuario correspondiente.
      productos_compra: {
        type: DataTypes.ARRAY(DataTypes.JSON) //Array de objetos
      },
      inactivo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: "0",
      },
    },
    {
      timestamps: false,
    }
  );
};

//Este nuevo modelo almacenará en el campo "productos_compra" un array de objetos donde cada uno de ellos contiene la siguiente información que llegará desde el Front:
  //producto_id: identificador del producto seleccionado en la vista de detalle/compra.
  //compra_talla: talla seleccionada para el producto elegido.
  //compra_color: color seleccionado para el producto elegido.
  //compra_cantidad: cantidad seleccionada para el producto elegido.

  //Además, el valor de usuario_id también será enviado desde el Front dentro del mismo objeto. Este servirá para poder verificar la existencia o no de un carrito asociado.