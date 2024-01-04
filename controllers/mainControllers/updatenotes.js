const Note = require("../../models/Note");

const updatenotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updateNote = {};
    if (title) {
      updateNote.title = title;
    }
    if (content) {
      updateNote.content = content;
    }
    if (title || content) {
      updateNote.lastUpdated = Date.now();
    }
    let note = await Note.findById(req.query.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.send(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.query.id,
      { $set: updateNote },
      { new: true }
    );
    res.status(201).json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
};

module.exports = updatenotes;
