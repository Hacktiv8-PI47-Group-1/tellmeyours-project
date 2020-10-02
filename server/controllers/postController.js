const {Post,User} = require("../models")
// const langDetector = require("../helpers/langDetector")
const axios = require("axios")

const langDetection = axios.create({
    baseURL: 'https://ws.detectlanguage.com/0.2',
    params: {
        key:`f5b71845d0474070cc048f4bc1162091`
        // key:`demo`
    }
})
const deezer = axios.create({
    baseURL: 'https://api.deezer.com'
})

class PostController{
    static getAllPost(req,res,next){
        console.log("fetching data<< server");
        let allPost
        let query = ""
        Post.findAll({include:[User]})
            .then(result=>{
                console.log(result);
                allPost = result
                result.forEach(element => { 
                    const kalimat = element.description.split(" ").join("+")
                    query += " "+kalimat
                });
                query = query.split(" ").join("&q[]=").slice(1)
                console.log(query);
                // res.status(200).json(result)
               return langDetection.get(`/detect?${query}`)    
            })
            .then((data)=>{
                // console.log(query); 
                // console.log(allPost);
                console.log(">>>>>>>>>>>");
                let detection = data.data.data.detections
                // console.log(detection)
                for(let i=0;i<allPost.length;i++){ 
                    allPost[i].dataValues.lang = detection[i][0].language
                }
                // console.log(allPost);
                res.status(200).json(allPost)
                // return deezer.get(`q=eminem`)
            })  
            .catch(err=>{
                console.log(err);
                res.status(500)
            })
    }
    static getPost(req,res,next){
        let id = req.body.id || req.params.id || 1 
        Post.findByPk(id)
            .then(result=>{
                res.status(200).json(result)
            })
            .catch(err=>{
                res.status(500)
            })
    }
    static postAdd(req,res,next){ 
        // console.log(req.userData);
        let UserId = req.userData.id
        let trackUrl
        let {title, description, story, songs} = req.body
        // https://api.deezer.com/search?q=eminem
            deezer.get(`/search?q=${songs}`) 
                .then(result=>{
                    trackUrl =result.data.data[0].preview
                    let data = {title, description, story, songs, UserId, trackUrl}
                    return Post.create(data)
                })
                .then(result=>{
                    res.status(201).json(result) 
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500)
                })
        // console.log(data);
        //     
        //     .catch(err=>{
        //         res.status(500)
        //     })
    }
    static putPost(req,res,next){ 
        // let userId = req.userData.id || 1
        //let userId = 1
        let {title, description, story, songs} = req.body
        let data = {title, description, story, songs}
        console.log(data, req.params.id);
        Post.update(data,{where:{id:req.params.id},returning:true})
            .then(result=>{
                res.status(201).json(result) 
            })
            .catch(err=>{
                console.log(err);
                res.status(500)
            })
    }static deletePost(req,res,next){ 
        // let userId = req.userData.id || 1
        let userId = 1 
        Post.destroy({where:{id:req.body.id}})
            .then(result=>{
                res.status(201).json(result) 
            })
            .catch(err=>{
                console.log(err);
                res.status(500)
            })
    }

}

module.exports = PostController