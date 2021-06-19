const { Comment } = require('../models');

module.exports = {
    getAllComments() {
      return Comment.findAll()
    },
    // méthodes à implémenter
    getComments(offset = 0, limit = 10) { 
        return Comment.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset)
        })
    },
    getComment(id) {
        return Comment.findByPk(id)
    },
    getCommentByEmail(email) { },
    addComment(comment, articlesID) {
        return Comment.create({
            content: comment.content,
            ArticleId: articlesID
        })
    },
    updateComment(data) { 
        Comment.findByPk(data.id)
        .then(comment => {
            comment.update({
                content: data.content,
            })
        })
    },
    deleteComment(id) {
        Comment.findByPk(id)
        .then(comment => {
            comment.destroy();
        })
    },
    // D'autres méthodes jugées utiles
  }
 
