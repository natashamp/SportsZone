import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const messages = await req.context.models.Message.findAll();
  return res.send(messages);
});

router.get('/:messageId', async (req, res) => {
  const message = await req.context.models.Message.findByPk(
    req.params.messageId,
  );
  return res.send(message);
});

router.get('/player/:playerId', async (req, res) => {
  const messages = await req.context.models.Message.findAll({
    where: { playerId: req.params.playerId },
  });
  return res.send(messages);
});

router.get('/team/:teamId', async (req, res) => {
  const messages = await req.context.models.Message.findAll({
    where: { teamId: req.params.teamId },
    order: [['createdAt', 'ASC']]
  });
  return res.send(messages);
});

router.post('/', async (req, res) => {
  const message = await req.context.models.Message.create({
    teamId: req.body.teamId,
    playerId: req.body.playerId,
    text: req.body.text,
  });

  return res.send(message);
});

router.delete('/:messageId', async (req, res) => {
  const result = await req.context.models.Message.destroy({
    where: { id: req.params.messageId },
  });

  return res.send(true);
});


router.delete('/team/:teamId/player/:playerId', async (req, res) => {
  const result = await req.context.models.Message.destroy({
    where: {
      playerId: req.params.playerId,
      teamId: req.params.teamId
    }
  });

  return res.send(true);
});

export default router;
