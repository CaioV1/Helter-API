const router = require("express").Router();
const artistController = require("../controller/artist.controller");

router.post("/api/artist/", artistController.insertArtist);
router.get("/api/artist/", artistController.getArtists);
router.delete("/api/artist/:id", artistController.removeArtist);

exports.router = router;