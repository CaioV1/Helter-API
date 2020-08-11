const router = require("express").Router();
const userController = require("../controller/userController.js");

router.get("/api/user", userController.getUsers);
router.post("/api/user", userController.insertUser);
router.put("/api/user", userController.updateUser);
router.delete("/api/user", userController.deleteUser);

exports.router = router;