'use strict';
// 九巴／龍運即時到站 v2.0.0 — 資料：運輸署 DATA.GOV.HK（data.etabus.gov.hk）
const VER='2.0.0';
// ---- i18n ----
const LANGS=[["zh-Hant","繁體中文"],["zh-Hans","简体中文"],["en","English"],["ja","日本語"],["mi","Te Reo Māori"],["ko","한국어"]];
const I18N={
"zh-Hant":{swap:"⇄ 另一方向",colon:"：",title:"九巴即時到站",lang:"語言",tab1:"全部路線",tab2:"我的收藏",search:"篩選車站…",refresh:"更新",loading:"載入中…",
 rsearch:"輸入路線或地方（例如 1A、旺角）",back:"← 全部路線",recent:"最近：",nRoutes:"共 {n} 條路線",nMatch:"{n} 條路線符合",noMatch:"搵唔到相符路線",more:"顯示更多（仲有 {n} 條）",
 upd:"最後更新：{t}（資料時間 {d}，每30秒自動更新）",loadFail:"載入失敗：{e}",failShort:"載入失敗",O:"去程",I:"回程",special:"（特別班 {n}）",mins:"{m} 分鐘",arriving:"即將抵達",
 noData:"沒有資料",noEta:"沒有資料",noFavs:"未有收藏。喺路線入面撳 ☆ 就可以加入。",del:"刪除",to:"往 {d}",fav:"☆ 收藏",faved:"★ 已收藏",nStops:"{n} 個車站",
 src:"資料來源：運輸署／DATA.GOV.HK「九龍巴士及龍運巴士路線實時到站數據」。原始數據知識產權屬九龍巴士(一九三三)有限公司及龍運巴士有限公司。本網站並非巴士公司官方網站，到站時間只供參考。",srcLink:"數據集頁面"},
"zh-Hans":{swap:"⇄ 另一方向",colon:"：",title:"九巴实时到站",lang:"语言",tab1:"全部路线",tab2:"我的收藏",search:"筛选车站…",refresh:"刷新",loading:"加载中…",
 rsearch:"输入路线或地方（例如 1A、旺角）",back:"← 全部路线",recent:"最近：",nRoutes:"共 {n} 条路线",nMatch:"{n} 条路线符合",noMatch:"找不到相符路线",more:"显示更多（还有 {n} 条）",
 upd:"最后更新：{t}（数据时间 {d}，每30秒自动刷新）",loadFail:"加载失败：{e}",failShort:"加载失败",O:"去程",I:"回程",special:"（特别班 {n}）",mins:"{m} 分钟",arriving:"即将到达",
 noData:"没有资料",noEta:"没有资料",noFavs:"还没有收藏。在路线里按 ☆ 即可添加。",del:"删除",to:"往 {d}",fav:"☆ 收藏",faved:"★ 已收藏",nStops:"{n} 个车站",
 src:"数据来源：运输署／DATA.GOV.HK「九龙巴士及龙运巴士路线实时到站数据」。原始数据知识产权属九龙巴士(一九三三)有限公司及龙运巴士有限公司。本网站并非巴士公司官方网站，到站时间仅供参考。",srcLink:"数据集页面"},
"en":{swap:"⇄ Other direction",colon:": ",title:"KMB Real-time Arrivals",lang:"Language",tab1:"All routes",tab2:"My Favourites",search:"Filter stops…",refresh:"Refresh",loading:"Loading…",
 rsearch:"Route or place (e.g. 1A, Mong Kok)",back:"← All routes",recent:"Recent:",nRoutes:"{n} routes",nMatch:"{n} matching routes",noMatch:"No matching routes",more:"Show more ({n} left)",
 upd:"Last updated: {t} (data time {d}; auto-refresh every 30 s)",loadFail:"Failed to load: {e}",failShort:"Failed to load",O:"Outbound",I:"Inbound",special:" (special service {n})",mins:"{m} min",arriving:"Arriving",
 noData:"No data",noEta:"No data",noFavs:"No favourites yet. Tap ☆ on a stop inside a route to add one.",del:"Delete",to:"To {d}",fav:"☆ Save",faved:"★ Saved",nStops:"{n} stops",
 src:"Data source: Transport Department / DATA.GOV.HK, “Real time Arrival Data of Kowloon Motor Bus and Long Win Bus Services”. Intellectual property in the raw data belongs to The Kowloon Motor Bus Company (1933) Limited and Long Win Bus Company Limited. This is not an official bus-company website; arrival times are for reference only.",srcLink:"Dataset page"},
"ja":{swap:"⇄ 反対方向",colon:"：",title:"KMB バス リアルタイム到着情報",lang:"言語",tab1:"全路線",tab2:"お気に入り",search:"停留所を絞り込み…",refresh:"更新",loading:"読み込み中…",
 rsearch:"路線または地名（例：1A、Mong Kok）",back:"← 全路線",recent:"最近：",nRoutes:"{n} 路線",nMatch:"{n} 路線が該当",noMatch:"該当する路線がありません",more:"さらに表示（残り {n}）",
 upd:"最終更新：{t}（データ時刻 {d}、30秒ごとに自動更新）",loadFail:"読み込みに失敗しました：{e}",failShort:"読み込み失敗",O:"往路",I:"復路",special:"（特別便 {n}）",mins:"{m} 分",arriving:"まもなく到着",
 noData:"データなし",noEta:"データなし",noFavs:"お気に入りはまだありません。路線内の停留所で ☆ を押して追加してください。",del:"削除",to:"{d} 行き",fav:"☆ 保存",faved:"★ 保存済み",nStops:"停留所 {n} か所"},
"mi":{swap:"⇄ Tērā ahunga",colon:": ",title:"Ngā Taenga Pahi KMB i te Wā Tūturu",lang:"Reo",tab1:"Ngā ara katoa",tab2:"Aku Tino Pai",search:"Tātari tūnga…",refresh:"Whakahou",loading:"E uta ana…",
 rsearch:"Ara, wāhi rānei (hei tauira, 1A, Mong Kok)",back:"← Ngā ara katoa",recent:"Tata nei:",nRoutes:"{n} ara",nMatch:"{n} ara e hāngai ana",noMatch:"Kāore he ara e hāngai ana",more:"Whakaatu atu anō ({n} e toe ana)",
 upd:"Whakahounga whakamutunga: {t} (wā raraunga {d}; ka whakahou aunoa ia 30 hēkona)",loadFail:"I rahua te uta: {e}",failShort:"I rahua te uta",O:"Haere atu",I:"Hoki mai",special:" (ratonga motuhake {n})",mins:"{m} meneti",arriving:"Ka tae mai ināianei",
 noData:"Kāore he raraunga",noEta:"Kāore he raraunga",noFavs:"Kāore anō kia whai tino pai. Pēhia te ☆ i tētahi tūnga.",del:"Mukua",to:"Ki {d}",fav:"☆ Tiaki",faved:"★ Kua tiakina",nStops:"{n} tūnga"},
"ko":{swap:"⇄ 반대 방향",colon:": ",title:"KMB 버스 실시간 도착 정보",lang:"언어",tab1:"전체 노선",tab2:"즐겨찾기",search:"정류장 필터…",refresh:"새로고침",loading:"불러오는 중…",
 rsearch:"노선 또는 지명 (예: 1A, Mong Kok)",back:"← 전체 노선",recent:"최근:",nRoutes:"노선 {n}개",nMatch:"일치하는 노선 {n}개",noMatch:"일치하는 노선이 없습니다",more:"더 보기 ({n}개 남음)",
 upd:"마지막 업데이트: {t} (데이터 시각 {d}, 30초마다 자동 업데이트)",loadFail:"불러오기 실패: {e}",failShort:"불러오기 실패",O:"가는 방향",I:"오는 방향",special:" (특별편 {n})",mins:"{m}분",arriving:"곧 도착",
 noData:"데이터 없음",noEta:"데이터 없음",noFavs:"즐겨찾기가 없습니다. 노선 안의 정류장에서 ☆를 누르세요.",del:"삭제",to:"{d} 방면",fav:"☆ 저장",faved:"★ 저장됨",nStops:"정류장 {n}개"}};
