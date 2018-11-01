const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

const env = "development";
const config = require("./knexfile.js")[env];
const knex = require("knex")(config);
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// GET ALL

// KNEX RAW SOLUTION
// app.get("/posts", (req, res) => {
//   knex.raw("SELECT * FROM posts").then(results => {
//     res.send(results.rows);
//   });
// });

// KNEX QUERY BUILDER SOLUTION
app.get("/posts", (req, res) => {
  knex("posts")
    .select("*")
    .then(results => {
      res.send(results);
    });
});

// GET SINGLE

// KNEX RAW SOLUTION
// app.get("/posts/:id", (req, res) => {
//   knex.raw(`SELECT * FROM posts WHERE id=${req.params.id}`).then(results => {
//     res.send(results.rows);
//   });
// });

// KNEX QUERY BUILDER SOLUTION
app.get("/posts/:id", (req, res) => {
  knex("posts")
    .select("*")
    .where("id", req.params.id)
    .then(results => {
      res.send(results);
    });
});

// POST

// KNEX RAW SOLUTION
app.post("/posts", (req, res) => {
  knex
    .raw(
      `INSERT INTO posts(content, author) VALUES('${req.body.content}', '${
        req.body.author
      }')`
    )
    .then(() => {
      res.sendStatus(200);
    });
});

// KNEX QUERY BUILDER SOLUTION

// PUT

// DELETE

app.listen(port, () => {
  console.log(`port running on : ${port}`);
});
