# TellMeYours-RestAPI
TellMeYours App is sosial media platform ...  : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response
* used third-party API
    > DetectLang
    > Weather
    > dezezer

###
POST/add
Create new story

Request Header
<Access_Token>

Request Body

request from body

Response(201)
```
{
    "id": 1,
    "title": "<cerita 2>",
    "description": "<cerita dua>",
    "story": "<Pada suatu hari kuturut ayah ke kota, naik ...>",
    "song": "<sunflowe>"
}
```

Response (500 - Bad request)
```
{
  "message": "Invalid request"
}
```



###
DELETE/edit/:id
delete story

Request Header
<Access_Token>

Request Body
```
{
  "id": 1
}
```
Response(201)
```
{
  "title": "<cerita>",
  "description": "<cerita dua>",
  "story": "<pada suatu hari kuturut ayah ke kota, naik...>",
  "due_date": "<due date to get insert into>"
}
```
Response (500 - Bad request)
```
{
  "message": "Invalid request"
}
```


###
POST/login
Login user

Request Header
<Access_Token>

Request Body
```
{
  "username": "<usernamae>",
  "password": "<dsfds%&^$$23434>",
}
```

Response(201)
```
{
  "username": "<usernamae>",
  "password": "<dsfds%&^$$23434>",
}
```

Response (500 - Bad request)
```
{
  "message": "Invalid request"
}
```

###
POST/register
Register new user

Request Header
Not needed

Request Body
```
{
  "fullName": "<full name>",
  "nickname": "<nickname>",
  "username": "<usernamae>",
  "email": "<email@mail.com>",
  "password": "<dsfds%&^$$23434>",
}
```

Response(201)
```
{
  "fullName": "<full name>",
  "nickname": "<nickname>",
  "username": "<usernamae>",
  "email": "<email@mail.com>",
  "password": "<dsfds%&^$$23434>",
}
```

Response (500 - Bad request)
```
{
  "message": "Invalid request"
}
```

###
GET MUSIC
get api dezezer.com

Request Header
Not needed

Request Body
Not needed


Response(201)
```
{
    "name":"id",
    "type": "<integer>"
},
{
    "name": "<tracks>",
    "type": "<records>"
}
```
Response (500 - Bad request)
```
{
  "message": "Invalid request"
}
```

####
GET API-detectLang
get api DetectLang
curl --location --request GET 'localhost:3000/langDetectAPI?q=malam%20ini%20aku%20sendiri'

Request Header


Request Body
Not needed


Response(201)

Response (500 - Bad request)
```
{
  "message": "Invalid request"
}
```

###
GET API-weather
get api weather
curl --location --request GET 'http://api.weatherstack.com/current?access_key=529c06974c2acdb7acbe59d70e31cf1b&query=Jakarta

Request Header
Not needed

Request Params
Not needed


Response(201)

Response (500 - Bad request)
```
{
  "message": "Invalid request"
}
```