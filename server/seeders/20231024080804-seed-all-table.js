'use strict';
const customers = require('../customers.json');
const rooms = require('../rooms.json');
const bookings = require('../bookings.json');
const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Customers',
      customers.map((e) => {
        e.createdAt = e.updatedAt = new Date();
        e.password = hashPassword(e.password);
        return e;
      })
    );
    await queryInterface.bulkInsert(
      'Rooms',
      rooms.map((e) => {
        e.createdAt = e.updatedAt = new Date();
        return e;
      })
    );
    await queryInterface.bulkInsert(
      'Bookings',
      bookings.map((e) => {
        e.createdAt = e.updatedAt = new Date();
        return e;
      })
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {
      truncate: true,
      cascade: true,
      restardIdentity: true,
    });
    await queryInterface.bulkDelete('Rooms', null, {
      truncate: true,
      cascade: true,
      restardIdentity: true,
    });
    await queryInterface.bulkDelete('Customers', null, {
      truncate: true,
      cascade: true,
      restardIdentity: true,
    });
  },
};
