const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("Productos", {
		producto_id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: UUIDV4,
		},
		nombre: {
			type: DataTypes.STRING, //Se eliminó la limitación de caracteres.
			allowNull: false,
		},
		descripcion: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		imagen_principal: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		imagenes_secundarias: {
			type: DataTypes.ARRAY(DataTypes.STRING), //Array de strings
		},
		video: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		precio: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		edad: {
			type: DataTypes.ENUM(
				"recien-nacido",
				"bebe",
				"infantil",
				"junior",
				"otros"
			),
			allowNull: false,
		},
		genero: {
			type: DataTypes.ENUM("chico", "chica", "universal"),
			allowNull: false,
		},
		destacado: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: "0",
		},
		inactivo: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: "0",
		},
		stock: {
			type: DataTypes.JSON,
			allowNull: false,
		},
	});
};
