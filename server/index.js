import fs from 'fs'
import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import bodyParser from 'body-parser'
import session from 'express-session'
import methodOverride from 'method-override'
import multer from 'multer'

var PostgreSqlStore = require('connect-pg-simple')(session);
var path = require('path');
var secrets = require('./secrets');
var connection = require('../knexfile.js').connection;

import api from './api'

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

var lockit_config = require('./lockit.js');
var Lockit = require('lockit');

app.set('port', port)

// X-Powered-By header has no functional value.
// Keeping it makes it easier for an attacker to build the site's profile
// It can be removed safely
app.disable('x-powered-by');
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', false);
app.set('view engine', 'jade');

// Body parser, to access req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(methodOverride());

app.set('trust proxy', 'loopback');

var sess = {
  resave: true,
  saveUninitialized: false,
  secret: secrets.sessionSecret,
  proxy: true, // The "X-Forwarded-Proto" header will be used.
  name: 'sessionId',
  // Add HTTPOnly, Secure attributes on Session Cookie
  // If secure is set, and you access your site over HTTP, the cookie will not be set
  cookie: {
    httpOnly: true
  },
  store: new PostgreSqlStore({
    conString: `postgres://${connection.user}:${connection.password}@${connection.host}:5432/${connection.database}`
  })
};

var node_env = process.env.NODE_ENV;
console.log('Environment: ' + node_env);
if (node_env === 'production') {
  sess.cookie.secure = true; // Serve secure cookies
}

app.use(session(sess));

app.use(function(req, res, next){
  // console.log(req)
  res.locals.req = req;
  next();
})

var lockit = new Lockit(lockit_config);
//只能用jade,不能用pug,因為lockit的layout.jade吃的位置
app.use(lockit.router);

// you now have all the routes like /login, /signup, etc.
// and you can listen on events. For example 'signup'
lockit.on('signup', function(user, res) {
  console.log('a new user signed up');
});

lockit.on('login', function(user, res) {
  console.log('a new user login');
  // res.redirect(`/#/auth?token=${user.authenticationToken}`);
  // res.redirect('/');   // set signup.handleResponse to 'false' for this to work
});

lockit.on('logout', function(user, res) {
  console.log('logout');
  res.redirect('/#/logout');
});

// Import API Routes
app.use('/api', api)



// var createFolder = function(folder){
//   try{
//     fs.accessSync(folder);
//   }catch(e){
//     fs.mkdirSync(folder);
//   }
// };
// var uploadFolder = './upload/';
// createFolder(uploadFolder);




// var upload = multer({ dest: 'uploads/' })
// app.post('/upload', upload.single('logos'), function(req,res,next){
//   var file = req.file;
//   console.log("名稱︰%s",file.originalname);
//   console.log("mime︰%s",file.mimetype);
//
//   //以下代碼得到檔案後綴
//   name = file.originalname;
//
//   console.log(name);
//
//   nameArray = name.split('');
//   var nameMime = [];
//   l = nameArray.pop();
//   nameMime.unshift(l);
//   while( nameArray.length != 0 && l != '.'){
//     l = nameArray.pop();
//     nameMime.unshift(l);
//   } //Mime是檔案的後綴
//   Mime=nameMime.join('');
//   console.log(Mime);
//   res.send("done");
//   //重命名檔案 加上檔案後綴
//   fs.renameSync('./upload/' + file.filename , './upload/' + file.filename + Mime );
// });

// var xlsxUrl;
// app.get('/gift_bag/file/:y/:p', function(req, res, next){
//   console.log("name:",req.params.y);
//   console.log("tel:",req.params.p);
//   console.log(req.url);
//   // var objRE = new RegExp(req.url, "/^\d{5}/$");
//   xlsxUrl = req.url;
// });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, req.url);
    // console.log(req.url);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
    // console.log('sd');
  }
});
var upload = multer({ storage: storage });
// var upload = multer({ dest: 'uploads/' });
app.post('/gift_bag/upload/:y/:p',upload.single('xlsxUp'), function(req, res, next){
  console.log("年ppp:",upload);
  console.log("年:",req.params.y);
  console.log("地:",req.params.p);
  // console.log('ddf',req.df );
  var file = req.file;
  console.log('文件类型：%s', file.mimetype);
  console.log('原始文件名：%s', file.originalname);
  console.log('文件大小：%s', file.size);
  console.log('文件保存路径：%s', file.path);
});


var uploadimg = multer({ dest: 'uploads/' });
app.post('/upload',uploadimg.single('logos'), function(req, res, next){
  console.log("年ppp:",upload);
  console.log("年:",req.params.y);
  console.log("地:",req.params.p);
  // console.log('ddf',req.df );
  var file = req.file;
  console.log('文件类型：%s', file.mimetype);
  console.log('原始文件名：%s', file.originalname);
  console.log('文件大小：%s', file.size);
  console.log('文件保存路径：%s', file.path);
});



// router.get('/export',(req,res,next)=>{
//   //查询数据库
//   let realPath = path.join(TMP_PATH, fileName);
//   let writeStream = fs.createWriteStream(realPath);
//   let bom = new Buffer('\xEF\xBB\xBF', 'binary');
//   writeStream.write(bom);
//   //写入数据内容
//   writeStream.end();
//   writeStream.on('finish', ()=> {
//     res.download(realPath, outName, (err)=> {
//       fs.unlink(realPath, (err2)=> {
//         if (err2) {
//           logger.error('删除文件失败,err=' + err);
//         }
//
//       });
//       if (err) {
//         logger.error(err);
//         res.status(404).end();
//       }
//
//     });
//   });
// });


// app.post('/upload', upload.single('logos'), function(req, res, next){
//   res.send({ret_code: '0'});
//   // file.path('/upload/asd');
//   var file = req.file;
//   console.log('文件类型：%s', file.mimetype);
//   console.log('原始文件名：%s', file.originalname);
//   console.log('文件大小：%s', file.size);
//   console.log('文件保存路径：%s', file.path);
// });


// var upload = multer();
// router.post('/gift_bag/file/upload', upload.fields([{name: 'logos', maxCount: 1}]),function(req,res,next){
//   var inputFiles = req.files; //未传时为undefined
//   //读取文件内容
//   var content = inputFiles['inputFile'][0].buffer.toString();
//
// });




app.get('/form', function(req, res, next){
  var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
  res.send(form);
});


// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)

console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
