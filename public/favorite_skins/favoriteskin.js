let userID = window.localStorage.getItem('userID');
let agentContainer = document.querySelector('#skins__container')
const displayFavorites = () => {

    axios.get('http://localhost:4004/api/favoriteskin/', {
    params: {
            user_id: `${userID}`
        }
    }
    )
    .then((res) => {
        console.log(res.data[0].skin_name)
        console.log(res.data.length)
        console.log(res.data)
    
    if(res.data.length === 0){
    noData = document.createElement('div')
    noData.id = 'noData'
    noData.innerHTML = `<p> You have no skins in your wishlist! </p>`
    agentContainer.appendChild(noData)
    }
    for(let i = 0; i < res.data.length; i++) {
        let name = res.data[i].skin_name
        const favSkin = document.createElement('div')
        favSkin.id = name;
        favSkin.className = 'favSkinCard'
        favSkin.innerHTML = `<h2 class="favSkinName"id=${name}>${res.data[i].skin_name}</h2>
        <img id='skin' src=${res.data[i].agent_image} />
        <div class="centerDelete">
            <button class='deleteBtn' id="agent-${i}">Delete</button>
        </div>
        `
        agentContainer.appendChild(favSkin)
    
        let x = document.querySelector(`#agent-${i}`)
        x.addEventListener('click', () => 
        deleteFavorite(name)
            )
        }
    })
}

const deleteFavorite = (name) => {
    let {agent_skin} = name;
    console.log('hit')
    console.log(name)
    console.log(agent_skin)

    axios.delete(`http://localhost:4004/api/favoriteskin/${name}`).then(res => { 
        console.log(res.data)
        console.log(name)
        const element = document.getElementById(name)
        element.remove();
        alert(`${name} deleted!`)

    })
}

const signOut = document.getElementById('signout')

signOut.addEventListener('click', () => {
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('userID')
})

displayFavorites()