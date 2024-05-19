import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const teams = await req.context.models.Team.findAll();
  return res.send(teams);
});

router.get('/:teamId', async (req, res) => {
  const team = await req.context.models.Team.findByPk(
    req.params.teamId,
  );
  return res.send(team);
});

router.get('/location/:location', async (req, res) => {
  const teams = await req.context.models.Team.findAll({
    where: { location: req.params.location },
  });
  return res.send(teams);
});



router.post('/', async (req, res) => {
  const team = await req.context.models.Team.create({
    teamName: req.body.teamName,
    numMembers: req.body.numMembers,
    location: req.body.location,
    sport: req.body.sport,
    captain: req.body.captain,
  });

  return res.send(team);
});
  /*
CREATE TABLE teams (
teamName
numMembers 
location
sport
captain
  */

router.delete('/:teamId', async (req, res) => {
  const result = await req.context.models.Team.destroy({
    where: { id: req.params.teamId },
  });

  return res.send(true);
});

export default router;
