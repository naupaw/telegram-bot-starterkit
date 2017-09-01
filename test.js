const db = require('./models/index')
const moment = require("moment")

db.Report.getAllByRange(moment().startOf('day'), moment().endOf('day'))
.then(d => {
    console.log(d)
})