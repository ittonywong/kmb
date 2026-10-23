// 九巴到站 service worker — scope /kmb/ only. Bump VER on every release (cache-busting).
const VER='2.0.0-20261023';
const CORE='kmb-core-'+VER, DATA='kmb-data-v1';
const FILES=['./','./index.html','./style.css?v=2.0.0','./app.js?v=2.0.0','./icon.svg','./manifest.webmanifest'];
const DAY=24*3600*1000;
self.addEventListener('install',e=>{e.waitUntil(caches.open(CORE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
// Only delete OUR old caches (prefix kmb-core-). Other sites on the same origin keep theirs.
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('kmb-core-')&&k!==CORE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET')return;const u=new URL(req.url);
  // Static/route-list data from the official API: route list, stop list, route-stop (updated daily) -> cache up to 1 day
  if(u.hostname==='data.etabus.gov.hk'&&/\/v1\/transport\/kmb\/(route\/?|stop\/?|route-stop\/[^/]+\/(inbound|outbound)\/\d+)$/.test(u.pathname)){e.respondWith(dataCache(req));return}
  if(u.origin!==location.origin)return; // ETA calls etc.: always live, never cached
  const scope=new URL(self.registration.scope).pathname;if(!u.pathname.startsWith(scope))return;
  if(req.mode==='navigate'){e.respondWith(fetch(req).then(r=>{const c=r.clone();caches.open(CORE).then(x=>x.put('./index.html',c));return r}).catch(()=>caches.match('./index.html')));return}
  e.respondWith(caches.match(req).then(r=>r||fetch(req)))});
async function dataCache(req){const c=await caches.open(DATA);const hit=await c.match(req);
  const age=hit?Date.now()-(+hit.headers.get('x-saved')||0):Infinity;
  if(hit&&age<DAY)return hit; // fresh enough (API updates these once a day at 05:00)
  try{const r=await fetch(req);if(r.ok){const b=await r.clone().blob();await c.put(req,new Response(b,{headers:{'content-type':'application/json','x-saved':String(Date.now())}}))}return r}
  catch(err){if(hit)return hit;throw err}}
