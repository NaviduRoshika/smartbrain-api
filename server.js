const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const DB= knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'sql12345',
    database : 'smartbrain-db'
  }
});

// DB.select('*').from('users').then(data=>{
// 	console.log(data);
// });

app.use(bodyParser.json());
app.use(cors());

//HOME
app.get('/',(req,res)=>{
	DB.select('*').from('users').then(users =>{
		res.json(users);
	}).catch(err =>res.status(404).json('users not found'));
});


//SIGNIN
app.post('/signin',(req,res)=>{
  signin.signinHandler(req,res,bcrypt,DB);
});

//REGISTER
app.post('/register',(req,res)=>{
      register.registerHandler(req,res,bcrypt,DB);
});

//PROFILE
app.get('/profile/:id',(req,res)=>{
	profile.profileHandler(req,res,DB);
});

//IMAGE
app.put('/image',(req,res)=>{
	image.imageHandler(req,res,DB);
});

//IMAGE API CALL
app.post('/imageurl',(req,res)=>{
	image.imageApiCallHandler(req,res);
});


app.listen(3000,()=>{
	console.log(`Here we go !!! ${process.env.PORT}`);
});

/*

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userid --> GET = user
/image --> PUT -->user
*/


//CREATE SERVER USING NODE
/*const app = require('http');

app.createServer((req,res)=>res.send('hii there'));

app.listen(3000,()=>{
	console.log('here we go');
});*/