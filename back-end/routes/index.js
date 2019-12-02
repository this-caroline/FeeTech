const userController = require('../controllers').users
const cardController = require('../controllers').card

module.exports = (app) => {
  app.post('/api/users', userController.create);
  app.get('/api/users', userController.list);
  app.put('/api/users/:userId', userController.update);
  app.delete('/api/users/:userId', userController.destroy);

  app.post('/api/card', cardController.create);

}
