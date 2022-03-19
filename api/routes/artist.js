const express = require("express");
const router = express.Router();

router.get("/", (req,res,next) => {
    res.json({
        message:"Artist - GET"
    });
});

router.post("/", (req,res,next) => {
    res.json({
        message:"Artist - POST"
    });
});

router.get("/:artistId", (req,res,next) => {
    const artistId = req.params.artistId;
    res.json({
        message:"Artist - GET",
        id: artistId
    });
});

router.patch("/:artistId", (req,res,next) => {
    const artistId = req.params.artistId;
    res.json({
        message:"Artist - PATCH",
        id: artistId
    });
});

router.delete("/:artistId", (req,res,next) => {
    const artistId = req.params.artistId;
    res.json({
        message:"Artist - DELETE",
        id: artistId
    });
});

module.exports = router;