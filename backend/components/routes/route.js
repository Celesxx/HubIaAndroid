var cors = require('cors');
module.exports = function(app) 
{
    app.use(cors());
    var playerController = require('../controllers/player.controller.js');
  
    app.post('/postPlayer', playerController.createPlayer);
    app.get('/getPlayer/:id', playerController.getPlayer);
    app.get('/getPlayers', playerController.getPlayers);
    app.put('/putPlayer/:id', playerController.updatePlayer);
    app.delete('/deletePlayer/:id', playerController.deletePlayer);
}