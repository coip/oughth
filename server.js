const express 	= require('express');
const app	= express();

const bodyParser = require('body-parser');
const util	= require('util');

const bcrypt	= require('bcrypt');
const saltRounds = 15;
const sekret	= 'FAPWRFPIFSIZLT-UHFFFAOYSA-M'

const speakeasy = require('speakeasy');
const qrcode	= require('qrcode');

const MongoClient = require('mongodb').MongoClient

let db;

const addDocument 	= (doc, coln) => db.collection(coln).insertOne(doc, (err, response) => err ? console.log("err: %s", err) : console.log("inserted %s", response.ops[0]));
//const readDocument	= (doc, coln, res) => (db.collection(coln).findOne(doc, (err, response) => ( err ? console.log("err %s", err) : res.send(response))))
const readDocument	= (doc, coln, cb) => (db.collection(coln).findOne(doc, (err, response) => ( err ? console.log("err %s", err) : cb(response))))


const config = {
	'db-url' : 'mongodb://127.0.0.1:27017'
};

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended : true }));

app.use((req, res, next) => { console.log("%s request on %s", req.method, req.path); next(); });

app.get('/login', (req, res) => res.render('login'));
app.post('/login', (req, res) => {
	let username = req.body.username,
	    password = req.body.password;

	readDocument({ username }, 'users', 
	(result) => { 
		bcrypt.compare(password, result.password, 
			(err, response) => err ? res.send(err) : ( response === true ) ? res.send(200) : res.send(401));//res.send(response)) 
	});

});

app.get('/register', (req, res) => res.render('register'));
app.post('/register', (req, res) => {
	let username = req.body.username,
	    password = req.body.password;

	bcrypt.hash(password, saltRounds, (err, bcryptedpw) => {
		if(err) 
			res.send("register post err: %s", err)
		else {
			addDocument({ username, bcryptedpw }, 'users');
			res.send(200);
		}
	});
});

//app.get('/otp',

app.get('/home', (req, res) => res.render('home'));

MongoClient.connect(config['db-url'], (err, client) => {
  if (err) return console.log(err)
  db = client.db('otp-demo')
  app.listen(3000, () => {
    console.log('listening on 3000');
  })
})



