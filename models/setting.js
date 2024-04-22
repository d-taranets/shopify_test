const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {
    static associate(models) {
      // define association here
    }
  }
  Setting.init({
    user_id: DataTypes.INTEGER,
    store_path: DataTypes.STRING,
    access_key: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Setting',
    tableName: 'settings',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Setting;
};