require('dotenv').config()
const Telegraf = require('telegraf')
const RedisSession = require('telegraf-session-redis')
const TelegrafFlow = require('telegraf-flow')
const flow = new TelegrafFlow()
const moment = require('moment')
const chalk = require('chalk')
const _ = require('lodash')

const v = require(__dirname+'/config/vars')
const db = require('./models/index')

const bot = new Telegraf(process.env.BOT_TOKEN)

console.log("Starting", chalk.magenta(v.BOT_NAME_HUMAN + " v" + v.BOT_VERSION))
console.log("---", chalk.cyan(new Date()))

/** Command lists here */
const commandList = [
    require('./commands/start'),
    require('./commands/help'),
]

/** Using REDIS Insted of JS Memory */
const session = new RedisSession({
    store: {
        host: process.env.TELEGRAM_SESSION_HOST || '127.0.0.1',
        port: process.env.TELEGRAM_SESSION_PORT || 6379
    }
})
bot.use(session.middleware())
bot.use(flow.middleware())

/** Managing Middleware for records session or anything */
bot.use((ctx, next) => db.User.updateUser(ctx, next))
bot.use((ctx, next) => db.Group.updateGroup(ctx, next))
bot.use((ctx, next) => db.Log.toLog(ctx, next))

commandList.forEach((d) => {
    let callSuspect = new d(bot, db);
    if(callSuspect.getFlow) flow.register(callSuspect.getFlow())
})

bot.action('cancel', (ctx) => ctx.editMessageText(`Perintah Dibatalkan`))

bot.startPolling()



