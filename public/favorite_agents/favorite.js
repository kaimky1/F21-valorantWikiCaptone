let userID = window.localStorage.getItem('userID');
let agentContainer = document.querySelector('#agent__container')

const displayFavorites = () => {

    axios.get('http://localhost:4004/api/favorite/', {
        params: {
            user_id: `${userID}`
        }
    })
    .then((res) => {
        if(res.data.length === 0){
            noData = document.createElement('div')
            noData.id = 'noData'
            noData.innerHTML = `<p> You have no favorited agents. </p>`
            agentContainer.appendChild(noData)
        }
        for(let i = 0; i < res.data.length; i++) {
            let name = res.data[i].agent_name
            const favAgent = document.createElement('div')
            favAgent.id = name;
            favAgent.className = 'favAgentCard'
            favAgent.innerHTML = `<h2 id=${name}>${res.data[i].agent_name}</h2>
            <img id='agent' src=${res.data[i].agent_image} />
            <p>${res.data[i].agent_description}</p>
            <div class="centerDelete">
                <button class='deleteBtn' id="agent-${i}">Delete</button>
            </div>
            `
            agentContainer.appendChild(favAgent)

            let x = document.querySelector(`#agent-${i}`)
            x.addEventListener('click', () => 
                deleteFavorite(name)
            )
        }
    })
}

const deleteFavorite = (name) => {
    let {agent_name} = name;
    axios.delete(`http://localhost:4004/api/favorite/${name}`).then(res => { 
        const element = document.getElementById(name)
        element.remove();
        alert(`${name} deleted!`)

    })
}

displayFavorites();

const signOut = document.getElementById('signout')

signOut.addEventListener('click', () => {
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('userID')
})
