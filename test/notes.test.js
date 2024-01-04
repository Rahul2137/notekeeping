const request = require("supertest");
const app = require("../index");
const assert = require("assert");
const { updateMany } = require("../models/User");

async function runTest() {
  let authToken;
  let noteId;

  describe("Login Endpoint", async () => {
    it("should authenticate a user and return a token", (done) => {
      request(app)
        .post("/api/auth/login")
        .send({ email: "rkr1234@gmail.com", password: "1234" })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.ok(res.body.authToken);
          authToken = res.body.authToken;
          done();
        });
    });

    it("should access /getnotes using the obtained token", (done) => {
      request(app)
        .get("/api/notes/getnotes")
        .set("Authorization", `${authToken}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.ok(res.body);
          done();
        });
    });

    it("should add a note /createnote using the obtained token", (done) => {
      request(app)
        .post("/api/notes/createnote")
        .set("Authorization", `${authToken}`)
        .send({ title: "To-do List", content: "Assignment Exam" })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          savedNote = res.body.savedNote;
          assert.ok(res.status == 201);
          assert.ok(
            savedNote.title == "To-do List" &&
              savedNote.content == "Assignment Exam"
          );
          noteId = res.body.savedNote._id;
          done();
        });
    });

    it("should update a note /updatenote using the obtained token, and given note ID", (done) => {
      request(app)
        .put("/api/notes/updatenote/?id=" + noteId)
        .set("Authorization", `${authToken}`)
        .send({ content: "Assignment" })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          updatedNote = res.body.note;
          assert.ok(res.status == 201);
          assert.ok(
            updatedNote.title == "To-do List" &&
              updatedNote.content == "Assignment"
          );
          done();
        });
    });

    it("should delete a note /deletenote using the obtained token, and given note ID", (done) => {
      request(app)
        .delete("/api/notes/deletenote/?id=" + noteId)
        .set("Authorization", `${authToken}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.ok(res.status == 200);
          done();
        });
    });
  });
}

runTest();
