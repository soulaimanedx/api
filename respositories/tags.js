const { Tag } = require('../models');

module.exports = {
    getAllTags() {
      return Tag.findAll()
    },
    // méthodes à implémenter
    getTags(offset = 0, limit = 10) { 
        return Tag.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset)
        })
    },
    getTag(id) {
        return Tag.findByPk(id)
    },
    getTagByEmail(email) { },
    addTag(tag) {
        return Tag.create({
            name: tag.name,
        })
    },
    updateTag(data) { 
        Tag.findByPk(data.id)
        .then(tag => {
            tag.update({
                name: data.name,
            })
        })
    },
    deleteTag(id) {
        Tag.findByPk(id)
        .then(tag => {
            tag.destroy();
        })
    },
    // D'autres méthodes jugées utiles
  }
 
