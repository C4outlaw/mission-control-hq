require('dotenv').config({path:'.env.local'});
const fs=require('fs'),path=require('path');
const H={Authorization:'Bearer '+process.env.PRINTIFY_API_TOKEN};
const map=require('../lib/printify-map.json');
const OUT=path.join(__dirname,'..','public','store');
(async()=>{
 const out={};
 for(const [key,p] of Object.entries(map.products)){
   const d=await fetch(`https://api.printify.com/v1/shops/${map.shopId}/products/${p.id}.json`,{headers:H}).then(r=>r.json());
   const imgs=(d.images||[]);
   const front=imgs.find(i=>i.is_default)||imgs.find(i=>/front/i.test(i.src))||imgs[0];
   if(!front){console.log('noimg',key);continue;}
   const buf=Buffer.from(await (await fetch(front.src)).arrayBuffer());
   fs.writeFileSync(path.join(OUT,key+'.jpg'),buf);
   out[key]=buf.length;
   console.log(key,buf.length);
 }
 console.log('done',Object.keys(out).length);
})();
