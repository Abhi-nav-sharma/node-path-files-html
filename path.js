const path= require('path')
console.log(__dirname)
console.log(__filename)
console.log(path.basename(__filename))
console.log(path.extname(__filename))
console.log(path.dirname(__filename))
console.log(path.join(__dirname,'test','hello.html'))
console.log(path.parse(__filename))
console.log(path.format({
    root: 'D:\\',
    dir: 'D:\\masai_backend_unit5\\week1\\day2\\assignment',
    base: 'path.js',
    ext: '.js',
    name: 'path'
  }))