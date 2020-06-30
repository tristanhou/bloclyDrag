const koa = require('koa');
const app = new koa();
const mongoose = require('mongoose');
const koabody = require('koa-body');
const router = require('koa-router')();
const send = require('koa-send');

// const router = new Router();
const fs = require('fs');
const cors =require('koa2-cors');

mongoose.connect('mongodb://127.0.0.1:27017/blockly',{ useNewUrlParser: true })
app.use(koabody({
	multipart: true,
	formidable: {
		maxFileSize:200*1024*1024 
	}	
}))
// app.use(async ctx => {
//   ctx.body = 'hello world'
// })
app.use(cors({
		origin: function (ctx) {
			return ctx.header.origin;
		},
		exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
		maxAge: 5,
		credentials: true,
		allowMethods: ['GET', 'POST', 'DELETE'],
		allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
router.get('/', async (ctx)=>{
	ctx.body="首页";

})

router.post('/upload', async(ctx, next) => {

 console.log('kill');
 const file = ctx.request.files.file; // 获取上传文件
 const reader = fs.createReadStream(file.path); // 创建可读流
 const ext = file.name.split('.').pop(); // 获取上传文件扩展名
 const name = `${Math.random().toString()}.${ext}`
 const upStream = fs.createWriteStream(`uploads/${name}`); // 创建可写流
 const stream = reader.pipe(upStream); // 可读流通过管道写入可写流
 const pro  = new Promise((resolve, reject) => {
	stream.on('finish', () => {
		resolve(name)
	})
 })
 ctx.body = await pro;
 return  ctx
})
router.get('/download/:name', async (ctx) => {
	debugger
	console.log('进入下载页')
    const name = ctx.params.name;
    const path = `uploads/${name}`;
    ctx.attachment(path);
    await send(ctx, path);
})

app.use(router.routes());   /*启动路由*/
// const Cat = mongoose.model('Cat', { name: String })

// app.use(async () => {
//     // 实例化一个实体对象
//     const kitty = new Cat({ name: 'Zildjian' })
//     // 执行插入操作
//     const res = await kitty.save()
//     // 打印返回结果
//     console.log(res)
// })
app.listen(3000, () => {
	console.log('you application is running localhost:3000')
})