const RMK={ja:[[/^Scheduled Bus$/i,"時刻表上の便"],[/^(Final|Last) Bus$/i,"最終便"],[/^Delayed journey from (.+)$/i,"$1 から遅延"]],
 ko:[[/^Scheduled Bus$/i,"시간표 운행"],[/^(Final|Last) Bus$/i,"막차"],[/^Delayed journey from (.+)$/i,"$1에서 지연"]],
 mi:[[/^Scheduled Bus$/i,"Pahi kua whakaritea"],[/^(Final|Last) Bus$/i,"Pahi whakamutunga"],[/^Delayed journey from (.+)$/i,"Kua tōmuri mai i $1"]]};
const LCODE={'zh-Hant':'繁','zh-Hans':'简',en:'EN',ja:'日',mi:'Mā',ko:'한'};
let LANG=null;try{LANG=localStorage.getItem('kmbLang')}catch(e){}if(!I18N[LANG])LANG='en';
const T=(k,v={})=>(I18N[LANG][k]??I18N.en[k]??k).replace(/\{(\w+)\}/g,(_,x)=>v[x]??'');
const T2S=(()=>{const [a,b]="園總榮樓馬遊樂場體館東頭偉龍賈達勵書協學長倫轉車間碼寶靈恆豐郵愛聖醫圍劇強橫業曉麗觀創紀灣啟頤崗譽華處硤閣蘇蘿楊鴉蘭亞鄭禮讓賽會診療鵑興電鐘則黃營盤徑島義澤開獅嶺滿貴鴻紅鶴獲寧廟奧窩廣肅衛雲貫鳳張慶鑽運動畢祐廈蓮淨鐸順楓樹暉遠臺輔導機鸞維鄉氣硃聯濤匯鐵廠麼連區計劃貿稅務歷緻潔璽銘輪橋兒濱發眾勞資審藍當鯉魚門軍購勝萬實謙圖軒吳錦貢櫸臨悅譚珮諾駿凱戲欽輝鵲隊韻頌將墳風綜農員祿環來迴瑤堯瑪鹹領報國籬歡蔭磚隴饒貝棟專競統壩護盧葉濟綠圓纜網戶訓練斬誌碩議烏遜瀝職聽灝顯誠瑩麵壽萊瀅駕駛掃簡約欖灘點邊鍾財養羅鳴莊號變錢盞欄許願較謝銀舊賦濕巒藝翹賞牽覺娛傑爾銅鑼頓積蘆級親賢貨漁漢輸顏繡歐範別訊澗鹽躍響昇疊揚滾瓏兩塊檳線騰見調蠔儉麥鯽燒際堅塢師釗孫閘飛鴨賓僑陳類凍數陞鰂產進對視鵬邁湯釆單宮晉詩團時覽菴嶼幹檢暢‧薈樞紐記飲庫經媽|园总荣楼马游乐场体馆东头伟龙贾达励书协学长伦转车间码宝灵恒丰邮爱圣医围剧强横业晓丽观创纪湾启颐岗誉华处硖阁苏萝杨鸦兰亚郑礼让赛会诊疗鹃兴电钟则黄营盘径岛义泽开狮岭满贵鸿红鹤获宁庙奥窝广肃卫云贯凤张庆钻运动毕佑厦莲净铎顺枫树晖远台辅导机鸾维乡气朱联涛汇铁厂么连区计划贸税务历致洁玺铭轮桥儿滨发众劳资审蓝当鲤鱼门军购胜万实谦图轩吴锦贡榉临悦谭佩诺骏凯戏钦辉鹊队韵颂将坟风综农员禄环来回瑶尧玛咸领报国篱欢荫砖陇饶贝栋专竞统坝护卢叶济绿圆缆网户训练斩志硕议乌逊沥职听灏显诚莹面寿莱滢驾驶扫简约榄滩点边钟财养罗鸣庄号变钱盏栏许愿较谢银旧赋湿峦艺翘赏牵觉娱杰尔铜锣顿积芦级亲贤货渔汉输颜绣欧范别讯涧盐跃响升叠扬滚珑两块槟线腾见调蚝俭麦鲫烧际坚坞师钊孙闸飞鸭宾侨陈类冻数升鲗产进对视鹏迈汤采单宫晋诗团时览庵屿干检畅·荟枢纽记饮库经妈".split('|');const m={};[...a].forEach((c,i)=>m[c]=[...b][i]);return m})();
const t2s=s=>[...(s||'')].map(c=>T2S[c]||c).join('');
const zh=()=>LANG.startsWith('zh');
const fx=t=>(t||'').replace(/巿/g,'市');
const nm=(o,k)=>{if(!o)return '';const v=LANG==='zh-Hant'?fx(o[k+'_tc']):LANG==='zh-Hans'?(o[k+'_sc']||t2s(fx(o[k+'_tc']))):(o[k+'_en']||fx(o[k+'_tc']));return v||''};
const nm2=(o,k)=>!o?'':zh()?(o[k+'_en']||''):fx(o[k+'_tc']);
const rmk=e=>{if(!e.rmk_tc&&!e.rmk_en)return '';if(LANG==='zh-Hant')return e.rmk_tc||e.rmk_en;if(LANG==='zh-Hans')return e.rmk_sc||t2s(e.rmk_tc);const en=e.rmk_en||e.rmk_tc;
 for(const [re,to] of (RMK[LANG]||[]))if(re.test(en))return en.replace(re,to);return en};
