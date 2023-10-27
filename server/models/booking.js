'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Customer);
      Booking.belongsTo(models.Room);
    }
  }
  Booking.init(
    {
      CustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Customer id is required' },
          notEmpty: { msg: 'Customer id is required' },
        },
      },
      RoomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Room id is required' },
          notEmpty: { msg: 'Room id is required' },
        },
      },
      bookingDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: 'Booking date is required' },
          notEmpty: { msg: 'Booking date is required' },
        },
      },
      checkinDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: 'Check in date is required' },
          notEmpty: { msg: 'Check in date is required' },
        },
      },
      checkoutDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: 'Check out date is required' },
          notEmpty: { msg: 'Check out date is required' },
        },
      },
      totalPayment: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Total payment is required' },
          notEmpty: { msg: 'Total payment is required' },
        },
      },
      statusPayment: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
        allowNull: false,
        validate: {
          notNull: { msg: 'Status payment is required' },
          notEmpty: { msg: 'Status payment is required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Booking',
    }
  );
  return Booking;
};
