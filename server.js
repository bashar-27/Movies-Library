'use strict';

const express = require('express');
const server = express();
const cors = require('cors');
server.use(cors());

require('dotenv').config();
const axios =require('axios');

const allData = require('./data_movies/data.json')
const PORT = 3004;
const apiKey=process.env.apiKey;
console.log(apiKey)
server.listen(PORT,()=>{
    console.log(`Listening on ${PORT}: I'm ready to routing!`)
})
let movies1=[];

const spiderManMovie=new LibraryOfMovies(allData.title,allData.poster_path,allData.overview);

server.get('/',(req,res)=>{
    res.send(spiderManMovie);
})

server.get('/favorite',(req,res)=>{
    res.send("Welcome to Favorite Page");
})

    //1
server.get('/trending',getTrending);

server.get('/search',getSearch);

    //3
server.get('/watch',getWatch);

    //4
server.get('/discover',getDiscover);



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


function getTrending(req,res){
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
    try{
        axios.get(url)
        .then(response  =>{
            let getResult = response.data.results.map(item=>{
                let newMovie = new movies(item.id, item.title, item.release_date, item.poster_path, item.overview);
                return newMovie;
            })
            
            res.send(getResult)
        })
        .catch((error)=>{
            console.log('Try again somthing happend',error)
            res.status(500).send(error);
        })
    }
    catch(error){
        errorHandler(error,req,res)
    }
}


function getSearch(req,res){
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=The&page=2`
    try{
        axios.get(url)
        .then(response  =>{
            let getResult = response.data.results.map(item=>{
                let newMovie = new movies(item.id, item.title, item.release_date, item.poster_path, item.overview);
                return newMovie;
            })
            
            res.send(getResult)
        })
        .catch((error)=>{
            console.log('Try again somthing happend',error)
            res.status(500).send(error);
        })
    }
    catch(error){
        errorHandler(error,req,res)
    }
}


function getWatch(req,res){
    const url = `https://api.themoviedb.org/3/watch/providers/regions?api_key=${apiKey}&language=en-US`
    try{
        axios.get(url)
        .then(response  =>{
            let getWatchResult = response.data.results.map(item=>{
                let newMovie = new moviesWatch(item.iso_3166_1, item.native_name);
                return newMovie;
            })
            
            res.send(getWatchResult)
        })
        .catch((error)=>{
            console.log('Try again somthing happend',error)
            res.status(500).send(error);
        })
    }
    catch(error){
        errorHandler(error,req,res)
    }
}


function getDiscover(req,res){
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false
    `
    try{
        axios.get(url)
        .then(response  =>{
            let getSearchResult = response.data.results.map(item=>{
                let newMovie = new movies(item.id, item.title, item.release_date, item.poster_path, item.overview);
                return newMovie;
            })
            
            res.send(getSearchResult)
        })
        .catch((error)=>{
            console.log('Try again somthing happend',error)
            res.status(500).send(error);
        })
    }
    catch(error){
        errorHandler(error,req,res)
    }
}



function movies(id,title,release_date,poster_path,overview){
    this.id=id;
    this.title=title;
    this.release_date=release_date;
    this.poster_path=poster_path;
    this.overview=overview
}

function moviesWatch(iso_3166_1 , native_name){
    this.iso_3166_1=iso_3166_1;
    this.native_name=native_name;
}

function errorHandler(error,req,res){
    const errorObj = {
        status:500,
        alert:error
    }
    res.status(500).send(errorObj);
}

function LibraryOfMovies(title,poster_path,overview){
    this.title=title;
    this.poster_path=poster_path;
    this.overview=overview;
    movies1.push(this);
}
