const welcomeBanner = document.getElementById('welcome-banner')

const signOut = document.getElementById('signout')

welcomeBanner.innerText += ' ' + window.localStorage.getItem('username')

signOut.addEventListener('click', () => {
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('userID')
})