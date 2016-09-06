fs = require('fs')

const generateAlpahId = function(length = 12) {
  var raw = [];
  var hex = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (var i = 0; i < length; i++) {
    raw[i] = hex.charAt([Math.floor(Math.random() * hex.length)]);
  }
  return raw.join('');
}


var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')


var express = require('express')
var timeout = require('connect-timeout');

var app = new(express)()
var port = 3000

let cfgFile = __dirname + '/cfg.json'

function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

var compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))

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


  // fs.readFile(__dirname + '/cfg.json', 'utf8', function (err,data) {
  //   if (err) {
  //     res.sendStatus(500)
  //   } else {
  //     let cfg = JSON.parse(data)
  //     cleanupCfg(cfg)
  //     res.send(cfg)
  //   }
  // });
})

app.get("/cmd/cfg", function(req, res) {
  fs.readFile(cfgFile, 'utf8', function(err, data) {
    if (err) {
      res.sendStatus(500)
    } else {
      let cfg = JSON.parse(data)
      cleanupCfg(cfg)
      res.send(cfg)
    }
  });
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
