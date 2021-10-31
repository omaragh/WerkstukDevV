const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const owners = [{
  name: "hello",
  email: "hello@ehb.be"
}];

/**
 * [GET] /
 * returns "hello world" upon get request
 * @returns {object} with "message" param containing "hello world"
 */
app.get("/", (req, res) => {
  res.send({ message: "hello world" })
})

/**
 * [GET] /owner
 * @returns {Object} current owner object
 */
app.get("/owner", (req, res) => {
  res.json(owners);
})

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`);
});