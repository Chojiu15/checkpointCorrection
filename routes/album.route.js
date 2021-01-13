const albumRouter = require('express').Router()
const models = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

albumRouter.post('/', (req, res) => {
    models
    .Album
    .create(req.body)
    .then(album => album.addTrack(req.body.TrackId))
    .then(album => res.json(album))
})

albumRouter.get('/:id', (req, res) => {
    models
    .Album
    .findByPk(req.params.id, {
        include : [models.Track]
    })
    .then(album => res.json(album))
})

albumRouter.delete('/:id', (req, res) => {
    models
    .Album
    .destroy({
        where : {
            id : req.params.id
        }
    })
    .then(res.end('Album deleted'))
})

albumRouter.delete('/:albumId/remove-track/:trackId', (req, res) => {
    models
    .Album
    .findByPk(req.params.albumId)
    .then(track => {
        track.removeTrack(req.params.trackId)
    })
    res.end('Track from the album has been deleted')
})

albumRouter.put('/:id', (req, res) => {
    models
    .Album
    .update(req.body, {
        where : {
            id : req.params.id
        }
    })
    .then(res.end('Album updated'))
})


albumRouter.get('/', (req, res) => {
    if(req.query.genre && req.query.artist){
        models
        .Album
        .findAll({
            where : {
                genre : {
                    [Op.like] : `%${req.query.genre}%`
                },
                artist : {
                    [Op.like] : `%${req.query.artist}%`

                }
            },
            include : [models.Track]
        },)
        .then(album => res.json(album))

    }
    // else if(req.query.artist){
    //     models
    //     .Album
    //     .findAll({
    //         where : {
    //             artist : {
    //                 [Op.like] : `%${req.query.artist}%`
    //             }
    //         },
    //         include : [models.Track]

    //     })
    //     .then(album => res.json(album))

    // }
    // else{
    //     models
    //     .Album
    //     .findAll({
    //         include : [models.Track]
    //     })
    //     .then(album => res.json(album))
    // }
})


module.exports = albumRouter