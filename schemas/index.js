const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://3.37.88.243/spa_mall")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;