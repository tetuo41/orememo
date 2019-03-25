const fs = require('fs')
const moment = require('moment')
const path = require('path')

// const
// const CURRENTPATH = process.cwd()
const CURRENTPATH = path.dirname(process.argv[1])
const MEMODIRPATH = CURRENTPATH + '/memo_dir'
const ARCHIVEPATH = MEMODIRPATH + '/Archive'
const TODAY = moment().format('YYYYMMDD')


const mkdirArc = () => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}
