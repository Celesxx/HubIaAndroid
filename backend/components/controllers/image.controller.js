const Player = require('../models/image.js');
const mongoose = require('mongoose');

exports.createImage = (req, res) => 
{
    const image = new Image(
    {
        name : req.body.name,
        content : req.body.content,
        type : req.body.type
    });

    image.save().then(image => 
    {
        res.status(200).json(image);
    }).catch(err => 
    {
        res.status(500).json(
        {
            message: "Fail!",
            error: err.message
        });
    });
};
  
exports.getImages = (req, res) => 
{
    Image.find().select('-__v').then(ImageInfos => 
    {
        res.status(200).json(ImageInfos);
    }).catch(error => {
        console.log(error);
        res.status(500).json(
        {
            message: "Error!",
            error: error
        });
    });
};


exports.getImage = (req, res) => 
{
    Image.find({image_id : req.params.id})
    .then(image => 
    {
        res.status(200).json(image);
    }).catch(err => 
    {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Image not found with id " + req.params.id,
                  error: err
              });                
          }
          return res.status(500).send({
              message: "Error retrieving image with id " + req.params.id,
              error: err
          });
    });
};
 

exports.updateImage = (req, res) => {
    Image.updateOne({image_id: req.params.id},
    {
        type : req.body.type,
    }, {new: true})
    .then(image => 
    {
        if(!image) 
        {
            return res.status(404).send({
                message: "Error -> Can NOT update a image with id = " + req.params.id,
                error: "Not Found!"
            });
        }

    res.status(200).json(image);

    }).catch(err => {
        return res.status(500).send({
            message: "Error -a> Can not update a image with id = " + req.params.id,
            error: err.message
        });
    });
};

exports.deleteImage = (req, res) => 
{

    Image.remove({image_id : req.params.id})
    .then(image => {
        if(!image) {
            res.status(404).json({
            message: "Does Not exist a image with id = " + req.params.id,
            error: "404",
            });
        }
        res.status(200).json({});
    }).catch(err => {
        return res.status(500).send({
            message: "Error -> Can NOT delete a image with id = " + req.params.id,
            error: err.message
        });
    });
};