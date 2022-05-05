require('dotenv').config()
const Sequelize = require('sequelize')

const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect:'postgres',
    dialectOptions:{
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        DROP TABLE IF EXISTS users_fav;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS agents;

        create table users (
            user_id serial primary key, 
            username varchar(20),
            first_name varchar(100), 
            last_name varchar(100), 
            email varchar(50), 
            password varchar(30)
        );

        create table agents (
            agent_id serial primary key,
            agent_name varchar(30),
            agent_description varchar(10000),
            agent_ability_1 varchar(10000),
            agent_ability_2 varchar(10000),
            agent_ability_3 varchar(10000),
            agent_ability_4 varchar(10000)
        );

        create table users_fav (
            users_fav serial primary key, 
            user_id integer references users(user_id), 
            agent_id integer references agents(agent_id),
            agent_name varchar(30),
            agent_description varchar(10000),
            position varchar(50)
        );
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}