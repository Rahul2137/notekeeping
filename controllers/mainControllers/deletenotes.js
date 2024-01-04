const Note = require("../../models/Note");

const deletenotes = async (req, res) => {
  try {
    let note = await Note.findById(req.query.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.send(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ msg: "Successfully Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
};

module.exports = deletenotes;
