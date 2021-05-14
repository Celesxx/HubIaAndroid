var cors = require('cors');
module.exports = function(app) 
{
    app.use(cors());
    
    var playerController = require('../controllers/player.controller.js');
    var tagController = require('../controllers/tag.controller.js');
    // var iaController = require('../controllers/ia.controller.js')
  
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

    // app.get('/', iaController.getCam)
}