const tm=d=>d.toLocaleTimeString('en-GB',{hour12:false,timeZone:'Asia/Hong_Kong'});
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $=id=>document.getElementById(id);
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
try{localStorage.setItem('kmb.v2seen','1')}catch(e){}

// ---- data (official open data only) ----
const A='https://data.etabus.gov.hk/v1/transport/kmb/';
const j=u=>fetch(A+u).then(r=>{if(!r.ok)throw new Error('HTTP '+r.status);return r.json()});
let RL=null,RLp=null,SM=null,SMp=null;
function loadRoutes(){return RLp||(RLp=j('route/').then(r=>{if(!Array.isArray(r.data)||!r.data.length)throw new Error('empty');RL=r.data;return RL}).catch(e=>{RLp=null;throw e}))}
function loadStopMap(){return SMp||(SMp=j('stop').then(r=>{const m={};(r.data||[]).forEach(s=>m[s.stop]=s);SM=m;return m}).catch(e=>{SMp=null;SM=null;return null}))}
async function stopNames(ids){const m=await loadStopMap();const out={};const miss=[];ids.forEach(id=>{if(m&&m[id])out[id]=m[id];else miss.push(id)});
 await Promise.all(miss.map(id=>j('stop/'+id).then(r=>{if(r.data&&r.data.stop)out[id]=r.data}).catch(()=>{})));return out}
