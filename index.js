const express = require("express");
const app = express();
const mysql = require("mysql");
const port = process.env.port || 3000;
const cors = require("cors");

app.use(cors());
app.use(express.static("public"));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "oqtavewallets"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the database!");
});

app.get("/getMensWallets", (req, res) => {
  console.log(req.ip);
  con.query("SELECT * FROM items WHERE category='Wallet-Men'", function(
    err,
    result,
    fields
  ) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.get("/getItemById", (req, res) => {
  const id = req.query.id;
  console.log(id);
  con.query(`SELECT * FROM items WHERE id='${id}'`, function(
    err,
    result,
    fields
  ) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Server started at ${port}.....`);
});
