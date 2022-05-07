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
    console.log(req.body);
    sequelize.query(`
          INSERT INTO users_fav(agent_name, agent_description, agent_image, user_id)
          VALUES('${agent_name}', '${agent_description}', '${agent_image}', ${user_id});
      `).then(dbRes => res.status(200).send(dbRes[0]))
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
  }

  // deleteFavorite: (req, res) => {
  //   sequelize.query(
  //     ``
  //   )
  // }

}