const bw=b=>b==='O'?'outbound':'inbound';
// natural sort of route numbers: 1,1A,2,...,A30,E31,N30,NA30
function rkey(r){const m=/^([A-Z]*)(\d*)(.*)$/.exec(r)||[0,r,'',''];return [m[1]?1:0,m[1],m[2]?+m[2]:0,m[3]]}
function rcmp(a,b){const x=rkey(a),y=rkey(b);for(let i=0;i<4;i++){if(x[i]<y[i])return -1;if(x[i]>y[i])return 1}return 0}
let GROUPS=[];
function buildGroups(){const g={};RL.forEach(x=>{(g[x.route]=g[x.route]||[]).push(x)});GROUPS=Object.keys(g).sort(rcmp).map(r=>({route:r,v:g[r].sort((a,b)=>(+a.service_type-+b.service_type)||(a.bound<b.bound?1:-1))}))}
const vLabel=x=>T(x.bound=='O'?'O':'I')+T('colon')+(nm(x,'orig')||T('noData'))+' → '+(nm(x,'dest')||T('noData'))+(x.service_type!='1'?T('special',{n:x.service_type}):'');

// ---- views / router ----
let view='R',cur=null,PAGE=120,shown=PAGE;
function show(v){view=v;$('vR').style.display=v==='R'?'':'none';$('vS').style.display=v==='S'?'':'none';$('v2').style.display=v==='F'?'':'none';
 $('t1').className=v==='F'?'':'on';$('t2').className=v==='F'?'on':''}
function route(){const h=decodeURIComponent(location.hash.slice(1));
 if(h==='favs'){show('F');loadF();return}
 const m=/^r\/([^/]+)\/([OI])\/(\d+)$/.exec(h);if(m){openRoute(m[1],m[2],m[3]);return}
 show('R');renderRoutes()}
window.addEventListener('hashchange',route);
$('t1').onclick=()=>{location.hash=''};$('t2').onclick=()=>{location.hash='favs'};$('back').onclick=()=>{location.hash=''};

