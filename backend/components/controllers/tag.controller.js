const Tag = require('../models/tag.model.js');

exports.createTag = (req, res) => 
{
    res.header("Access-Control-Allow-Origin", "*");
    const tag = new Tag(
    {
        name : req.body.username,
        box : req.body.box,
        score : req.body.score,
        image : req.body.image
    });

    tag.save().then(tag => 
    {
        res.status(200).json(tag);
    }).catch(err => 
    {
        res.status(500).json(
        {
            message: "Fail!",
            error: err.message
        });
    });
};
  
exports.getTags = (req, res) => 
{
    Tag.find().select('-__v').then(tagInfos => 
    {
        res.status(200).json(tagInfos);
    }).catch(error => {
        console.log(error);
        res.status(500).json(
        {
            message: "Error!",
            error: error
        });
    });
};


exports.getTag = (req, res) => 
{
    Tag.find({player_id: req.params.id})
    .then(tag => 
    {
        res.status(200).json(tag);
    }).catch(err => 
    {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "tag not found with id " + req.params.id,
                  error: err
              });                
          }
          return res.status(500).send({
              message: "Error retrieving tag with id " + req.params.id,
              error: err
          });
    });
};
 

exports.updateTag = (req, res) => {
    Tag.updateOne({tag_id: req.params.id},
    {
        name : req.body.username,
        box : req.body.box,
        score : req.body.score,
        image : req.body.image
        
    }, {new: true})
    .then(tag => 
    {
        if(!tag) 
        {
            return res.status(404).send({
                message: "Error -> Can NOT update a tag with id = " + req.params.id,
                error: "Not Found!"
            });
        }

    res.status(200).json(tag);

    }).catch(err => {
        return res.status(500).send({
            message: "Error -> Can not update a tag with id = " + req.params.id,
            error: err.message
        });
    });
};

exports.deleteTag = (req, res) => 
{

    Tag.remove({tag_id: req.params.id})
    .then(tag => {
        if(!tag) {
            res.status(404).json({
            message: "Does Not exist a tag with id = " + req.params.id,
            error: "404",
            });
        }
        res.status(200).json({});
    }).catch(err => {
        return res.status(500).send({
            message: "Error -> Can NOT delete a tag with id = " + req.params.id,
            error: err.message
        });
    });
};