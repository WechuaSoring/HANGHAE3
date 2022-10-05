const express = require('express');
const app = express();
const port = 3000;
const connect = require("./schemas");
connect();

app.get('/', (req, res) => {
  res.send('항해 3주차 제출 /api');
});

app.use(express.json());
const postsRoudter = require("./routes/posts");
const commentsRoudter = require("./routes/comments");
app.use("/api", [postsRoudter, commentsRoudter]);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});