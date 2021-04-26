const Player = require('../models/user.js');
const mongoose = require('mongoose');

exports.createUser = (req, res) => 
{
    const user = new User(
    {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        mail : req.body.mail,
        username : req.body.username,
        password : md5(req.body.password),
        score : req.body.score,
        token : req.body.token
    });

    user.save().then(user => 
    {
        res.status(200).json(user);
    }).catch(err => 
    {
        res.status(500).json(
        {
            message: "Fail!",
            error: err.message
        });
    });
};
  
exports.getUsers = (req, res) => 
{
    User.find().select('-__v').then(UserInfos => 
    {
        res.status(200).json(UserInfos);
    }).catch(error => {
        console.log(error);
        res.status(500).json(
        {
            message: "Error!",
            error: error
        });
    });
};


exports.getUser = (req, res) => 
{
    User.find({user_id : req.params.id})
    .then(user => 
    {
        res.status(200).json(user);
    }).catch(err => 
    {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "User not found with id " + req.params.id,
                  error: err
              });                
          }
          return res.status(500).send({
              message: "Error retrieving user with id " + req.params.id,
              error: err
          });
    });
};
 

// exports.updatePlayer = (req, res) => {
//     Player.updateOne({player_id: req.params.id},
//     {
//         username : req.body.username,
//         score : req.body.score
//     }, {new: true})
//     .then(player => 
//     {
//         if(!player) 
//         {
//             return res.status(404).send({
//                 message: "Error -> Can NOT update a player with id = " + req.params.id,
//                 error: "Not Found!"
//             });
//         }

//     res.status(200).json(player);

//     }).catch(err => {
//         return res.status(500).send({
//             message: "Error -a> Can not update a player with id = " + req.params.id,
//             error: err.message
//         });
//     });
// };

exports.deleteUser = (req, res) => 
{

    User.remove({user_id : req.params.id})
    .then(user => {
        if(!user) {
            res.status(404).json({
            message: "Does Not exist a user with id = " + req.params.id,
            error: "404",
            });
        }
        res.status(200).json({});
    }).catch(err => {
        return res.status(500).send({
            message: "Error -> Can NOT delete a user with id = " + req.params.id,
            error: err.message
        });
    });
};