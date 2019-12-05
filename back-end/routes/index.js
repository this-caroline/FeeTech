const userController = require('../controllers').users
const cardController = require('../controllers').card
const amountController = require('../controllers').amount

module.exports = (app) => {
  app.post('/api/users', userController.create);
  app.get('/api/users', userController.list);
  app.put('/api/users/:userId', userController.update);
  app.delete('/api/users/:userId', userController.destroy);

  app.post('/api/card/:userId', cardController.create);
  app.get('/api/card/:userId', cardController.list);

  app.get('/api/amount', amountController.list);
  app.get('/api/amount/:userId', amountController.listOne);

}
