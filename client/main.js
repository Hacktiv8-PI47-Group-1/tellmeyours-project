$(document).ready(function () {
    if (localStorage.access_token) {
        // console.log("berhasil login");
        afterLogin()
        console.log("loggedin");
        // fetchData()
    } else {
        login()
        // console.log(" tidak berhasil login");

    }
});

function getWeather(){ 
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/api/weatherAPI'
    })
        .done(response => {
            $("#weather-location-label").empty()
            $("#weather-descriptions-label").empty()
            $("#weather-location-label").append(response.location)
            $("#weather-descriptions-label").append(response.weather.weather_descriptions)
            
            console.log(response.location); 
            console.log(response.weather.weather_descriptions); 
            
        })
        .fail((error) => {
            console.log('error', error);
        })
}

function afterLogin() {
    $('#login').hide()
    $('#register').hide()
    $('#mainNav').show()
    $('#landingPage').show()
    $('#profile').show()
    fetchData()
    getWeather()
}

function login() {
    $('#login').show()
    $('#register').hide()
    $('#mainNav').hide()
    $('#landingPage').hide()
    $('#profile').hide()
    
}

function register() {
    $('#login').hide()
    $('#register').show()
    $('#mainNav').hide()
    $('#landingPage').hide()
    $('#profile').hide()
}

function registerApp() {
    let fullName = $('#inputFullname').val()
    let nickName = $('#inputNickName').val()
    let username = $('#inputUsernameRegister').val()
    let email = $('#inputEmailRegister').val()
    let password = $('#inputPasswordRegister').val()

    console.log(fullName, nickName, username, email, password);

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user/register',
        data: {
            fullName,
            nickName,
            username,
            email,
            password
        }
    })
        .done(response => {
            console.log(response);
            localStorage.setItem('access_token', response.access_token)
            afterLogin()

        })
        .fail((error) => {
            console.log('error', error);
        })
}

function loginApp() {
    let username = $('#inputUsername').val()
    let password = $('#inputPassword').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user/login',
        data: {
            username,
            password
        }
    })
        .done(response => {
            localStorage.setItem('access_token', response.access_token)
            afterLogin()

        })
        .fail((error) => {
            console.log('error', error);
        })
}


$('#btn-register').on('click', (event) => {
    event.preventDefault()
    registerApp()
})
$('#btn-login').on('click', (event) => {
    event.preventDefault()
    loginApp()
})

$('#a-register').on('click', (event) => {
    event.preventDefault()
    register()

})
$('#a-cancel').on('click', (event) => {
    event.preventDefault()
    login()

})
$('#logout-btn').click(() => {
    // localStorage.removeItem('access_token')
    signOut()
    $('#emailLogin').val('')
    $('#passwordLogin').val('')
    localStorage.clear()
    login()
})


$('#share-btn').click(()=>{
    console.log("masuk");
    let story = $('#story-add-input').val()
    let title = $('#title-add-input').val()
    let description = $('#description-add-input').val()
    let songs = $('#song-add-input').val()

    console.log(story,title,description,song);
    
    $.ajax({
        url: `${URL}post/add`,
        method: "POST",
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            story,
            title,
            description,
            songs
        }
    })
        .done(result => {  
            // console.log(result);
        })
        .fail(err => {
            // console.log(err)
            // console.log(err.responseJSON.message);
        })
        .always(_ => { 
        })

    
})

const URL = `http://127.0.0.1:3000/`


function fetchData() { 
    console.log("fetching data");
    $.ajax({
        method: 'GET',
        url: `${URL}post`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(result => {  
            console.log(result);
            $("#postContainer").empty()
            result.forEach(data => {  
                let cardHtml = ` 
                <div class="card gedf-card" style=" margin-bottom: 20px;">
                <div class="card-header">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="mr-2">
                                <img class="rounded-circle" width="45"
                                    src="https://picsum.photos/50/50" alt="">
                            </div>
                            <div class="ml-2">
                                <div class="h5 m-0">@${data.User.username}</div>
                                <div class="h7 text-muted">${data.User.fullName}</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="card-body"> 
                    <a class="card-link" href="#">
                        <h5 class="card-title">${data.title}</h5>
                    </a>

                    <p class="card-text">
                        ${data.story}
                    </p>
                    <p class="card-text">
                        Language: ${data.lang}
                    </p>
                    <audio controls>
                        <source
                            src="${data.trackUrl}">
                        Your browser does not support the audio element.
                    </audio>
                </div>
                </div>

                `   
                $('#postContainer').append(cardHtml)
            });
        })
        .fail((error) => { 
            console.log('error', error);
        })
} 

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token); 
    $.ajax({
        url: `${URL}api/googleLogin`,
        method: "POST",
        data: {
            id_token,
        }
    })
        .done(result => { 
            console.log('berhasil login', result)
            localStorage.setItem('access_token', result.access_token) //set token di client
            afterLogin()
            function onSignIn(googleUser) {
                var id_token = googleUser.getAuthResponse().id_token;
                console.log(id_token); 
                $.ajax({
                    url: `${URL}google-login`,
                    method: "POST",
                    data: {
                        id_token,
                    }
                })
                    .done(result => { 
                        console.log('berhasil login', result)
                        localStorage.setItem('access_token', result.access_token) //set token di client
                        afterLogin()
                    })
                    .fail(err => {
                        console.log(err)
                        // console.log(err.responseJSON.message);
                    })
                    .always(_ => {
                        $('#email').val('')
                        $('#password').val('')
                    })
            }
            
            
              function signOut() {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                  console.log('User signed out.');
                });
              }
        })
        .fail(err => {
            console.log(err)
            // console.log(err.responseJSON.message);
        })
        .always(_ => {
            $('#email').val('')
            $('#password').val('')
        })
}

 
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }