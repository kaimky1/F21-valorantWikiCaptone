const bcrypt = require('bcryptjs');
require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres', 
  dialectOptions: {
      ssl: {
          rejectUnauthorized: false
      }
  }
})

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      const { username, password } = req.body
      sequelize.query(`
          SELECT * FROM users
            WHERE username = '${username}'
            AND password = '${password}'
      `).then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => console.log(err))
    },
    register: (req, res) => {
      const {  username, email, firstName, lastName, password } = req.body;
      sequelize.query(`
          INSERT INTO users(username, email, first_name, last_name, password)
          VALUES('${username}', '${email}', '${firstName}', '${lastName}', '${password}');
      `).then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => console.log(err))
  },

  favorite: (req, res) => {
    const {  agent_name, agent_description, agent_image, user_id  } = req.body;
    console.log(req.body)
    sequelize.query(`
      SELECT agent_name
      FROM users_fav
      WHERE user_id = ${user_id}
    `)
    .then(dbRes => {
      let inDB='';
      for(let i = 0; i < dbRes[0].length; i++){
        if(dbRes[0][i].agent_name != agent_name){
          inDB = false;
        } else if(dbRes[0][i].agent_name == agent_name){
          inDB = true;
          console.log('Is name in DB?', inDB)
          break;
        }
      }
      console.log("After loop:", inDB)
      if(inDB == false){
        sequelize.query(`
        INSERT INTO users_fav(agent_name, agent_description, agent_image, user_id)
        VALUES('${agent_name}', '${agent_description}', '${agent_image}', ${user_id});
          `)
          console.log(dbRes[0])
          res.status(200).send(dbRes[0])
      }else if(inDB == true){
        console.log("This should be true:", inDB)
        res.status(400).send("Error: Agent already exists in favorites")
      }
    })
      .catch(err => console.log(err))
  },

  favoriteSkin: (req, res) => {
    console.log("This is the request being recieved in the back end", req.body)
    const {  skin_name, agent_image, user_id  } = req.body;
      sequelize.query(`
      SELECT skin_name
      FROM users_favskin
      WHERE user_id = ${user_id}
    `)
    .then(dbRes => {
      let inDB='';
      console.log("This is before the loop", dbRes[0])
      for(let i = 0; i < dbRes[0].length; i++){
        if(dbRes[0][i].skin_name != skin_name || dbRes[0] == null){
          inDB = false;
        } else if(dbRes[0][i].skin_name == skin_name){
          inDB = true;
          console.log('Is name in DB?', inDB)
          break;
        }
      }
      console.log("After loop:", inDB)
      if(inDB == false){
        sequelize.query(`
        INSERT INTO users_favskin(skin_name, agent_image, user_id)
        VALUES('${skin_name}', '${agent_image}', ${user_id});
          `)
          res.status(200).send(dbRes[0])
      }else if(inDB == true){
        console.log("This should be true:", inDB)
        res.status(400).send("Error: Agent already exists in favorites")
      }
    })
      .catch(err => console.log(err))
  },

  getFavorite: (req, res) => {
    const { user_id } = req.query;
    console.log(req.params)
    console.log(req.query)
    sequelize.query(
    `SELECT agent_name, agent_description, agent_image FROM users_fav
    WHERE user_id = ${user_id} `
   ).then(dbRes => res.status(200).send(dbRes[0]))
   .catch(err => console.log(err))
  },

  getfavoriteSkin: (req, res) => {
    const { user_id } = req.query;
    console.log(req.params)
    console.log(req.query)
    sequelize.query(
    `SELECT skin_name, agent_image FROM users_favskin
    WHERE user_id = ${user_id} `
   ).then(dbRes => res.status(200).send(dbRes[0]))
   .catch(err => console.log(err))
  },

  deleteFavorite: (req, res) => {
    const { name } = req.params;
    console.log(req.params)
    console.log(name)
    sequelize.query(
      `DELETE FROM users_fav
      WHERE agent_name = '${name}'
      `
    ).then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
  },

  deleteFavoriteSkin: (req, res) => {
    const { name } = req.params;
    console.log(req.params)
    console.log(name)
    sequelize.query(
      `DELETE FROM users_favskin
      WHERE skin_name = '${name}'
      `
    ).then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
  }
}