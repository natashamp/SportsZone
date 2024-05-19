import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models, { sequelize } from './models';
import routes from './routes';

const app = express();

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware

app.use(async (req, res, next) => {
  req.context = {
    models
    //me: await models.User.findByLogin('rwieruch'),
  };
  next();
});

// * Routes * //

app.use('/session', routes.session);
app.use('/messages', routes.message);
app.use('/players', routes.player);
app.use('/teams', routes.team);
app.use('/playerteams', routes.playerteam);

// * Start * //

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createInitialData();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

const createInitialData = async () => {

  await models.Player.create(
    {
      fullname: 'Natasha Prabhoo',
      email: 'natasha@gmail.com',
      password: 'password123',
      dob: '2003-01-09',
      location: 'San Jose',
      sport: 'Basketball'
    },
  );

    await models.Player.create(
    {
      fullname: 'Sonya Prabhoo',
      email: 'sonya@gmail.com',
      password: 'password',
      dob: '2006-01-09',
      location: 'San Jose',
      sport: 'Basketball'
    },
  );
  /*
CREATE TABLE players (
teamName
numMembers 
location
sport
captain
  */

    await models.Team.create(
    {
      teamName: 'spartans',
      numMembers: '5',
      location: 'San Jose',
      sport: 'Basketball',
      captain: 'Space Man'
    },
  );


    await models.Team.create(
    {
      teamName: 'warriors',
      numMembers: '15',
      location: 'San Jose',
      sport: 'Basketball',
      captain: 'Jane Doe'
    },
  );

      await models.Team.create(
    {
      teamName: 'chargers',
      numMembers: '15',
      location: 'San Jose',
      sport: 'Basketball',
      captain: 'John F Kennedy'
    },
  );

        await models.Team.create(
    {
      teamName: 'broncos',
      numMembers: '15',
      location: 'San Jose',
      sport: 'Basketball',
      captain: 'John Doe'
    },
  );


  await models.Playerteam.create(
    {
      playerId: '2',
      teamId: '1',
      position: 'Teammate'

    },
  );

    await models.Playerteam.create(
    {
      playerId: '1',
      teamId: '1',
      position: 'Teammate'

    },
  );
      await models.Playerteam.create(
    {
      playerId: '2',
      teamId: '2',
      position: 'Teammate'

    },
  );

      await models.Playerteam.create(
    {
      playerId: '1',
      teamId: '3',
      position: 'Teammate'

    },
  );
};
