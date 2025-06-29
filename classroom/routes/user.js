    const express = require("express");
    const router = express.Router();

    router.get("/", (req, res) => {
        res.send("Hi I am root");
    });

    router.get("/", (req, res) => {
        res.send("GET for users");
    });

    router.get("/:id", (req, res) => {
        res.send("GET for user ID");
    });

    router.post("/", (req, res) => {
        res.send("POST sent for user");
    });

    router.delete("/:id", (req, res) => {
        res.send("DELETE user");
    });

    module.exports = router;
