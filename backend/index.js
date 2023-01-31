const express = require("express");
const database = require("./src/db/knex");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("hello world");
});
app.post("/user/register", (req, res) => {
  const { user } = req.body;
    bcrypt.hash(user?.password, 12).then((hashed_password) => {
      return database("users")
        .insert({
          email: user?.email,
          password: hashed_password,
          first_name: user?.firstName,
          last_name: user?.lastName,
        })
        .returning("*")
        .then((users) => {
          const user = users[0];
          res.json({ user });
        })
        .catch((error) => {
          res.json({ error: error.message });
        });
    });
});

app.post("/user/login", (req, res) => {
  const { user } = req.body;
    database("users")
      .where({ email: user?.email })
      .first()
      .then((retrievedUser) => {
        if (!retrievedUser) res.status(401);
        bcrypt.compare(user?.password, retrievedUser.password).then((results) => {
          if (results === false) {
            res.status(401).json({
              mesage: "Wrong Password!",
            });
          }
          const payload = { email: user?.email };
          const secret = "SECRET";
          jwt.sign(payload, secret, (error, token) => {
            if (error)
              res.status(401).json({
                mesage: error.message,
              });
            res.json({ token, ...user });
          });
        });
      });
});
app.listen(5000, () => console.log("Server is running on 5000"));
