const { User,Article } = require('../models');

module.exports = {
    getAllUsers() {
      return User.findAll()
    },
    // méthodes à implémenter
    getUsers(offset = 0, limit = 10) { 
        return User.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset)
        })
    },
    getAdmins() { },
    getAuthors() { },
    getUserArticls(id){
        return  Article.findAll({
            where:{
                UserId: id
            }
        });
    }, 
    getUser(id) {
        return User.findByPk(id)
    },
    getUserByEmail(email) { },
    addUser(user) {
        return User.create({
            username: user.username,
            email: user.email,
            role: user.role,
            password: user.password
        })
    },
    updateUser(data) { 
        User.findByPk(data.id)
        .then(user => {
            user.update({
                username: data.username,
                email: data.email,
                role: data.role,
                password: data.password
            })
        })
    },
    deleteUser(id) {
        User.findByPk(id)
        .then(user => {
            user.destroy();
        })
    },
    // D'autres méthodes jugées utiles
  }
 
