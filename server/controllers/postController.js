const {Post} = require("../models")

class PostController{
    static getAllPost(req,res,next){
        Post.findAll()
            .then(result=>{
                res.status(200).json(result)
            })
            .catch(err=>{
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
        // let userId = req.userData.id || 1
        let userId = 1
        let {title, description, story, songs} = req.body
        let data = {title, description, story, songs, UserId:userId}
        console.log(data);
        Post.create(data)
            .then(result=>{
                res.status(201).json(result) 
            })
            .catch(err=>{
                res.status(500)
            })
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