'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.hasOne(models.Booking);
    }
  }
  Room.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Name is required' },
          notEmpty: { msg: 'Name is required' },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Description is required' },
          notEmpty: { msg: 'Description is required' },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Price is required' },
          notEmpty: { msg: 'Price is required' },
        },
      },
      adult: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          notNull: { msg: 'Adult is required' },
          notEmpty: { msg: 'Adult is required' },
        },
      },
      children: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          notNull: { msg: 'Children is required' },
          notEmpty: { msg: 'Children is required' },
        },
      },
      imageUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: 'Image Url is required' },
          notEmpty: { msg: 'Image Url is required' },
        },
      },
      availability: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      features: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Features is required' },
          notEmpty: { msg: 'Features is required' },
        },
      },
      facilities: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Facilities is required' },
          notEmpty: { msg: 'Facilities is required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Room',
    }
  );
  return Room;
};
