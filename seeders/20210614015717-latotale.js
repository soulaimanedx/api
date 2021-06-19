'use strict';

const faker = require('faker');
let rand;
let createdAt;

const users = [...Array(20)].map(() => {
  createdAt = faker.date.between('2000-01-01', '2021-01-01')
  return ({
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(10),
    role: faker.random.arrayElement(["admin", "guest", "author"]),
    createdAt: createdAt,
    updatedAt: createdAt
  })
})

const tags = [...Array(10)].map(() => {
  createdAt = faker.date.between('2000-01-01', '2021-01-01')
  return ({
    name: faker.lorem.words(3),
    createdAt: createdAt,
    updatedAt: createdAt
  })}
)

let articles = [];
users.forEach((user, id) => {
  rand = faker.datatype.number({min: 2,max: 10});
  articles = articles.concat([...Array(rand)].map(() => {
    createdAt = faker.date.between(user.createdAt, new Date())
    return ({
      title: faker.lorem.words(3),
      content: faker.lorem.words(faker.datatype.number({min: 20,max: 80})),
      published: faker.datatype.boolean(),
      UserId: (id+1),
      createdAt: createdAt,
      updatedAt: createdAt  
    })
  }))
})

let articletags = [];
let TageId;
let genTagId;

articles.forEach((article, id) => {
  TageId = [...Array(10).keys()].map( i => i+1);
  rand = faker.datatype.number({min: 2, max: 6});
  // rand = faker.datatype.number({min: 1,max: 2});

  articletags = articletags.concat([...Array(rand)].map(() => {
    genTagId =  faker.random.arrayElement(TageId)
    TageId.splice((genTagId-1), 1);
    createdAt = faker.date.between(article.createdAt, new Date());

    return ({
        ArticleId: (id+1),
        TagId: genTagId,
        createdAt: createdAt,
        updatedAt: createdAt
      })
  }))
})

let comments = [];
articles.forEach((article, id) => {  
  rand = faker.datatype.number({min: 0,max: 10});
  comments = comments.concat([...Array(rand)].map(() => {
    createdAt = faker.date.between(article.createdAt, new Date());
    return ({
        content: faker.lorem.words(faker.datatype.number({min: 2,max: 20})),
        ArticleId: (id+1),
        createdAt: createdAt,
        updatedAt: createdAt
      })
  }))
})


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
    await queryInterface.bulkInsert('Users', users, {});
    await queryInterface.bulkInsert('Tags', tags ,{});
    await queryInterface.bulkInsert('Articles', articles ,{});
    await queryInterface.bulkInsert('Comments', comments ,{});    
    await queryInterface.bulkInsert('articletags', articletags ,{});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Tags', null, {});
    await queryInterface.bulkDelete('Articles', null, {});
    await queryInterface.bulkDelete('Comments', null, {});
    await queryInterface.bulkDelete('Articletags', null, {});
  }
};
