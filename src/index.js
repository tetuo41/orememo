const fs = require('fs');
import dayjs from 'dayjs'
import { exec } from 'child_process';
import {
  ARCHIVEPATH,
  MEMODIRPATH,
} from '../setting.js';
import {
  mkMemoDir,
  mkMemoMd,
} from './memo.js';
// const
const TODAY = dayjs().format('YYYYMMDD')


const isDir = (filepath) => {
  return fs.existsSync(filepath) && fs.statSync(filepath).isDirectory()
}

const openCode = (file) => {
  exec('code ' + file, (err, stdout, stderr) => {
    if (err) { console.log(err); }
  })
}

const openAtom = (file) => {
  exec('atom ' + file, (err, stdout, stderr) => {
    if (err) { console.log(err); }
  })
}

const lsFile = (filePath) => {
  exec('ls -l ' + filePath, (err, stdout, stderr) => {
    if (err) { console.log(err); }
    console.info(stdout)
  })
}

const isOpen = () => {
  if (process.argv.length >= 3) {
    let arg = process.argv[2]
    if (arg.match(/ls/gi)) {
      let arg2 = process.argv[3]
      if (arg2 && arg2.match(/all/gi)) {
        lsFile(MEMODIRPATH)
        lsFile(ARCHIVEPATH)
      } else {
        lsFile(MEMODIRPATH)
      }
      return true
    }
    if (arg.match(/all/gi)) {
      openCode(MEMODIRPATH)
      return true
    }
    let file_name = MEMODIRPATH + '/' + arg + '.md'
    if (fs.existsSync(file_name)) {
      openCode(file_name)
    } else {
      console.info(file_name + ' is no file')
      openCode(mkMemoMd(arg))
    }
    return true
  }
  return false
}

const merge = () => {
  let failes = []
  fs.readdir(MEMODIRPATH, function(err, files){
    if (err) throw err
    let fileList = []
    files.filter(function(file){
      let file_path = MEMODIRPATH + '/' + file
      return fs.statSync(file_path).isFile() && /\d{8}\.md$/.test(file_path) //絞り込み
    }).forEach(function (file) {
      fileList.push(MEMODIRPATH + '.' + file)
    })
    console.log(fileList)
  })
}

const init = () => {
  if (isOpen()) { return }
  if (isDir(MEMODIRPATH)) {
    openCode(mkMemoMd(TODAY))
  } else {
    mkMemoDir(MEMODIRPATH)
  }
}

// merge()

init()
