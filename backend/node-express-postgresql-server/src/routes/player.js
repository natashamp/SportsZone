import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const players = await req.context.models.Player.findAll();
  return res.send(players);
});

router.get('/:playerId', async (req, res) => {
  const player = await req.context.models.Player.findByPk(
    req.params.playerId,
  );
  return res.send(player);
});

router.post('/', async (req, res) => {
  const player = await req.context.models.Player.create({
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    dob: req.body.dob,
    location: req.body.location,
    sport: req.body.sport,
  });

  return res.send(player);
});
  /*
  
CREATE TABLE players (
id SERIAL PRIMARY KEY,
fullname VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL,
password VARCHAR(50) NOT NULL,
dob DATE NOT NULL,
location VARCHAR(50) NOT NULL,
sport VARCHAR(50) NOT NULL
);
  */


router.delete('/:playerId', async (req, res) => {
  const result = await req.context.models.Player.destroy({
    where: { id: req.params.playerId },
  });

  return res.send(true);
});


router.get('/login/:email', async (req, res) => {
  const player = await req.context.models.Player.findOne({
    where: { email: req.params.email},
  });
  if (!player) {
    return res.status(401).send('Invalid email');
  }
  return res.send(player);
});

export default router;
