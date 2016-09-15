fs = require('fs')

const generateAlpahId = function(length = 12) {
  var raw = [];
  var hex = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (var i = 0; i < length; i++) {
    raw[i] = hex.charAt([Math.floor(Math.random() * hex.length)]);
  }
  return raw.join('');
}


var devMode = !process.argv.find(s=>s==='production');
if(devMode){
  var webpack = require('webpack')
  var webpackDevMiddleware = require('webpack-dev-middleware')
  var webpackHotMiddleware = require('webpack-hot-middleware')
  var config = require('./webpack.config')
}



var express = require('express')
var timeout = require('connect-timeout');

var app = new(express)()
var port = devMode ? 3000 : 80

let cfgFile = __dirname + '/cfg.json'
let cfgFileDist = __dirname + '/cfg-dist.json'

function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

if(devMode){
  var compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
  app.use(webpackHotMiddleware(compiler))
}

app.get('/', function(req, res) {
  res.redirect('/ui/');
});

app.use(express.static('web'));

function cleanupCfg(cfg) {
  if (!cfg.version) {
    cfg.version = generateAlpahId();
  }
  let ids = {}
  cfg.beers.forEach(function(b) {
    if (!b.id || ids[b.id]) {
      b.id = generateAlpahId();
    }
    ids[b.id] = true
  })
}

app.post("/cmd/cfg", function(req, res) {
  let bodyStr = '';
  req.on("data", function(chunk) {
    bodyStr += chunk.toString();
  });
  req.on("end", function() {
    try {
      let cfg = JSON.parse(bodyStr)
      cleanupCfg(cfg)
      fs.writeFile(cfgFile, JSON.stringify(cfg, null, 3), (err) => {
        if (err) {
          res.sendStatus(500)
        } else {
          res.send(cfg)
        }
      });
    } catch (e) {
      res.sendStatus(400)
    }
  });
})

app.get("/cmd/cfg", function(req, res) {

  function sendCfg(file, retryFile){
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) {
        res.sendStatus(500)
      } else {
        try{
          let cfg = JSON.parse(data)
          cleanupCfg(cfg)
          res.send(cfg)
        } catch (e){
          console.log("Failed to load " + file)
          if(retryFile){
            sendCfg(retryFile)
          } else {
            res.sendStatus(500)
          }
        }
      }
    });
  }

  sendCfg(cfgFile,cfgFileDist)

})


app.get("/ui/*", function(req, res) {
  res.sendFile(__dirname + '/web/ui/index.html')
})


app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
