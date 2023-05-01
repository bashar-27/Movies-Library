
const express = require('express')
const server = express()
const allData = require('./data_movies/data.json')
const PORT = 3000;


server.listen(PORT,()=>{
    console.log(`Listening on ${PORT}: I'm ready to routing!`)
})
let movies=[];
function LibraryOfMovies(title,poster_path,overview){
    this.title=title;
    this.poster_path=poster_path;
    this.overview=overview;
    movies.push(this);
}

const spiderManMovie=new LibraryOfMovies(allData.title,allData.poster_path,allData.overview);

server.get('/',(req,res)=>{
    res.send(spiderManMovie);
})

server.get('/favorite',(req,res)=>{
    res.send("Welcome to Favorite Page");
})

server.get('/404',(req,res)=>{
        res.status(404).send(er404())
})

server.get('*',(req,res)=>{
    res.status(500).send(er500())
})




function er500(){
    let error500 = {"status":500,"responseText":"Sorry, something went wrong"}
    return error500;
};

function er404(){
    let error404={"status":404 , "responseText":"Sorry!\n THE PAGE IS NOT FOUND"}
    return error404;
};