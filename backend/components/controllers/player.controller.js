const Player = require('../models/player.model.js');
const mongoose = require('mongoose');

exports.createPlayer = (req, res) => 
{
    const player = new Player(
    {
        username : req.body.username,
        score : req.body.score
    });

    player.save().then(player => 
    {
        res.status(200).json(player);
    }).catch(err => 
    {
        res.status(500).json(
        {
            message: "Fail!",
            error: err.message
        });
    });
};
  
exports.getPlayers = (req, res) => 
{
    Player.find().select('-__v').then(playerInfos => 
    {
        res.status(200).json(playerInfos);
    }).catch(error => {
        console.log(error);
        res.status(500).json(
        {
            message: "Error!",
            error: error
        });
    });
};


exports.getPlayer = (req, res) => 
{
    Player.find({player_id: req.params.id})
    .then(player => 
    {
        res.status(200).json(player);
    }).catch(err => 
    {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "player not found with id " + req.params.id,
                  error: err
              });                
          }
          return res.status(500).send({
              message: "Error retrieving player with id " + req.params.id,
              error: err
          });
    });
};
 

exports.updatePlayer = (req, res) => {
    Player.updateOne({player_id: req.params.id},
    {
        username : req.body.username,
        score : req.body.score
    }, {new: true})
    .then(player => 
    {
        if(!player) 
        {
            return res.status(404).send({
                message: "Error -> Can NOT update a player with id = " + req.params.id,
                error: "Not Found!"
            });
        }

    res.status(200).json(player);

    }).catch(err => {
        return res.status(500).send({
            message: "Error -> Can not update a player with id = " + req.params.id,
            error: err.message
        });
    });
};

exports.deletePlayer = (req, res) => 
{

    Player.remove({player_id: req.params.id})
    .then(player => {
        if(!player) {
            res.status(404).json({
            message: "Does Not exist a player with id = " + req.params.id,
            error: "404",
            });
        }
        res.status(200).json({});
    }).catch(err => {
        return res.status(500).send({
            message: "Error -> Can NOT delete a player with id = " + req.params.id,
            error: err.message
        });
    });
};