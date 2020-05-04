const mongoose = require('../db_init/conn').mongoose;

const visiterSchema = new mongoose.Schema({
    visit: String
  },{versionKey: false});

const accessorySchema = new mongoose.Schema({
  us2rmb_rate: Number,
  hk2rmb_rate: Number,
  time_stamp: String
},{versionKey: false});

const stockSchema = new mongoose.Schema({
  stock_id: String,
  time_stamp: String,
  stock_area: String,
  stock_name: String,
  stock_value: Number,
  stock_percent: Number,
  stock_come: String
},{versionKey: false});

const stockSchema2 = new mongoose.Schema({
  stock_id: String,
  time_stamp: String,
  stock_area: String,
  stock_name: String,
  stock_value: Number,
  stock_percent: Number,
  stock_come: String,
  status_flag: Number
},{versionKey: false});

const visiter = mongoose.model('visiter', visiterSchema,'visiter');
const accessory = mongoose.model('accessory', accessorySchema,'accessory');
const stock = mongoose.model('stock', stockSchema,'stock');
const stock_latest = mongoose.model('stock_latest', stockSchema2,'stock_latest');
module.exports = { visiter, accessory, stock, stock_latest }
