# node-dxf

Parse DXF files to get polygons and text elements.

# usage

``` js
nodedxf('pathTo.dxf', function (res) {
    /*
    res output:
    { layers: [...],
      polygons: [...],
      texts: [...],
      mappings: [...]
    */
});
```

## output types

node-dxf will give you 4 outputs a.t.m. Layers, polygons, texts and mappings. Layers, polygons and texts should be clear, just run the test to get a better understanding or look at the following sample. Mappings are potential relations between text elements and polygons. node-dxf tests whether a text element lies inside a polygon, if so it creates a potential mapping. The `mappings`-Array contains the potential mappings.

``` js
{ layers:
   [ { name: '0\r' },
     { name: 'DEFPOINTS\r' },
     { name: '_VT_ohnePIDs_1OG_SP\r' } ],
  polygons:
   [ { layer: '_VT_ohnePIDs_1OG_SP\r', points: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', points: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', points: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', points: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', points: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', points: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', points: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', points: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', points: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', points: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', points: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', points: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', points: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', points: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', points: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', points: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', points: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', points: [Object] } ],
  texts:
   [ { layer: '_VT_ohnePIDs_1OG_SP\r', txt: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', txt: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', txt: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', txt: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', txt: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', txt: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', txt: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', txt: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', txt: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', txt: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', txt: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', txt: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', txt: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', txt: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', txt: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', txt: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', txt: [Object] },
     { layer: '_VT_ohnePIDs_1OG_SP\r', txt: [Object] } ],
  mappings:
   [ { polygonIndex: 0, textIndex: 14 },
     { polygonIndex: 1, textIndex: 16 },
     { polygonIndex: 2, textIndex: 15 },
     { polygonIndex: 3, textIndex: 17 },
     { polygonIndex: 4, textIndex: 11 },
     { polygonIndex: 5, textIndex: 12 },
     { polygonIndex: 6, textIndex: 13 },
     { polygonIndex: 7, textIndex: 10 },
     { polygonIndex: 8, textIndex: 9 },
     { polygonIndex: 9, textIndex: 0 },
     { polygonIndex: 10, textIndex: 1 },
     { polygonIndex: 12, textIndex: 8 },
     { polygonIndex: 13, textIndex: 7 },
     { polygonIndex: 14, textIndex: 6 },
     { polygonIndex: 15, textIndex: 5 },
     { polygonIndex: 16, textIndex: 4 },
     { polygonIndex: 17, textIndex: 3 } ] }
```