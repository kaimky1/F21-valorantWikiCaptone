let userID = window.localStorage.getItem('userID');
let agentContainer = document.querySelector('#agent__container')

const displayFavorites = () => {

    axios.get('http://localhost:4004/api/favorite/', {
        params: {
            user_id: `${userID}`
        }
    })
    .then((res) => {
        console.log(res.data)

        for(let i = 0; i < res.data.length; i++) {


            const favAgent = document.createElement('div')
            favAgent.id = res.data[i].agent_name;
            favAgent.innerHTML = `<h2 id=${name}>${res.data[i].agent_name}</h2>
            <img id='agent' src=${res.data[i].agent_image} />
            <p>${res.data[i].agent_description}</p>
            <p></p>
            `
            agentContainer.appendChild(favAgent)
        }
    })
}

displayFavorites();