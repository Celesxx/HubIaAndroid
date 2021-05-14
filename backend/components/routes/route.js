var cors = require('cors');
module.exports = function(app) 
{
    app.use(cors());
    
    var playerController = require('../controllers/player.controller.js');
    var tagController = require('../controllers/tag.controller.js');
    var userController = require('../controllers/user.controller.js');
    var loginController = require('../controllers/login.controller.js');
  
    app.post('/postPlayer', playerController.createPlayer);
    app.get('/getPlayer/:id', playerController.getPlayer);
    app.get('/getPlayers', playerController.getPlayers);
    app.put('/putPlayer/:id', playerController.updatePlayer);
    app.delete('/deletePlayer/:id', playerController.deletePlayer);

    app.post('/postTag', tagController.createTag);
    app.get('/getTag/:id', tagController.getTag);
    app.get('/getTags', tagController.getTags);
    app.put('/putTag/:id', tagController.updateTag);
    app.delete('/deleteTag/:id', tagController.deleteTag);

    app.post('/postUser', userController.createUser);
    app.get('/getUser/:id', userController.getUser);
    app.get('/getUsers', userController.users);
    app.put('/putUser/:id', userController.updateUser);
    app.delete('/deleteUser/:id', userController.deleteUser);

    app.post('/login', loginController.getLogin)
    app.get('/userAuth', loginController.isAuth)
}