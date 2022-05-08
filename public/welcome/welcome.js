const welcomeBanner = document.getElementById('welcome-banner')

const signOut = document.getElementById('signout')


signOut.addEventListener('click', () => {
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('userID')
})
welcomeBanner.innerText += ' ' + window.localStorage.getItem('username')