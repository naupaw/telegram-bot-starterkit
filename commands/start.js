require("dotenv").config();
const {Markup, Extra} = require('telegraf')
const v = require("../config/vars");

class StartCommand {
    constructor(app, db) {
        this.app = app
        this.db = db
        this.setCommand()
    }

    setCommand() {
        this.app.command('start', (ctx) => {
            const {replyWithMarkdown} = ctx
            let out = 'Start brow !!'
            console.log(out)
            return replyWithMarkdown(out).then(d => console.log(d))
        })
    }
}

module.exports = StartCommand