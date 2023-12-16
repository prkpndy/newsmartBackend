module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "headlines",
    {
      link: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      headline: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rhyme: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      bias: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },

    {
      tableName: "headlines",
      timestamps: false,
    }
  );
};
