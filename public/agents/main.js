let userID = window.localStorage.getItem('userID');
const agentContainer = document.querySelector('#agent__container')


var config = {
  method: 'get',
  url: 'https://valorant-api.com/v1/agents',
  headers: { }
};

    axios(config) 
    .then(function (res) {
      
    for(let i = 0; i < res.data.data.length; i++){
      if(res.data.data[i].isPlayableCharacter === true){
      let name = res.data.data[i].displayName;
      let description = res.data.data[i].description
      let abilities = res.data.data[i].abilities
     
      const agentCard = document.createElement('div')
      agentCard.id = name
      agentCard.className = 'agentCard'
      agentCard.innerHTML = `<h2 class='agentName' id=${name}>${name}</h2>
      <div class='centerBtn'>
      <button id='agent-${i}' class='favBtn'>Add to Favorite</button>
      </div>
      <img id='agent' src=${res.data.data[i].fullPortrait} />
      <p class='agentDescription'>${description}</p>
      <p></p>
      `
     
      abilities.map(ability => {
        let slot = document.createElement('h3')
        slot.className = 'slot'
        let abilityName = document.createElement('h4')
        abilityName.className='abilityName'
        let abilityDescription = document.createElement('p')
        abilityDescription.className = 'abilityDescription'
        slot.innerText = ability.slot;
        abilityName.innerText = ability.displayName;
        abilityDescription.innerText = ability.description;
        abilityName.appendChild(abilityDescription)
        slot.appendChild(abilityName)
        agentCard.appendChild(slot)
      })

      agentContainer.appendChild(agentCard)

      let x = document.querySelector(`#agent-${i}`)
      x.addEventListener('click', () => favorite(res.data.data[i]))

    }
  }
  
      }
    )
    .catch(function (error) {
      console.log(error);
    });

    const favorite = (body) => {
      let {displayName, description, fullPortrait} = body

      let newDescription = description.replaceAll("'", '')
      let newImage = fullPortrait.replaceAll("'", '')

      let bodyObj = {
        agent_name: displayName,
        agent_description: newDescription,
        agent_image: newImage,
        user_id: `${userID}`

      }
      axios.post(`http://localhost:4004/api/favorite`, bodyObj).then( res => {
      console.log(res.data)
      console.log('favorite success')
      alert('Added to favorites!')
    }).catch(err => {
      console.log(err)
      alert("Agent already exists in Favorites!")
    })}

    const signOut = document.getElementById('signout')

    signOut.addEventListener('click', () => {
        window.localStorage.removeItem('username')
        window.localStorage.removeItem('userID')
    })

    const welcomeBanner = document.getElementById('welcome-banner')
    welcomeBanner.innerText += ' ' + window.localStorage.getItem('username') + '!' + ' Read more about the agents and select your favorite!'



