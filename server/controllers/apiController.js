const axios = require("axios")
const deezer = axios.create({
    baseURL: 'https://api.deezer.com'
})

const langDetection = axios.create({
    baseURL: 'https://ws.detectlanguage.com/0.2',
    params: {
        // key:`f5b71845d0474070cc048f4bc1162091`
        key:`demo`
    }
})

class ApiController{
    static detectLanguage(req, res, next){
        const query = req.query.q.split(" ").join("+")
        console.log(query);
        langDetection.get(`/detect?q=${query}`)
            .then((result)=>{
                let detection = result.data.data.detections[0]
                // console.log(data.data.detections);
                res.status(200).json(detection)
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json(err)
            })
    } 
}

module.exports = ApiController