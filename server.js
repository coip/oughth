const express 	= require('express');
const app	= express();

const speakeasy = require('speakeasy');
const qrcode	= require('qrcode');

const MongoClient = require('mongodb').MongoClient
let db;

const config = {
	'db-url' : 'mongodb://127.0.0.1:27017'
};

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/home', (req, res) => res.render('home'));

MongoClient.connect(config['db-url'], (err, client) => {
  if (err) return console.log(err)
  db = client.db('otp-demo') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})



