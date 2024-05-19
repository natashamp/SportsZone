import Sequelize from 'sequelize';
import getMessageModel from './message';
import getPlayerModel from './player';
import getTeamModel from './team';
import getPlayerteamModel from './playerteam';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
  Message: getMessageModel(sequelize, Sequelize),
  Player: getPlayerModel(sequelize, Sequelize),
  Team: getTeamModel(sequelize, Sequelize),
   Playerteam: getPlayerteamModel(sequelize, Sequelize), 
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
