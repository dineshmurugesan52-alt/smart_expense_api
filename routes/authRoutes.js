const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
console.log(authController.register);
router.get("/", (req, res) => {
    res.send("Welcome to the Auth Route");
});
router.get("/register", (req, res) => {

    res.send("Welcome to the Register Route");} );
router.post("/register", authController.register);

router.post("/login", authController.login);

module.exports = router;
