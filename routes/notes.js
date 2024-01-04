const express = require("express");
const Note = require("../models/Note");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const getnotes = require("../controllers/mainControllers/getnotes");
const addnotes = require("../controllers/mainControllers/addnotes");
const deletenotes = require("../controllers/mainControllers/deletenotes");
const updatenotes = require("../controllers/mainControllers/updatenotes");

router.get("/getnotes", fetchuser, getnotes);
router.post("/createnote", fetchuser, addnotes);
router.put("/updatenote/", fetchuser, updatenotes);
router.delete("/deletenote/", fetchuser, deletenotes);

module.exports = router;
