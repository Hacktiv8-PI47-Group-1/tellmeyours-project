const axios = require("axios")
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('841246734810-ph9ikv3p8ae847gkere5m2b359glabpe.apps.googleusercontent.com');
const {User} = require("../models")
const {signToken} = require("../helpers/jwt")
const weatherStack = axios.create({
    baseURL: 'http://api.weatherstack.com/current',
    params:{
        access_key : "529c06974c2acdb7acbe59d70e31cf1b",
        query : "Jakarta"
    }
})
 

class ApiController{ 
    static getWeather(req,res,next){
        weatherStack.get()
            .then(result=>{
                res.status(200).json({
                    location:result.data.request.query,
                    weather:result.data.current
                })
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json(err)
            })
    }


    static postGoogleLogin(req,res,next){ 
        let token =  req.body.id_token
        // console.log(token);  
        let randomedPass = Math.round(Math.random()*100000)+1000000
        // console.log(randomedPass);
        client.verifyIdToken({idToken:token})
            .then(payload=>{
                // console.log(payload.payload);
                return User.findOrCreate({ 
                    defaults: {
                    fullname: payload.payload.name, 
                    email: payload.payload.email,
                    password: randomedPass+""
                    },
                    where: {
                    email:payload.payload.email
                    }
                })
            })
            .then(user=>{ 
                let userData = {id:user[0].id ,fullname: user[0].fullname,email:user[0].email}
                // console.log(userData);
                let token = signToken(userData)
                res.status(200).json({"access_token":token}) 
            })
            .catch(err=>{
                next(err) 
            }) 
    }
}

module.exports = ApiController