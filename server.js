var express = require('express'),
    fs = require('fs');

var app = express();

app.get('/',function (req,res) {
  var realPath = fs.realpathSync('./index/index.html');
  res.sendFile(realPath);
});

app.get('/index.html',function (req,res) {
  var realPath = fs.realpathSync('./index' + req.path);
  res.sendFile(realPath);
});

app.get('/cityWalk.html',function(req,res){
  var realPath = fs.realpathSync('./cityWalk' + req.path);
  res.sendFile(realPath);
})

app.get('/banner',function (req,res) {
  var rs = fs.createReadStream('./base/data/index/banner.json');

  rs.on('data',function(chunk){
    var bannerObj = JSON.parse(chunk);
    res.send(bannerObj);
  })
})

app.get('/menu',function(req,res) {
  var rs = fs.createReadStream('./base/data/index/menu.json');

  rs.on('data',function(chunk){
    var menuObj = JSON.parse(chunk);
    res.send(menuObj);
  })

})

app.get('/freeWalk',function(req,res){
  var rs = fs.createReadStream('./base/data/index/freeWalk.json');

  rs.on('data',function(chunk){
    var fwObj = JSON.parse(chunk);
    res.send(fwObj);
  })
})


app.get('/cityWalkList',function(req,res){
  var rs = fs.createReadStream('./base/data/cityWalk/cityWalkList.json');

  rs.on('data',function(chunk){
    var listObj = JSON.parse(chunk);
    res.send(listObj);
  })
})




app.get('*',function (req,res) {
  var bol = fs.existsSync('.' + req.path);
  if (bol) {
    var realPath = fs.realpathSync('.' + req.path);
    res.sendFile(realPath);
  }
  else if (fs.existsSync('./index' + req.path)) {
    var realPath = fs.realpathSync('./index' + req.path);
    res.sendFile(realPath);
  }else if (fs.existsSync('./cityWalk' + req.path)) {
    var realPath = fs.realpathSync('./cityWalk' + req.path);
    res.sendFile(realPath);
  }else{
    var realPath = fs.realpathSync('./index/html/404.html');
    res.status(404);
    res.sendFile(realPath);
  }
});

app.listen(8888,function () {
  console.log('服务器开启');
})
