const router = require('koa-router')();
const { getaccessory, getvisiter,get_comp_full_data } = require('../app/service/mongo_service');

router.get('/', async (ctx, next) => {
  await ctx.render('index');
  await next();
})

router.get('/rankindexcn', async (ctx, next) => {
  const latest_update_time =  await getaccessory().then(res => {return res[0]['time_stamp'] });
  const total_visits = await getvisiter();
  console.log('latest_update_time:',latest_update_time);
  console.log('total_visits:',total_visits);
  await ctx.render('rankdatacn', { latest_update_time2: latest_update_time,total_visits2: total_visits});
  await next();
})

router.get('/comp_full_data/:id', async (ctx, next) => {
  const id = ctx.params.id;
  // console.log(id);
  const full_data =  await get_comp_full_data(id).then(res => {return res });
  ctx.response.type = 'json';
  ctx.response.body = full_data;
  await next();
})

router.get('/rankindexus', async (ctx, next) => {
  const latest_update_time =  await getaccessory().then(res => {return res[0]['time_stamp'] });
  const total_visits = await getvisiter();
  console.log('latest_update_time:',latest_update_time);
  console.log('total_visits:',total_visits);
  await ctx.render('rankdataus', { latest_update_time2: latest_update_time, total_visits2: total_visits});
  await next();
})

router.get('/rankindexdata', async (ctx, next) => {
  const latest_update_time =  await getaccessory().then(res => {return res[0]['time_stamp'] });
  const total_visits = await getvisiter();
  ctx.response.type = 'json';
  ctx.response.body = {'date': latest_update_time, 'people': total_visits};
  await next();
})

router.get('/about', async (ctx, next) => {
  await ctx.render('about');
  await next();
})

router.all('/*', async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin","*");
//  console.log('hit 4');
  await next();
})

module.exports = router