// ---- all routes list ----
const norm=s=>(s||'').toLowerCase().replace(/[\s()（）\-]/g,'');
function match(g,q){if(!q)return 1;const Q=q.toUpperCase().replace(/\s/g,'');if(g.route===Q)return 3;if(g.route.startsWith(Q))return 2;
 const n=norm(q);if(n.length<2&&!/[\u3400-\u9fff]/.test(q))return 0;
 return g.v.some(x=>['orig','dest'].some(k=>norm(fx(x[k+'_tc'])).includes(n)||norm(x[k+'_sc']||'').includes(n)||norm(x[k+'_en']).includes(n)||norm(t2s(fx(x[k+'_tc']))).includes(n)))?1:0}
async function renderRoutes(){renderRecent();
 if(!RL){$('rst').textContent=T('loading');try{await loadRoutes();buildGroups()}catch(e){$('rst').textContent=T('loadFail',{e:String(e.message||e)});return}}
 const q=$('rq').value.trim();const hits=GROUPS.map(g=>[g,match(g,q)]).filter(x=>x[1]).sort((a,b)=>b[1]-a[1]||rcmp(a[0].route,b[0].route)).map(x=>x[0]);
 $('rst').textContent=!hits.length?T('noMatch'):q?T('nMatch',{n:hits.length}):T('nRoutes',{n:GROUPS.length});
 $('rlist').innerHTML=hits.slice(0,shown).map(g=>'<div class="s rc"><div class="rn">'+esc(g.route)+'</div><div class="vs">'+g.v.map(x=>'<button class="vb" data-h="r/'+encodeURIComponent(x.route)+'/'+x.bound+'/'+esc(x.service_type)+'">'+esc(vLabel(x))+'</button>').join('')+'</div></div>').join('');
 $('rmore').innerHTML=hits.length>shown?'<button id="moreB">'+esc(T('more',{n:hits.length-shown}))+'</button>':'';
 if($('moreB'))$('moreB').onclick=()=>{shown+=PAGE*3;renderRoutes()}}
$('rlist').addEventListener('click',e=>{const b=e.target.closest('.vb');if(b)location.hash=b.dataset.h});
let rqT=null;$('rq').addEventListener('input',()=>{clearTimeout(rqT);rqT=setTimeout(()=>{shown=PAGE;renderRoutes()},120)});
$('rq').addEventListener('keydown',e=>{if(e.key==='Enter'){const Q=$('rq').value.trim().toUpperCase();const g=GROUPS.find(x=>x.route===Q);if(g){const x=g.v[0];location.hash='r/'+encodeURIComponent(x.route)+'/'+x.bound+'/'+x.service_type}}});
function renderRecent(){const r=LS.get('kmbRecent',[]).filter(x=>x&&x.route);$('recent').innerHTML=r.length?'<span>'+esc(T('recent'))+'</span>'+r.map(x=>'<button data-h="r/'+encodeURIComponent(x.route)+'/'+x.b+'/'+esc(x.s)+'">'+esc(x.route)+'</button>').join(''):''}
$('recent').addEventListener('click',e=>{const b=e.target.closest('button');if(b)location.hash=b.dataset.h});
function addRecent(x){let r=LS.get('kmbRecent',[]).filter(y=>y&&y.route!==x.route);r.unshift({route:x.route,b:x.bound,s:x.service_type});LS.set('kmbRecent',r.slice(0,8))}

// ---- one route: stops + live ETA ----
let stops=[],names={},eta=null,lastSt=null,loadTok=0;
async function openRoute(r,b,s){show('S');$('rno').textContent=r;$('list').innerHTML='';$('st').textContent=T('loading');eta=null;lastSt=null;const tok=++loadTok;
 try{await loadRoutes();if(!GROUPS.length)buildGroups()}catch(e){$('st').textContent=T('loadFail',{e:String(e.message||e)});return}
 const vs=RL.filter(x=>x.route===r).sort((a,c)=>(+a.service_type-+c.service_type)||(a.bound<c.bound?1:-1));
 if(!vs.length){$('st').textContent=T('noMatch');$('dir').length=0;return}
 cur=vs.find(x=>x.bound===b&&x.service_type===s)||vs[0];cur._vs=vs;addRecent(cur);fillDir();
 try{const rs=await j('route-stop/'+encodeURIComponent(cur.route)+'/'+bw(cur.bound)+'/'+cur.service_type);if(tok!==loadTok)return;stops=(rs.data||[]).slice().sort((a,c)=>+a.seq-+c.seq)}
 catch(e){if(tok!==loadTok)return;stops=[];$('st').textContent=T('loadFail',{e:String(e.message||e)});return}
 names=await stopNames([...new Set(stops.map(x=>x.stop))]);if(tok!==loadTok)return;render();await loadEta()}
