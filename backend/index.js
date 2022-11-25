const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql2')
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'testuser001',
  password: 'admin',
  database: 'history'
});

// urlencodedとjsonは別々に初期化する
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.listen(3001);
console.log('Server is online.');

app.post('/insert', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    //リクエストボディを出力
    sn = req.body.sn;
    info = req.body.info;
    connection.query(
      'INSERT into user VALUES (?, ?)', [sn, info],
      function(err, results, fields) {
        if(err) {
          console.log("接続終了(異常)");
          throw err;
        }
        res.json(results);
      }
    );
})

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
