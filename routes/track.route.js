const trackRouter = require("express").Router();
const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
// const operatorAliases = {
//     $like : Op.like
// }

trackRouter.post("/", (req, res) => {
  models.Track.create(req.body).then((track) => {
    res.json(track);
  });
});


trackRouter.get("/:id", (req, res) => {
  models.Track.findByPk(req.params.id, {
    include: [models.Album],
  }).then((track) => res.json(track));
});

trackRouter.delete('/:id', (req, res) => {
    models
    .Track
    .destroy({
        where : {
            id : req.params.id
        }
    })
    .then(res.end('Song deleted'))
})

trackRouter.put('/:id', (req, res) => {
    models
    .Track
    .update(req.body, {
        where : {
            id : req.params.id
        }
    })
    .then(res.end('Song has been modified'))
})

trackRouter.get('/', (req, res) => {
    if(req.query.title){
        models
            .Track
            .findAll({
                where : {
                    title : {
                        [Op.like] : `%${req.query.title}%`
                    }
                },
                include : [models.Album]
            })
            .then(track => res.json(track))
    }

    else{
        models
            .Track
            .findAll({include : [models.Album]})
            .then(track => res.json(track))
    }
})




module.exports = trackRouter;
