const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = process.env.PORT || 3001

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'testuser001',
  password: 'admin',
  database: 'history'
});

app.get("/api", (req, res) => {
  res.set({ 'Access-Control-Allow-Origin': '*' });
  connection.query(
    'SELECT * FROM `user`',
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      res.json(results);
    }
  );
  console.log("接続終了(正常)");
});

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.post('/insert', (req, res) => {
  res.set({ 'Access-Control-Allow-Origin': '*' });
  console.log(req.body)
  res.send('OK')
})

app.listen(port, () => {
  console.log(`listening on *:${port}`);
})