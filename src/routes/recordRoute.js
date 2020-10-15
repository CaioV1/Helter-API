const router = require("express").Router();
const recordController = require("../controller/recordController.js");

router.post("/api/record/", recordController.insertRecord);
router.get("/api/record/", recordController.getRecords);
router.get("/api/record/:id", recordController.getOneRecord);

exports.router = router;