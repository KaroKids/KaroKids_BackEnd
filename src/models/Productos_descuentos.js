const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("Productos_Descuentos", {
		producto_descuento_id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: UUIDV4,
		},
		descuento: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
	});
};
