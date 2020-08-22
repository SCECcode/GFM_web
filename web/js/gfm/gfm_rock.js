/*
  from regions,
   domain_id is the domain_id from GFM region,
   name is the local GFM region name used by the Rock list 
   litho is the index from the litho list

   rock_id is the locally assigned from Rock list. 

  from lithos,
   holds the rock composition. 
*/

/* JSON
{ "GFM_rock_tb" : {
*/
var GFM_rock_tb = {
"regions": [
{"domain_id":[3],"name":"Sierra Nevada(E)","litho":19,
"rock":[{"start":0,"end":30,"type":"Granodiorite05","rock_id":7}
       ,{"start":30,"end":35,"type":"Quartz Diorite","rock_id":12}
]},
{"domain_id":[5],"name":"Sierra Nevada(W)","litho":20,
"rock":[{"start":0,"end":30,"type":"Granodiorite10","rock_id":6}
       ,{"start":30,"end":40,"type":"Quartz Diorite","rock_id":12}
]},
{"domain_id":[10],"name":"Peninsular Ranges(E)","litho":1,
"rock":[{"start":0,"end":30,"type":"Granodiorite05","rock_id":7}
       ,{"start":30,"end":35,"type":"Quartz Diorite","rock_id":12}
]},
{"domain_id":[6],"name":"Peninsular Ranges(W)","litho":3,
"rock":[{"start":0,"end":30,"type":"Granodiorite10","rock_id":6}
       ,{"start":30,"end":40,"type":"Quartz Diorite","rock_id":12}
]},
{"domain_id":[18],"name":"Great Valley","litho":17,
"rock":[{"start":0,"end":6,"type":"Forearc Sediments","rock_id":2}
       ,{"start":6,"end":9,"type":"Basalt","rock_id":1}
       ,{"start":9,"end":13,"type":"Gabbro","rock_id":5}
       ,{"start":13,"end":15,"type":"Peridotite","rock_id":11}
       ,{"start":15,"end":20,"type":"Schist","rock_id":15}
       ,{"start":20,"end":25,"type":"Basalt","rock_id":1}
       ,{"start":25,"end":35,"type":"Gabbro","rock_id":5}
]},
{"domain_id":[25],"name":"Inner Borderland Rift","litho":7,
"rock":[{"start":0,"end":6,"type":"Rift Basin Fill","rock_id":14}
       ,{"start":6,"end":11,"type":"Franciscan Schist","rock_id":4}
       ,{"start":11,"end":14,"type":"Basalt","rock_id":1}
       ,{"start":14,"end":18,"type":"Gabbro","rock_id":5}
]},
{"domain_id":[20],"name":"Santa Maria Rift","litho":21,
"rock":[{"start":0,"end":6,"type":"Rift Basin Fill","rock_id":14}
       ,{"start":6,"end":11,"type":"Franciscan Schist","rock_id":4}
       ,{"start":11,"end":14,"type":"Basalt","rock_id":1}
       ,{"start":14,"end":18,"type":"Gabbro","rock_id":5}
]},
{"domain_id":[34],"name":"Accretionary Prism 1","litho":5,
"rock":[{"start":0,"end":8,"type":"Franciscan Melange","rock_id":3}
       ,{"start":8,"end":11,"type":"Basalt","rock_id":1}
       ,{"start":11,"end":15,"type":"Gabbro","rock_id":5}
]},
{"domain_id":[35],"name":"Accretionary Prism 2","litho":15,
"rock":[{"start":0,"end":8,"type":"Franciscan Melange","rock_id":3}
       ,{"start":8,"end":11,"type":"Basalt","rock_id":1}
       ,{"start":11,"end":15,"type":"Gabbro","rock_id":5}
]},
{"domain_id":[29],"name":"San Francisco Bay","litho":16,
"rock":[{"start":0,"end":8,"type":"Franciscan Melange","rock_id":3}
       ,{"start":8,"end":11,"type":"Basalt","rock_id":1}
       ,{"start":11,"end":15,"type":"Gabbro","rock_id":5}
]},
{"domain_id":[27],"name":"Outer Borderland","litho":6,
"rock":[{"start":0,"end":5,"type":"Forearc Sediments","rock_id":2}
       ,{"start":5,"end":8,"type":"Basalt","rock_id":1}
       ,{"start":8,"end":12,"type":"Gabbro","rock_id":5}
       ,{"start":12,"end":15,"type":"Franciscan Schist","rock_id":4}
       ,{"start":15,"end":18,"type":"Basalt","rock_id":1}
       ,{"start":18,"end":22,"type":"Gabbro","rock_id":5}
]},
{"domain_id":[36],"name":"Oceanic Crust","litho":4,
"rock":[{"start":0,"end":3,"type":"Basalt","rock_id":1}
       ,{"start":3,"end":7,"type":"Gabbro","rock_id":5}
]},
{"domain_id":[13],"name":"Mojave","litho":8,
"rock":[{"start":0,"end":15,"type":"Granodiorite05","rock_id":7}
       ,{"start":15,"end":18,"type":"Quartz Diorite","rock_id":12}
       ,{"start":18,"end":25,"type":"Rand Schist","rock_id":13}
       ,{"start":25,"end":30,"type":"Gabbro","rock_id":5}
]},
{"domain_id":[31],"name":"Rift Axis 1","litho":9,
"rock":[{"start":0,"end":8,"type":"Quartz Sediment","rock_id":17}
       ,{"start":8,"end":13,"type":"Sediment & Sills","rock_id":16}
       ,{"start":13,"end":17,"type":"Gabbro","rock_id":5}
]},
{"domain_id":[28],"name":"Rift Axis 2","litho":11,
"rock":[{"start":0,"end":8,"type":"Quartz Sediment","rock_id":17}
       ,{"start":8,"end":13,"type":"Sediment & Sills","rock_id":16}
       ,{"start":13,"end":17,"type":"Gabbro","rock_id":5}
]},
{"domain_id":[33],"name":"Rift Axis 3","litho":23,
"rock":[{"start":0,"end":8,"type":"Quartz Sediment","rock_id":17}
       ,{"start":8,"end":13,"type":"Sediment & Sills","rock_id":16}
       ,{"start":13,"end":17,"type":"Gabbro","rock_id":5}
]},
{"domain_id":[16],"name":"Salinia","litho":14,
"rock":[{"start":0,"end":15,"type":"Granodiorite05","rock_id":7}
       ,{"start":15,"end":18,"type":"Quartz Diorite","rock_id":12}
       ,{"start":18,"end":25,"type":"Rand Schist","rock_id":13}
       ,{"start":25,"end":30,"type":"Gabbro","rock_id":5}
]},
{"domain_id":[12],"name":"San Gabriel","litho":12,
"rock":[{"start":0,"end":15,"type":"Granodiorite","rock_id":6}
       ,{"start":15,"end":18,"type":"Quartz Diorite","rock_id":12}
       ,{"start":18,"end":25,"type":"Rand Schist","rock_id":13}
       ,{"start":25,"end":30,"type":"Gabbro","rock_id":5}
]},
{"domain_id":[23],"name":"Western Transverse Ranges","litho":13,
"rock":[{"start":0,"end":5,"type":"Forearc Sediments","rock_id":2}
       ,{"start":5,"end":8,"type":"Basalt","rock_id":1}
       ,{"start":8,"end":12,"type":"Gabbro","rock_id":5}
       ,{"start":12,"end":15,"type":"Franciscan Schist","rock_id":4}
       ,{"start":15,"end":18,"type":"Basalt","rock_id":1}
       ,{"start":18,"end":22,"type":"Gabbro","rock_id":5}
]},
{"domain_id":[7],"name":"Basin and Range","litho":10,
"rock":[{"start":0,"end":10,"type":"Meta-Felsic","rock_id":9}
       ,{"start":10,"end":20,"type":"Meta-Intermediate","rock_id":10}
       ,{"start":20,"end":25,"type":"Meta-Basic","rock_id":8}
       ,{"start":25,"end":30,"type":"Gabbro","rock_id":5}
]},
{"domain_id":[9],"name":"Southern Walker Lane","litho":18,
"rock":[{"start":0,"end":10,"type":"Meta-Felsic","rock_id":9}
       ,{"start":10,"end":20,"type":"Meta-Intermediate","rock_id":10}
       ,{"start":20,"end":25,"type":"Meta-Basic","rock_id":8}
       ,{"start":25,"end":30,"type":"Gabbro","rock_id":5}
]},
{"domain_id":[4],"name":"Colorado Plateau","litho":22,
"rock":[{"start":0,"end":3,"type":"Sediment","rock_id":18}
       ,{"start":3,"end":12,"type":"Meta-Felsic","rock_id":9}
       ,{"start":12,"end":25,"type":"Meta-Intermediate","rock_id":10}
       ,{"start":25,"end":40,"type":"Meta-Basic","rock_id":8}
]},
{"domain_id":[22],"name":"Gulf Rifted Margin","litho":2,
"rock":[{"start":0,"end":5,"type":"Quartz Sediment","rock_id":17}
       ,{"start":5,"end":25,"type":"Granodiorite05","rock_id":7}
]}
],
"lithos": [
{"rock_id":1,"name":"Basalt",
       "Quartz":0,"Feldspar":20,"Mica":0,"Pyroxene":65,"Amphibole":0,"Olilvine":15},
{"rock_id":2,"name":"Forearc Sediments",
       "Quartz":85,"Feldspar":10,"Mica":5,"Pyroxene":0,"Amphibole":0,"Olilvine":0},
{"rock_id":3,"name":"Franciscan Melange",
       "Quartz":75,"Feldspar":15,"Mica":10,"Pyroxene":0,"Amphibole":0,"Olilvine":0},
{"rock_id":4,"name":"Franciscan Schist",
       "Quartz":75,"Feldspar":20,"Mica":5,"Pyroxene":0,"Amphibole":0,"Olilvine":0},
{"rock_id":5,"name":"Gabbro",
       "Quartz":0,"Feldspar":20,"Mica":0,"Pyroxene":65,"Amphibole":0,"Olilvine":15},
{"rock_id":6,"name":"Granodiorite05",
       "Quartz":25,"Feldspar":60,"Mica":10,"Pyroxene":0,"Amphibole":5,"Olilvine":0},
{"rock_id":7,"name":"Granodiorite10",
       "Quartz":20,"Feldspar":60,"Mica":10,"Pyroxene":0,"Amphibole":10,"Olilvine":0},
{"rock_id":8,"name":"Meta-Basic",
       "Quartz":5,"Feldspar":60,"Mica":5,"Pyroxene":15,"Amphibole":15,"Olilvine":0},
{"rock_id":9,"name":"Meta-Felsic",
       "Quartz":25,"Feldspar":60,"Mica":5,"Pyroxene":5,"Amphibole":5,"Olilvine":0},
{"rock_id":10,"name":"Meta-Intermediate",
       "Quartz":15,"Feldspar":60,"Mica":5,"Pyroxene":10,"Amphibole":10,"Olilvine":0},
{"rock_id":11,"name":"Peridotite",
       "Quartz":0,"Feldspar":0,"Mica":0,"Pyroxene":20,"Amphibole":0,"Olilvine":80},
{"rock_id":12,"name":"Quartz Diorite",
       "Quartz":15,"Feldspar":60,"Mica":10,"Pyroxene":0,"Amphibole":15,"Olilvine":0},
{"rock_id":13,"name":"Rand Schist",
       "Quartz":15,"Feldspar":65,"Mica":20,"Pyroxene":0,"Amphibole":0,"Olilvine":0},
{"rock_id":14,"name":"Rift Basin Fill",
       "Quartz":75,"Feldspar":20,"Mica":5,"Pyroxene":0,"Amphibole":0,"Olilvine":0},
{"rock_id":15,"name":"Schist",
       "Quartz":75,"Feldspar":20,"Mica":5,"Pyroxene":0,"Amphibole":0,"Olilvine":0},
{"rock_id":16,"name":"Sediment & Sills",
       "Quartz":50,"Feldspar":10,"Mica":0,"Pyroxene":35,"Amphibole":0,"Olilvine":5},
{"rock_id":17,"name":"Quartz Sediment",
       "Quartz":100,"Feldspar":0,"Mica":0,"Pyroxene":0,"Amphibole":0,"Olilvine":0},
{"rock_id":18,"name":"Sediment",
       "Quartz":90,"Feldspar":10,"Mica":0,"Pyroxene":0,"Amphibole":0,"Olilvine":0}
]};
/* JSON
]}}
*/
