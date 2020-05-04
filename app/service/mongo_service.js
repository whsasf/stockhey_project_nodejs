const { visiter, accessory,stock, stock_latest } = require('../model/mongo_models');

async function getaccessory(){
  return await accessory.find({},{_id: 0,time_stamp: 1}).catch(err => {console.log(err.reason)})
};

async function getvisiter(){
  return await visiter.distinct('visit')
  .then(res => {return res.length})
  .catch(err => { console.log(err.reason)})
};

async function get_comp_full_data(myid){
  return await stock.find({ stock_id: myid },{_id: 0,time_stamp: 1,stock_value: 1})
  .then(res => {return res})
  .catch(err => { console.log(err.reason)})
};

async function insertvisiter(ele){
  return await visiter.updateOne({ visit: ele },{ visit: ele }, { upsert: true })
  .then(console.log('insert success'))
  .catch(err => { console.log(err.reason)})
};

async function gethalfStatisAll(country){
  // get all count
 return await stock_latest.countDocuments({ stock_come: country})
  .then(res => {return res})
  .catch(err => { console.log(err.reason)})
};

async function gethalfStatisUp(country){
 return await stock_latest.countDocuments({ stock_come: country, stock_percent: {$gte: 0}})
  .then(res => {return res})
  .catch(err => { console.log(err.reason)})
};

module.exports = {
  getaccessory,
  getvisiter,
  insertvisiter,
  get_comp_full_data,
  gethalfStatisAll,
  gethalfStatisUp
}
