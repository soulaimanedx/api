'use strict';
const faker = require('faker');

const users = [...Array(100)].map((user) => (
  {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(10),
    role: faker.random.arrayElement(["admin", "guest", "author"]),
    createdAt: new Date(),
    updatedAt: new Date()
  }
))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  //  return queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    // return queryInterface.bulkDelete('Users', null, {});
  }
};
