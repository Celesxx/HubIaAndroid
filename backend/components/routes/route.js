var cors = require('cors');
module.exports = function(app) 
{
    app.use(cors());
    var playerController = require('../controllers/player.controller.js');
    var userController = require('../controllers/user.controller.js');
  
    app.post('/postPlayer', playerController.createPlayer);
    app.get('/getPlayer/:id', playerController.getPlayer);
    app.get('/getPlayers', playerController.getPlayers);
    app.put('/putPlayer/:id', playerController.updatePlayer);
    app.delete('/deletePlayer/:id', playerController.deletePlayer);

    app.post('/postUser', userController.createUser);
    app.get('/getUser/:id', userController.getUser);
    app.get('/getUsers', userController.getUsers);
    app.put('/putUser/:id', userController.updateUser);
    app.delete('/deleteUser/:id', userController.deleteUser);
}