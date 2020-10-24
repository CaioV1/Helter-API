const router = require("express").Router();
const artistController = require("../controller/ArtistController");

router.post("/api/artist/", artistController.insertArtist);
router.get("/api/artist/", artistController.getArtists);

exports.router = router;