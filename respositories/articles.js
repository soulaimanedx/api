const { Article, Comment } = require('../models');

module.exports = {
    getAllArticles() {
      return Article.findAll()
    },
    // méthodes à implémenter
    getArticles(offset = 0, limit = 10) { 
        return Article.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset)
        })
    },
    getArticle(id) {
        return Article.findByPk(id)
    },
    getArticleComents(id){
        return Comment.findAll({
            where:{
                ArticleId: id
            }
        });
    },
    getArticleByEmail(email) { },
    addArticle(article, userId) {
        return Article.create({
            title: article.title,
            content: article.content,
            published: article.published,
            UserId: userId
        })
    },
    updateArticle(data) { 
        Article.findByPk(data.id)
        .then(article => {
            article.update({
                title: data.title,
                content: data.content,
                published: data.published,
                UserId: data.UserId
            })
        })
    },
    deleteArticle(id) {
        Article.findByPk(id)
        .then(article => {
            article.destroy();
        })
    },
    // D'autres méthodes jugées utiles
  }
 
