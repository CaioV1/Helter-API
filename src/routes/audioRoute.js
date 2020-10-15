const router = require("express").Router();
const audioController = require("../controller/audioController.js");

router.get("/api/audio/play/:id", audioController.play);
router.get("/api/audio/", audioController.getAudios);
router.get("/api/audio/record/:record_id", audioController.getAudioByRecord);
router.post("/api/audio/", audioController.insert);

exports.router = router;