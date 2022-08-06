const skinsContainer = document.querySelector('#skins__container')
let userID = window.localStorage.getItem('userID');

var config = {
    method: 'get',
    url: 'https://valorant-api.com/v1/weapons/skins',
    headers: { }
  };
  
      axios(config) 
      .then(function (res) { 
        for(let i = 0; i < res.data.data.length; i++){
            let name = res.data.data[i].displayName;
    
            const skinCard = document.createElement('div')
            skinCard.id = name
            skinCard.className = 'skinCard'
            skinCard.innerHTML = `<h2 class='skinName' id=${name}>${name}</h2>
            <div class='centerBtn'>
            <button id='skin-${i}' class='wishlistBtn'>Add to Wishlist</button>
            </div>
            <img id='skin' src=${res.data.data[i].chromas[0].fullRender} />
            `
            skinsContainer.appendChild(skinCard)

            let x = document.querySelector(`#skin-${i}`)

            x.addEventListener('click', 
            () => favorite(body = {
              displayName: res.data.data[i].displayName,
              fullRender: res.data.data[i].chromas[0].fullRender
          }))
        }
      
      })
      .catch(function (error) {
        console.log(error);
      });

      const favorite = (body) => {
        let {displayName, fullRender} = body
  
        let bodyObj = {
          skin_name: displayName,
          agent_image: fullRender,
          user_id: `${userID}`
  
        }
        console.log("This is the body being sent to back end", bodyObj)

        axios.post(`http://localhost:4004/api/favoriteSkin`, bodyObj).then( res => {
        alert('Added to wishlist!')
      }).catch(err => {
        alert(`${displayName} already exists in your wishlist!`)
      })}

    
const signOut = document.getElementById('signout')

signOut.addEventListener('click', () => {
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('userID')
})
