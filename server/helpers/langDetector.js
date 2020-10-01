const axios = require("axios")

const langDetection = axios.create({
    baseURL: 'https://ws.detectlanguage.com/0.2',
    params: {
        // key:`f5b71845d0474070cc048f4bc1162091`
        key:`demo`
    }
})


function detectLanguage(kalimat){
    const query = kalimat.split(" ").join("+")
    console.log(query);
    langDetection.get(`/detect?q=${query}`)
        .then((result)=>{
            let detection = result.data.data.detections[0]
            // console.log(data.data.detections);
            return(detection)
        })
        .catch(err=>{
            console.log(err);
            return(err)
        })
} 

module.exports = detectLanguage