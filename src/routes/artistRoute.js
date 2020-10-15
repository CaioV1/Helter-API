const router = require("express").Router();
const artistController = require("../controller/artistController.js");

router.post("/api/artist/", artistController.insertArtist);
router.get("/api/artist/", artistController.getArtists);

exports.router = router;