const express = require("express");
const router = express.Router();
const Artist = require("../models/artist");
const Messages = require("../../messages/messages");

router.get("/", (req,res,next) => {
    res.json({
        message:"Artist - GET",
        album: "2022",
        artist: "Bob Marley"
    });
});

router.post("/", (req,res,next) => {
    const newArtist = new Artist({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        artist: req.body.artist
    });

    // write to the database
    newArtist.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Artist Saved", 
                album: "2022",
                artist:{
                    firstName: result.firstName,
                    lastName: result.lastName,
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


router.get("/:artistId", (req,res,next) => {
    const artistId = req.params.authorId;

    Artist.findById(artistId)
    .select("name _id")
    .populate("song", "title artist")
    .exec()
    .then(artist => {
        if(!artist){
            console.log(artist);
            return res.status(404).json({
                message: Messages.artist_not_found
            })
        }
        res.status(201).json({
            artist: artist
        })
    })
    .catch(err => {
        res.status(500).json({
            err: {
            message: err.message
            }
        })
    })
});

router.patch("/:artistId", (req,res,next) => {
    const artistId = req.params.artistId;
    
    const updatedArtist = {
        title: req.body.title,
        artist: req.body.artist
    };

    Artist.updateOne({
        _id: artistId,
    }, {
        $set: updatedArtist
    }).then(result => {
        res.status(200).json({
            message: "Updated Artist", 
            album: "2022",
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

router.delete("/:artistId", (req,res,next) => {
    const artistId = req.params.artistId;
    
    Artist.deleteOne({
        _id: artistId
    })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Artist Deleted", 
            request: {
                method: "GET",
                url: "http://localhost:3000/artist/" + artistId
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
});

module.exports = router;