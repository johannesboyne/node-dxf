var BufferStream = require('bufferstream');
var fs = require('fs');

module.exports = function (dxfpath, fn) {

  var n = 0, next = false;

  // using bufferstream for reading the input and line by line.
  stream = new BufferStream({encoding:'utf8', size:'flexible'})
  stream.split('\n');

  var min_x, min_y, vt_pid_bool = false, cur_pid = 0, acDbPolyline_bool = false, acDbText_bool = false, acDbEntity = false, caughtDbEntry = false, cur_acDbEntity = "", caughtX = false, caughtY = false, layers = [], texts = [], polygons = [], points = [], pid_count = 0, poly_c = 0;
  var caughtTxt_72 = false, caughtTxt_5 = false, caughtTxt_1 = false;

  var Point = function (x,y) {
    this.x = x;
    this.y = y;
  }

  var TextElement = function (x,y,txt) {
    this.x   = x;
    this.y   = y;
    this.txt = txt;
  }

  stream.on('split', function (chunk, token) {
    // getting all layers
    if (chunk.toString().match(/AcDbLayerTableRecord/)) {
      n = 1;
      next = true;
    } else if (n === 0 && next === true) {
      layers.push({name: chunk.toString()});
      next = false;
    } else if (next === true) {
      n--;
    }

    // getting dxf entity blocks
    if (chunk.toString().match(/ENDBLK/)) {
      acDbPolyline_bool = false;
      acDbText_bool = false;
      acDbEntity = false;
    } else if (chunk.toString().match(/AcDbEntity/)) {
      acDbEntity = true;
    } else if (acDbEntity === true && chunk.toString().replace(' ', '') == 8) {
      caughtDbEntry = true;
    } else if (acDbEntity === true && caughtDbEntry === true) {
      caughtDbEntry = false;
      cur_acDbEntity = chunk.toString();
    } 
    // checking for a polygon
    else if (cur_acDbEntity != '' && chunk.toString().match(/AcDbPolyline/)) {
      acDbPolyline_bool = true;
      poly_c++;
      polygons[polygons.length] = {layer: cur_acDbEntity, points: []};
    } else if (acDbPolyline_bool === true && chunk.toString().replace(' ', '') == 10) {
      caughtX = true;
    } else if (acDbPolyline_bool === true && caughtX === true) {
      caughtX = false;
      polygons[polygons.length-1].points.push(new Point(Number(chunk.toString()), null));
    } else if (acDbPolyline_bool === true && chunk.toString().replace(' ', '') == 20) {
      caughtY = true;
    } else if (acDbPolyline_bool === true && caughtY === true) {
      caughtY = false;
      polygons[polygons.length-1].points[polygons[polygons.length-1].points.length-1].y = Number(chunk.toString());
    } else if (acDbPolyline_bool === true && chunk.toString().match(/ENDBLK/)) {
      acDbPolyline_bool = false;
      acDbEntity = false;
    }
    // checking for a text
    else if (cur_acDbEntity != '' && chunk.toString().match(/AcDbMText/)) {
      acDbText_bool = true;
      texts[texts.length] = {layer: cur_acDbEntity, txt: new TextElement(null, null, null)};
    } else if (acDbText_bool === true && chunk.toString().replace(' ', '') == 10) {
      caughtX = true;
    } else if (acDbText_bool === true && caughtX === true) {
      caughtX = false;
      texts[texts.length-1].txt.x = Number(chunk.toString());
    } else if (acDbText_bool === true && chunk.toString().replace(' ', '') == 20) {
      caughtY = true;
    } else if (acDbText_bool === true && caughtY === true) {
      caughtY = false;
      texts[texts.length-1].txt.y = Number(chunk.toString());
    } else if (acDbText_bool === true && chunk.toString().replace(' ', '') == 72) {
      caughtTxt_72 = true;
    } else if (acDbText_bool === true && caughtTxt_72 === true && chunk.toString().replace(' ', '') == 5) {
      caughtTxt_5 = true;
    } else if (acDbText_bool === true && caughtTxt_5 === true && chunk.toString().replace(' ', '') == 1) {
      caughtTxt_1 = true;
    }else if (acDbText_bool === true && caughtTxt_72 === true && caughtTxt_5 === true && caughtTxt_5 === true) {
      texts[texts.length-1].txt.txt = chunk.toString();
      caughtTxt_72  = false;
      caughtTxt_5   = false;
      caughtTxt_1   = false;
      acDbText_bool = false;
    } else if (chunk.toString().match(/ENDBLK/)) {
      acDbEntity    = false;
    }
  });

  var readstream = fs.createReadStream(dxfpath, {encoding: 'utf8'});
  readstream.on('error', function (err) {
    console.error(err);
  });
  readstream.on('data', function (chunk) {
    stream.write(chunk);
  });
  readstream.on('end', function () {
    stream.end();

    // borrowd from http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    function pnpoly (points, test) {
      var i, j, c = false;
      for( i = 0, j = points.length-1; i < points.length; j = i++ ) {
        if( ( ( points[i].y > test.y ) != ( points[j].y > test.y ) ) &&
          ( test.x < ( points[j].x - points[i].x ) * ( test.y - points[i].y ) / ( points[j].y - points[i].y ) + points[i].x ) ) {
          c = !c;
        }
      }
      return c;
    }

    var mappings = [];
    polygons.forEach(function (polygon, p) {
      texts.forEach(function (text, t) {
        if (pnpoly(polygon.points, text.txt)) {
          mappings.push({polygonIndex: p, textIndex: t});
        }
      });
    });

    fn({
      'layers': layers, 
      'polygons': polygons, 
      'texts': texts, 
      'mappings': mappings
    });
  });
}