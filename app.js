const Koa = require('koa')
const app = new Koa()
app.proxy = true;
const views = require('koa-views')
const static = require('koa-static')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const favicon = require('koa-favicon');

const index = require('./routes/index')
const users = require('./routes/users')

const {
  connect,
  close
} = require('./app/db_init/conn');

const { insertvisiter } = require('./app/service/mongo_service');

//open mongodb
//app.use(async (context, next) => {
  connect();
  //await close()
//})

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

//static path
app.use(static(__dirname + '/public'))

// favicon
app.use(favicon(__dirname + '/public/images/favicon.ico')); 

//view template path
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const timestamp = new Date().toLocaleString();
  
  //get ip
  //const getUserIp = (req) => {
  //  return req.headers['x-forwarded-for'] ||
  //    req.connection.remoteAddress ||
  //    req.socket.remoteAddress ||
  //    req.connection.socket.remoteAddress;
  //}

  await next()
  
  // write source client ip address into db at last
  const temp1 = timestamp.split(' ')[0];
  const temp2 = timestamp.split(' ')[2];
  const temp3 = temp1.slice(0,temp1.length-1);
  const tty = temp3.split('/')[2];
  const ttm = temp3.split('/')[0];
  const ttm2 = ttm < 10 ? '0' + ttm : '' + ttm;
  const ttd = temp3.split('/')[1];
  const ttd2 = ttd < 10 ? '0' + ttd : '' + ttd;
  const source_ip_raw = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
  const source_ip = source_ip_raw.split(':').pop()
  //console.log(source_ip);
  const final = source_ip+'-'+tty+'-'+ttm2+'-'+ttd2+'-'+temp2;
  // insert into mongodb
  insertvisiter (final);
  console.log(final);


})

// routes
app.use(index.routes(), index.allowedMethods())
//app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
