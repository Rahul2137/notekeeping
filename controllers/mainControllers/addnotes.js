const Note = require("../../models/Note");

const addnotes = async (req, res) => {
  try {
    const note = new Note({
      user: req.user.id,
      title: req.body.title,
      content: req.body.content,
    });
    const savedNote = await note.save();
    res.status(201).json({ savedNote });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
};

module.exports = addnotes;
