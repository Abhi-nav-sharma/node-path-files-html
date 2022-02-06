const fs= require('fs')
const path = require('path')

fs.readFile(path.join(__dirname,'hello.txt'),'utf-8',(error,data)=>{
    if(error){
        console.log('Error:',err)
        return
    }
    console.log(data)
})

const data= fs.readFileSync(path.join(__dirname,'hello.txt'),'utf-8')
console.log(data)

fs.writeFile(path.join(__dirname,'hello.txt'),'Hi Kittu!!!', (err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('file created')
})

fs.mkdir(path.join(__dirname,'meta'),(err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('directory created')
    fs.rename(path.join(__dirname,'hello.txt'),path.join(__dirname,'meta','my_name.txt'),(err)=>{
        if(err){
            console.log(err)
            return
        }
        console.log('file renamed')
    })
})