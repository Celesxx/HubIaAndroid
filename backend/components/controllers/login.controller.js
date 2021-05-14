const User = require('../models/user.model.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.getLogin = (req, res) => 
{
    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({ email: email }).select('-__v').then(result => 
    {
        if(result.email)
        {
            bcrypt.compare(password, result.password, (error, response) =>
            { 
                if(response)
                {
                    const id = result.id
                    const token = jwt.sign({id}, process.env.JWTSECRET, 
                    {
                        expiresIn: 300,
                    })

                    res.status(200).json({auth: true, token: token});
                }else{ res.status(300).json({auth: false, message: `Mauvais email/password`}) }
            });

        }else{ res.json({auth: false, message: `L'utilisateur n'existe pas`}) }

    }).catch(error => {
        console.log(error);
        res.status(500).json(
        {
            message: "Error!",
            error: error
        });
    });
};


exports.isAuth = (req, res) => 
{
    const token = req.headers["x-access-token"]

    if(!token)
    {
        res.json({ auth: false, message: "Merci de vous authentifier"})
    }else
    {
        jwt.verify(token, process.env.JWTSECRET, (error, decoded) =>
        {
            if(error)
            {
                res.json({ auth: false, message: "L'authentification n'a pas marché merci de réassayer."})
            }else
            {
                res.json({ auth: true })
            }
        })
    }
}