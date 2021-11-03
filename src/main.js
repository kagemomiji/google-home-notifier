var express = require('express');
var googlehome = require('./google-home-notifier');
var app = express();
const { check, validationResult } = require('express-validator');

const serverPort = process.env.PORT || 8091; // default port
const serverHost = process.env.HOST || 'localhost';

const endpoint = () => {
  if(serverPort == 80) return "http://" + serverHost;
  else if (serverPort == 443) return "https://" + serverHost;
  else return "http://" + serverHost + ":" + serverPort ;
}
  
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post(
  '/google-home-notifier', 
  [
      check('address').isURL({require_protocol: false}),
      check('file').isURL({require_protocol: true}),
      check('name').not().isEmpty()
  ], (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array()});
    }
  
    console.log(req.body);

    var file = req.body.file;
    var ip = req.body.address;
    var deviceName = req.body.name;
  

    googlehome.ip(ip);
    googlehome.device(deviceName);

    try {
      var mp3_url = file;
      googlehome.play(mp3_url, function(notifyRes) {
        console.log(notifyRes);
        res.json({message: deviceName +  ' will play sound from url: ' + mp3_url });
      });
    } catch(err) {
      console.log(err);
      res.status(500).json({ errors: [err]});
    }
  }
)

app.listen(serverPort, function () {
  console.log('Endpoints:');
  console.log('    ' + endpoint() + '/google-home-notifier');
	console.log('POST example:');
	console.log('curl -X POST ' + endpoint() + '/google-home-notifier -H "Content-Type: application/json" -d \'{"file":"http://example.com/example.mp3", "address": "192.168.1.20","name":"GoogleHome"}');
})
