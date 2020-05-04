const mongoose = require('mongoose')

async function connect () {
  await mongoose.connect('mongodb://localhost:27017/stockdb', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    poolSize: 10,
    //autoReconnect: true,
    socketTimeoutMS: 0,
    keepAlive: true,
    //reconnectTries: 30
  }).then(console.log("mongodb connection success"))
  .catch(err => {console.error(err.reason)});   //(res => console.log(res)); 
}

async function close () {
  await mongoose.connection.close().then( console.log("mongodb connection closed"))
  .catch(err => {console.error(err.reason)});
}
module.exports = {
  mongoose,
  connect,
  close
}
