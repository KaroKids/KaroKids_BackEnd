const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Tallas",
		{
			talla_id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: UUIDV4,
			},
			talla: {
				type: DataTypes.STRING(7),
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
};
