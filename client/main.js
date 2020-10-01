$(document).ready(function () {
    if (localStorage.access_token) {
        // console.log("berhasil login");
        afterLogin()
        console.log("loggedin");
    } else {
        login()
        // console.log(" tidak berhasil login");

    }
});


function afterLogin() {
    $('#login').hide()
    $('#register').hide()
    $('#mainNav').show()
    $('#landingPage').show()
    $('#profile').show()
    fetchData()
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
                <div class="h5 m-0">@LeeCross</div>
                <div class="h7 text-muted">Miracles Lee Cross</div>
            </div>
        </div>
    </div>

</div>
<div class="card-body">
    <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> Hace 40 min</div>
    <a class="card-link" href="#">
        <h5 class="card-title">Totam non adipisci hic! Possimus ducimus amet,
            dolores
            illo
            ipsum quos
            cum.</h5>
    </a>

    <p class="card-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sunt fugit
        reprehenderit
        consectetur
        exercitationem odio,
        quam nobis? Officiis, similique, harum voluptate, facilis voluptas pariatur
        dolorum
        tempora
        sapiente
        eius maxime quaerat.
    </p>
</div>
</div>

`



function fetchData() { 
    console.log("fetching data");
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/post',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(result => {
            console.log(result);
            $("#postContainer").empty()
            result.forEach(data => {
                $('#postContainer').append(cardHtml)
            });
        })
        .fail((error) => {
            console.log('error', error);
        })
} 

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


const URL = `http://127.0.0.1:3000/`

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