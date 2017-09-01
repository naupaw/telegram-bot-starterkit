require("dotenv").config();
const {Markup, Extra} = require('telegraf')
const v = require("../config/vars");

class HelpCommand {
    constructor(app, db) {
        this.app = app
        this.db = db
        this.setCommand()
    }

    setCommand() {
        this.app.command('help', (ctx) => {
            const {replyWithMarkdown} = ctx
            let out = `Help Me brow !!`
            return replyWithMarkdown(out)
        })
    }
}

module.exports = HelpCommand