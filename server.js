const express 	= require('express');
const app	= express();

const bodyParser = require('body-parser');
const util	= require('util');

const speakeasy = require('speakeasy');
const qrcode	= require('qrcode');

const MongoClient = require('mongodb').MongoClient

let db;

const config = {
	'db-url' : 'mongodb://127.0.0.1:27017'
};

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended : true }));

app.use((req, res, next) => { console.log("%s request on %s", req.method, req.path); next(); });

app.get('/login', (req, res) => res.render('login'));
app.post('/login', (req, res) => {
	console.log("%s just signed in!", req.body.username);
	res.send(req.body);
});

app.get('/register', (req, res) => res.render('register'));
app.post('/register', (req, res) => {
	console.log("%s just signed up!", req.body.username);
	res.send(req.body);
});

app.get('/home', (req, res) => res.render('home'));

MongoClient.connect(config['db-url'], (err, client) => {
  if (err) return console.log(err)
  db = client.db('otp-demo') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000');
  })
})



