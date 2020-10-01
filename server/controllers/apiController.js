const axios = require("axios")
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
}

module.exports = ApiController