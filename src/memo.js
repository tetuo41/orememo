const fs = require('fs');
import {
  MEMODIRPATH,
} from '../setting.js';

const mkMemoDir = (dirpath) => {
  fs.mkdir(dirpath, (err, stdout, stderr) => {
    if (err) { console.log(err) }
    openCode(mkMemoMd(TODAY))
  })
}

const mkMemoMd = (file_name) => {
  let text = '# ' + file_name + ' MEMO'
  let file_path = MEMODIRPATH + '/' + file_name + '.md'
  if (!fs.existsSync(file_path)) {
    fs.writeFile(file_path, text, (err, stdout, stderr) =>{
      if (err) { console.log(err) }
    })
  }
  return file_path
}

export {
  mkMemoDir,
  mkMemoMd,
};
