'use strict';
module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    groupId: DataTypes.BIGINT,
    title: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },

      updateGroup: function(ctx, next) {
        let from, chat = null;
        if (ctx.updateType == "callback_query") {
            from = ctx.update.callback_query.from
            chat = ctx.update.callback_query.message.chat
        } else {
            from = ctx.update.message.from
            chat = ctx.update.message.chat
        }
        if(!(chat.type == 'group' || chat.type == 'supergroup')) {
          return next()
        }
        this.findOne({where: {telegramId: chat.id}})
        .then((g) => {
          if(g) {
            g.title = chat.title
            g.type = chat.type
            g.save();
          } else {
            this.create({
              telegramId: chat.id,
              name: chat.title,
              role: 'general'
            })
          }
        });
        return next()
      },

      getAll: function(role = false, active = false) {
          let where = {}
          if(role) where.role = role
          if(active) where.isActive = true
          return this.findAll({where})
          .then(data => {
              return data.length > 0 ? data.map(d => d.get({plain:true})) : false
          })
      }
    },

  });
  return Group;
};