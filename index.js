const fs = require('fs')
const http= require('http')
const path= require('path')
const https= require('https')
const server= http.createServer((req,res)=>{
    if(req.url === '/' && req.method==='GET'){
        handleHomePage(req,res)
    }
    if (req.url === '/users/1' && req.method === 'GET'){
        handleUserPage(req,res,1)
    }
    if(req.url==='/users/2'&& req.method==='GET'){
        handleUserPage(req,res,2)
    }
    if(req.url==='/users/3'&& req.method==='GET'){
        handleUserPage(req,res,3)
    }
})

const handleUserPage= (req,res,id)=>{
    fs.readFile(path.join(__dirname,'template','users.html'),'utf-8',(err,data)=>{
        if(err){
            res.writeHead(404)
            res.end('Something went wrong')
            return
        }
        console.log(data)
        let template= data
        https.get('https://reqres.in/api/users/'+id,(httpResponse)=>{
            console.log(httpResponse)
            console.log(httpResponse.statusCode)
            let data=''
            httpResponse.on('data',(chunk)=>{
                data+=chunk
            })
            httpResponse.on('end',()=>{
                console.log(data)
                const response= JSON.parse(data)
                console.log(response)
                const options={
                    name:response.data.first_name + response.data.last_name,
                    img_src:response.data.avatar,
                    email:response.data.email
                }
                for (let key in options){
                    const value= options[key]
                    template= template.replace(`{${key}}`,value)
                }
                console.log(template)
                res.writeHead(200)
                res.end(template)
            })
        })
    })
}

const handleHomePage= (req,res)=>{
    console.log('home page')
    //read the html file
    fs.readFile(path.join(__dirname,'template','index.html'),'utf-8',(err,data)=>{
        console.log(data)
        let template= data
    
        const options= {
            title:'Home Page',
            description: 'Welcome to my page!'
        }
        
        for (let key in options){
            const value= options[key]
            template= template.replace(`{${key}}`,value)
        }
        console.log(template)
        res.writeHead(200)
    res.end(template)
    })
    
}

server.listen(4000,(err)=>{
    console.log('Listening on port 4000')
})