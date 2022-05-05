// const getResidents = document.querySelector('#button')
const agentContainer = document.querySelector('#agent__container')

var config = {
  method: 'get',
  url: 'https://valorant-api.com/v1/agents',
  headers: { }
};

    axios(config) 
    .then(function (res) {
    for(let i = 0; i < res.data.data.length; i++){
      let abilities = res.data.data[i].abilities
      
      let name = res.data.data[i].displayName;
      let description = res.data.data[i].description
      // for(let j = 0; j < res.data.data.length; j++){
      //   abilityName = res.data.data[i].abilities[j].displayName
      // }
      const agentCard = document.createElement('div')
      let agent = document.createElement('h2')
      agent.id = 'agentName';
      var button = document.createElement("button");
      button.innerHTML = "Add to Favorite";
      button.id = 'favBtn';
      var image = document.createElement('img')
      image.width = 512;
      image.height = 512;
      image.id = "agent"
      let agentDesc = document.createElement('p')
      let agentAbilName = document.createElement('p')


      image.src = res.data.data[i].fullPortrait
      agent.textContent = name;
      agentDesc.textContent = description;
      // agentAbilName.textContent = abilityName;
      
       agentContainer.appendChild(agent);
       agentContainer.appendChild(button);
       agentContainer.appendChild(image);
       agentContainer.appendChild(agentDesc);
       agentContainer.appendChild(agentAbilName);
       abilities.map(ability => {
        let slot = document.createElement('h3')
        let abilityName = document.createElement('h4')
        let abilityDescription = document.createElement('p')
        slot.innerText = ability.slot;
        abilityName.innerText = ability.displayName;
        abilityDescription.innerText = ability.description;
        abilityName.appendChild(abilityDescription)
        slot.appendChild(abilityName)
        agentContainer.appendChild(slot)
      })

    }
    var x = document.querySelectorAll('#favBtn');
    for(let i = 0; i < x.length; i++){
      x[i].addEventListener('click', favoriteSubmitHandler)
    }
      }
    )
    .catch(function (error) {
      console.log(error);
    });

    const favorite = () => axios.post(`http://localhost:4004/api/favorite`,body).then( res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
      alert('Uh oh. Your request did not work.')
    })

function favoriteSubmitHandler(e) {
  e.preventDefault()
    
  let agentName = document.querySelector('#agentName')

    
  let bodyObj = {
      agentName: agentName.value,
  }
    
  favorite(bodyObj)
    
  agentName.value = ''
  
}
    