function fillDir(){const d=$('dir');d.length=0;if(!cur)return;cur._vs.forEach((x,i)=>{d.add(new Option(vLabel(x),i));if(x===cur)d.value=i});$('dtxt').textContent=vLabel(cur);
 $('swap').style.display=otherDir()?'':'none'}
function otherDir(){if(!cur)return null;const o=cur.bound==='O'?'I':'O';return cur._vs.find(x=>x.bound===o&&x.service_type===cur.service_type)||cur._vs.find(x=>x.bound===o)||null}
$('swap').onclick=()=>{const x=otherDir();if(x)location.hash='r/'+encodeURIComponent(x.route)+'/'+x.bound+'/'+x.service_type};
$('dir').onchange=()=>{const x=cur._vs[$('dir').value];location.hash='r/'+encodeURIComponent(x.route)+'/'+x.bound+'/'+x.service_type};
async function loadEta(){if(!cur)return;const c=cur;
 try{const r=await j('route-eta/'+encodeURIComponent(c.route)+'/'+c.service_type);if(c!==cur)return;eta=Array.isArray(r.data)?r.data:[];
  const ts=eta.find(e=>e.data_timestamp);lastSt={now:new Date(),ts:ts?new Date(ts.data_timestamp):null}}
 catch(e){if(c!==cur)return;eta=null;lastSt={err:String(e.message||e)}}
 showSt();render()}
