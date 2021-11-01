var express = require('express');
var googlehome = require('./google-home-notifier');
var bodyParser = require('body-parser');
var app = express();

const serverPort = process.env.PORT || 8091; // default port
const serverHost = process.env.HOST || 'localhost';

var deviceName = 'Google Home';
var ip = '192.168.1.20'; // default IP

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/google-home-notifier', urlencodedParser, function (req, res) {
  
  if (!req.body) return res.sendStatus(400)
  console.log(req.body);
  
  var file = req.body.file;
  
  if (req.query.ip) {
     ip = req.query.ip;
  }

  googlehome.ip(ip);
  googlehome.device(deviceName);

  if (file){
    try {
      var mp3_url = file;
      googlehome.play(mp3_url, function(notifyRes) {
        console.log(notifyRes);
        res.send(deviceName + ' will play sound from url: ' + mp3_url + '\n');
      });
    } catch(err) {
      console.log(err);
      res.sendStatus(500);
      res.send(err);
    }
  }else{
    res.send('Please GET "file=https%3A%2F%2Fexample.com%2Fhoge.mp3"');
  }
})

app.get('/google-home-notifier', function (req, res) {

  console.log(req.query);

  var file = req.query.file;

  if (req.query.ip) {
     ip = req.query.ip;
  }

  googlehome.ip(ip);
  googlehome.device(deviceName);

  if (file) {
    try {
      var mp3_url = file;
      googlehome.play(mp3_url, function(notifyRes) {
        console.log(notifyRes);
        res.send(deviceName + ' will play sound from url: ' + mp3_url + '\n');
      });
    } catch(err) {
      console.log(err);
      res.sendStatus(500);
      res.send(err);
    }
  }else{
    res.send('Please GET "file=https%3A%2F%2Fexample.com%2Fhoge.mp3"');
  }
})

app.listen(serverPort, function () {
  console.log('Endpoints:');
  console.log('    http://' + serverHost + ':' + serverPort + '/google-home-notifier');
  console.log('GET example:');
  console.log('curl -X GET http://' + serverHost + ':' + serverPort + '/google-home-notifier?file=https%3A%2F%2Fexample.com%2Fhoge.mp3');
	console.log('POST example:');
	console.log('curl -X POST -d "file=Hello Google Home" http://' + serverHost + ':' + serverPort + '/google-home-notifier');
})
