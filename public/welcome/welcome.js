const welcomeBanner = document.getElementById('welcome-banner')

welcomeBanner.innerText += ' ' + window.localStorage.getItem('username')