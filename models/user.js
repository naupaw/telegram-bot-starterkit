'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    telegramId: {
        type: DataTypes.BIGINT(255),
        allowNull: false,
        unique: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    language: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      getAllUser: function() {
        return this.findAll().then((result) => {
            if (result) {
                return result.map(d => d.get({plain: true}))
            } else {
                return []
            }
        });
      },
      updateUser: function(ctx, next) {
        let from = null;
        if (ctx.updateType == "callback_query") {
            from = ctx.update.callback_query.from;
        } else {
            from = ctx.update.message.from;
        }
        console.log(from)
        this.findOne({where: {telegramId: from.id}})
        .then((u) => {
          if(u) {
            u.first_name = from.first_name
            u.last_name = from.last_name
            u.username = from.username
            u.language = from.language_code
            u.save();
          } else {
            u = this.create({
                telegramId: from.id,
                first_name: from.first_name,
                last_name: from.last_name,
                username: from.username,
                language: from.language_code
            })
          }
          return next()
        });
      },
      getUser: function(ctx) {
        let from = null;
        if (ctx.updateType == "callback_query") {
            from = ctx.update.callback_query.from;
        } else {
            from = ctx.update.message.from;
        }
        return this.findOne({where: {telegramId: from.id}})
        .then((u) => u ? u.get({plain: true}) : {});
      }
    },

  });
  return User;
};