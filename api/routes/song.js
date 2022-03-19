const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Song = require("../models/song");

router.get("/", (req,res,next) => {
    res.json({
        message:"Song - GET"
    });
});

router.post("/", (req,res,next) => {
    const newSong = new Song({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        artist: req.body.artist
    });

    // write to the database
    newSong.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Song Saved", 
                song:{
                    title: result.title,
                    artist: result.artist,
                    id: result._id,
                    metadata: {
                        method: req.method,
                        host: req.hostname
                    }
                }
            })
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).json({
                error: {
                    message: err.message
                }
            })
        });
});

router.get("/:songId", (req,res,next) => {
    const songId = req.params.songId;
    res.json({
        message:"Song - GET",
        id: songId
    });
});

router.patch("/:songId", (req,res,next) => {
    const songId = req.params.songId;
    
    const updatedSong = {
        title: req.body.title,
        artist: req.body.artist
    };

    Song.updateOne({
        _id: songId,
    }, {
        $set: updatedSong
    }).then(result => {
        res.status(200).json({
            message: "Updated Song", 
            song: {
                title: result.title, 
                artist: result.artist, 
                id: result._id
            },
            metadata: {
                host: req.hostname,
                method: req.method
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error:{
                message: err.message
            }
        })
    });
});

router.delete("/:songId", (req,res,next) => {
    const songId = req.params.songId;
    res.json({
        message:"Song - DELETE",
        id: songId
    });
});

module.exports = router;