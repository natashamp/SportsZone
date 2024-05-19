import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const playerteams = await req.context.models.Playerteam.findAll();
  return res.send(playerteams);
});

router.get('/:playerteamId', async (req, res) => {
  const playerteam = await req.context.models.Playerteam.findByPk(
    req.params.playerteamId,
  );
  return res.send(playerteam);
});
router.get('/player/:playerId', async (req, res) => {
    const playerteams = await req.context.models.Playerteam.findAll({
        where: { playerId: req.params.playerId },
    });
    return res.send(playerteams);
});

router.get('/team/:teamId', async (req, res) => {
    const playerteams = await req.context.models.Playerteam.findAll({
        where: { teamId: req.params.teamId },
    });
    return res.send(playerteams);
}
);

router.post('/', async (req, res) => {
  const playerteam = await req.context.models.Playerteam.create({
    playerId: req.body.playerId,
    teamId: req.body.teamId,
    position: req.body.position,
  });

  return res.send(playerteam);
});

router.delete('/:playerteamId', async (req, res) => {
  const result = await req.context.models.Playerteam.destroy({
    where: { id: req.params.playerteamId },
  });
  return res.send(true);
});
  

router.delete('/playerId/:playerId/teamId/:teamId', async (req, res) => {
  const result = await req.context.models.Playerteam.destroy({
    where: { playerId: req.params.playerId, teamId: req.params.teamId},
  });
  return res.send(true);
});

export default router;
