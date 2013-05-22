var test    = require('tape');
var nodedxf = require('../');

test('dxf parsing test', function (t) {
  t.plan(2);
  nodedxf(__dirname+'/data/test.dxf', function (res) {
    t.equal(typeof res, 'object');
    t.equal(res.layers.length + res.polygons.length + res.texts.length + res.mappings.length, 56);
  });
});