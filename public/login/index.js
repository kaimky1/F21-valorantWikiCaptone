const userContainer = document.querySelector('#user-info')
const loginForm = document.querySelector('#login-form')
const registerForm = document.querySelector('#register-form')


const baseURL = `http://localhost:4004/api`

//login
const login = body => axios.post(`${baseURL}/login`, body).then( res => {
  console.log(res.data)
  const {username, user_id} = res.data[0];
  window.localStorage.setItem('username', username)
  window.localStorage.setItem('userID', user_id)
  window.location.href = '../agents/agents.html'
}).catch(err => {
  console.log(err)
  alert('Entered wrong username and password!')
})

//register
const register = body => axios.post(`${baseURL}/register`, body).then(res => {
  console.log('registration successful!')
  alert('Registration was successful!')
}).catch(err => {
  console.log(err)
  alert('Uh oh. Your request did not work.')
})


//handler functions
function loginSubmitHandler(e) {
    e.preventDefault()

    let username = document.querySelector('#login-username')
    let password = document.querySelector('#login-password')

    if (!username.value) {
      alert("You must enter a username!")
      return
  } else if (!password.value) {
      alert("You must enter a password!")
      return
  }

    let bodyObj = {
        username: username.value,
        password: password.value
    }


    login(bodyObj)


    username.value = ''
    password.value = ''
   
}

function registerSubmitHandler(e) {
  e.preventDefault()

  let username = document.querySelector('#register-username')
  let email = document.querySelector('#register-email')
  let firstName = document.querySelector('#register-firstName')
  let lastName = document.querySelector('#register-lastName')
  let password = document.querySelector('#register-password')
  let password2 = document.querySelector('#register-password-2')

  if(!username.value){
    alert("Please enter a username")
    return
  }
  else if(!email.value){
    alert("You need to enter an email!")
    return
  }
  else if(!firstName.value){
    alert("Enter a first name")
    return
  }
  else if(!lastName.value){
    alert("Enter a last name")
    return
  }
  else if (password.value !== password2.value) {
    alert("Your passwords need to match.")
    return
  }

  let bodyObj = {
      username: username.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value
  }

  register(bodyObj)

  username.value = ''
  email.value = ''
  firstName.value = ''
  lastName.value = ''
  password.value = ''
  password2.value = ''
}


loginForm.addEventListener('submit', loginSubmitHandler)
registerForm.addEventListener('submit', registerSubmitHandler)