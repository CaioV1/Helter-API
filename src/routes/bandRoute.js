const router = require("express").Router();
const bandController = require("../controller/BandController");

router.post("/api/band/", bandController.insertBand);
router.get("/api/band/", bandController.getBands);

exports.router = router;