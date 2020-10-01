// $(document).ready(function () {
//     if (localStorage.access_token) {
//         // console.log("berhasil login");
//         afterLogin()
//     } else {
//         login()
//         // console.log(" tidak berhasil login");

//     }
// });


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
$('#logout').click(() => {
    // localStorage.removeItem('access_token')
    $('#emailLogin').val('')
    $('#passwordLogin').val('')
    localStorage.clear()
    login()
})