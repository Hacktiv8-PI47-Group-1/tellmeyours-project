$(document).ready(function () {
    if (localStorage.access_token) {
        // console.log("berhasil login");
        afterLogin()
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
    let email = $('#inputEmail').val()
    let password = $('#inputPassword').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            email,
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




function fetchData() {

    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(result => {
            console.log(result);
            result.forEach(data => {
                $('#todoTable').append(`
                `)
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