function showSt(){if(!lastSt)return;$('st').textContent=(lastSt.err?T('loadFail',{e:lastSt.err}):T('upd',{t:tm(lastSt.now),d:lastSt.ts?tm(lastSt.ts):T('noData')}))+' · '+T('nStops',{n:stops.length})}
function fmt(e){if(!e.eta)return rmk(e)||T('noData');const t=new Date(e.eta);if(isNaN(t))return T('noData');const m=Math.round((t-Date.now())/60000);
 const hm=t.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Hong_Kong'});const k=rmk(e);return (m<=0?T('arriving'):T('mins',{m}))+' ('+hm+')'+(k?' '+k:'')}
const fresh=e=>!(e.eta&&new Date(e.eta)<Date.now()-120000);
const isFav=(c,s)=>favs.some(f=>f.route==c.route&&f.dir==c.bound&&f.st==c.service_type&&f.seq==+s.seq);
function render(){if(view!=='S'||!cur)return;const q=$('q').value.trim().toLowerCase();const L=$('list');L.innerHTML='';
 stops.forEach(s=>{const n=names[s.stop];const label=n?nm(n,'name'):'';if(q&&!(n&&((fx(n.name_tc)+(n.name_en||'')+(n.name_sc||t2s(fx(n.name_tc)))).toLowerCase().includes(q))))return;
  const es=eta==null?null:eta.filter(e=>e.dir==cur.bound&&e.seq==+s.seq&&fresh(e)).sort((a,b)=>a.eta_seq-b.eta_seq);
  const el=document.createElement('div');el.className='s';const fv=isFav(cur,s);
  el.innerHTML='<button class="star'+(fv?' on':'')+'" data-seq="'+esc(s.seq)+'">'+esc(T(fv?'faved':'fav'))+'</button><div class="n">'+esc(s.seq)+'. '+esc(label||T('noData'))+'</div><div class="e">'+esc(n?nm2(n,'name'):'')+'</div><div class="t">'+
   (es==null?(lastSt&&lastSt.err?esc(T('failShort')):esc(T('loading'))):es.length?es.map(fmt).map(esc).join('<br>'):esc(T('noEta')))+'</div>';L.append(el)})}
$('list').addEventListener('click',e=>{const b=e.target.closest('.star');if(!b||!cur)return;const s=stops.find(x=>String(x.seq)===b.dataset.seq);if(!s)return;
 if(isFav(cur,s))favs=favs.filter(f=>!(f.route==cur.route&&f.dir==cur.bound&&f.st==cur.service_type&&f.seq==+s.seq));
 else{const n=names[s.stop]||{};favs.push({route:cur.route,dir:cur.bound,st:cur.service_type,seq:+s.seq,stop:s.stop,name_tc:fx(n.name_tc),name_en:n.name_en||'',name_sc:n.name_sc||t2s(fx(n.name_tc)),dest_tc:fx(cur.dest_tc),dest_sc:cur.dest_sc||t2s(fx(cur.dest_tc)),dest_en:cur.dest_en||''})}
 saveF();render()});
$('q').oninput=render;$('r').onclick=loadEta;

// ---- favourites (same storage key as v1, so old favourites carry over) ----
const FK='kmbFavs';let favs=LS.get(FK,[]);if(!Array.isArray(favs))favs=[];const saveF=()=>LS.set(FK,favs);let lastF=null;
function drawF(){if(!lastF)return;const {res,ts,now}=lastF;const FL=$('flist');FL.innerHTML='';
 favs.forEach((f,i)=>{const d=res[i];const es=d?d.filter(e=>e.dir==f.dir&&e.seq==f.seq&&fresh(e)).sort((a,b)=>a.eta_seq-b.eta_seq):null;
  const n=(SM&&SM[f.stop])||{name_tc:f.name_tc,name_en:f.name_en,name_sc:f.name_sc},dest={dest_tc:f.dest_tc,dest_sc:f.dest_sc,dest_en:f.dest_en||(es&&es[0]&&es[0].dest_en)};
  const el=document.createElement('div');el.className='s fav';el.innerHTML='<button class="del" data-i="'+i+'">'+esc(T('del'))+'</button><div class="n"><a href="#r/'+encodeURIComponent(f.route)+'/'+esc(f.dir)+'/'+esc(f.st)+'">'+esc(f.route)+'</a> '+esc(T('to',{d:nm(dest,'dest')||T('noData')}))+'</div><div class="n">'+esc(f.seq)+'. '+esc(nm(n,'name')||T('noData'))+'</div><div class="e">'+esc(nm2(n,'name'))+'</div><div class="t">'+(es==null?esc(T('failShort')):es.length?es.map(fmt).map(esc).join('<br>'):esc(T('noEta')))+'</div>';FL.append(el)});
 FL.querySelectorAll('.del').forEach(b=>b.onclick=()=>{favs.splice(+b.dataset.i,1);saveF();loadF()});
 $('fst').textContent=T('upd',{t:tm(now),d:ts?tm(ts):T('noData')})}
async function loadF(){if(!favs.length){lastF=null;$('flist').innerHTML='<div class="s">'+esc(T('noFavs'))+'</div>';$('fst').textContent='';return}
 const res=await Promise.all(favs.map(f=>j('eta/'+f.stop+'/'+encodeURIComponent(f.route)+'/'+f.st).then(r=>r.data||[]).catch(()=>null)));let ts=null;
 res.forEach(d=>{if(d&&d[0]&&d[0].data_timestamp)ts=new Date(d[0].data_timestamp)});lastF={res,ts,now:new Date()};if(view==='F')drawF()}
setInterval(()=>{if(document.hidden)return;if(view==='S')loadEta();else if(view==='F')loadF()},30000);

// ---- language ----
$('lang').innerHTML=LANGS.map(([k,v])=>'<option value="'+k+'"'+(k==='mi'?' lang="mi"':'')+'>'+v+'</option>').join('');
function applyLang(){document.documentElement.lang=LANG;$('lang').value=LANG;$('lcodeT').textContent=LCODE[LANG]||LANG;document.title=T('title');
 document.querySelectorAll('[data-tr]').forEach(e=>e.textContent=T(e.dataset.tr));document.querySelectorAll('[data-ip]').forEach(e=>e.placeholder=T(e.dataset.ip));
 $('src').innerHTML=esc(T('src'))+' <a href="https://data.gov.hk/tc-data/dataset/hk-td-tis_21-etakmb" target="_blank" rel="noopener">'+esc(T('srcLink'))+'</a> · v'+VER;
 if(view==='R'&&RL)renderRoutes();else renderRecent();if(view==='S'){fillDir();showSt();render()}if(view==='F'){if(lastF)drawF();else loadF()}}
$('lang').onchange=()=>{LANG=$('lang').value;try{localStorage.setItem('kmbLang',LANG)}catch(e){}applyLang()};
applyLang();route();
if('serviceWorker' in navigator&&location.protocol!=='file:')window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{scope:'./'}).catch(()=>{}));
