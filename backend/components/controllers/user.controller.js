const Users = require('../models/user.model.js');
const bcrypt = require('bcrypt');

exports.createUser = (req, res) => {

    const password = req.body.password
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function(err, salt) 
    {
        bcrypt.hash(password, salt, function(err, hash) 
        {
            const user = new Users(
                {
                    email: req.body.email,
                    password: hash,
                    admin: req.body.admin
                });
            
                user.save().then(data => 
                {
                    res.status(200).json(data);
                }).catch(err => 
                {
                    res.status(500).json(
                    {
                        message: "Fail!",
                        error: err.message
                    });
                });
        })
    });
};
  
exports.users = (req, res) => 
{
    Users.find().select('-__v').then(userInfos => 
    {
        res.status(200).json(userInfos);
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
    Users.find({id: req.params.id})
    .then(user => 
    {
        res.status(200).json(user);
    }).catch(err => 
    {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "user not found with id " + req.params.id,
                  error: err
              });                
          }
          return res.status(500).send({
              message: "Error retrieving user with id " + req.params.id,
              error: err
          });
    });
};
 

exports.updateUser = (req, res) => 
{

    const password = req.body.password
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function(err, salt) 
    {
        bcrypt.hash(password, salt, function(err, hash) 
        {
            Users.updateOne({id: req.params.id},
            {
                email: req.body.email,
                password: hash,
                admin: req.body.admin

            }, {new: true})
            .then(user => 
            {
                if(!user) 
                {
                    return res.status(404).send({
                        message: "Error -> Can NOT update a user with id = " + req.params.id,
                        error: "Not Found!"
                    });
                }

            res.status(200).json(user);

            }).catch(err => {
                return res.status(500).send({
                    message: "Error -> Can not update a user with id = " + req.params.id,
                    error: err.message
                });
            });
        });
    });
};

exports.deleteUser = (req, res) => 
{
    let userId = req.params.id

    Users.remove({id:userId})
    .then(user => {
        if(!user) {
            res.status(404).json({
            message: "Does Not exist a user with id = " + userId,
            error: "404",
            });
        }
        res.status(200).json({});
    }).catch(err => {
        return res.status(500).send({
            message: "Error -> Can NOT delete a user with id = " + userId,
            error: err.message
        });
    });
};