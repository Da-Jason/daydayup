/**
 * Created by wangyinchuan on 2015/11/5.
 */
var fs   = require('fs');
var path = require('path');
//var cdn = '';

function routing(app, viewsPath) {
  var viewsDir = path.join(__dirname, '..', viewsPath);
  console.log('viewsDir:', viewsDir);
  console.log('==============================================================================================');

  var parseRoute = function (rootDir) {
    var files = fs.readdirSync(rootDir);
    files.forEach(function (file) {
      var filePath = path.join(rootDir, file);
      if (fs.statSync(filePath).isFile()) {
        console.log('File --- filePath:', filePath);
        var dirName    = path.dirname(filePath);
        var pathName   = path.basename(filePath).split('.')[0];
        var pathPrefix = dirName.replace(viewsDir, '').replace(/[\\]/g, '/') + '/';
        var reqPath    = pathName == 'index' ? pathPrefix.substring(0,pathPrefix.length-1) : pathPrefix + pathName;
        var renderPath = pathName == 'index' ?'.'+reqPath+'/index' : '.' + reqPath;
        console.log('express route path:', reqPath?reqPath:'/');
        console.log('==============================================================================================');
        app.get(reqPath, function (req, res, next) {
          res.render(renderPath, {})
        });
        if(pathName == 'index'){
          app.get(reqPath+'/index', function (req, res, next) {
            res.render(renderPath, {})
          });
        }
      } else {
        parseRoute(filePath);
      }
    });
  };

  parseRoute(viewsDir);

}

module.exports = routing;
