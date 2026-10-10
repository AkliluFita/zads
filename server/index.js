import http from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
try {
  const envText=await readFile(path.join(root,'.env'),'utf8');
  for(const line of envText.split(/\r?\n/)){const entry=line.trim().replace(/^export\s+/,'');if(!entry||entry.startsWith('#'))continue;const i=entry.indexOf('=');if(i<1)continue;const key=entry.slice(0,i).trim();let value=entry.slice(i+1).trim();if((value.startsWith('"')&&value.endsWith('"'))||(value.startsWith("'")&&value.endsWith("'")))value=value.slice(1,-1);if(!process.env[key])process.env[key]=value;}
} catch {}
const dataFile = path.resolve(process.env.ZADS_DATA_FILE || path.join(root, 'data', 'zads.json'));
const port = Number(process.env.PORT || 4174);
const host = process.env.HOST || '127.0.0.1';
const sessionKey = process.env.SESSION_SECRET || '';
const collections = ['products', 'blog_posts', 'inquiries', 'licenses'];
let store;
let writeQueue = Promise.resolve();
const loginAttempts = new Map();
const seed = { products: [
  { id:'sesame', name:'Sesame', category:'Export', origin:'Humera · Metema', description:'Export-grade Ethiopian sesame.', grade:'Confirm at quotation', packaging:'Confirm at quotation', season:'Confirm at quotation', technicalSpecs:{ moisture:'', impurity:'', color:'', grade:'' }, published:true },
  { id:'beans', name:'Beans', category:'Export', origin:'Wollega', description:'Ethiopian beans graded for size, colour and purity.', grade:'Confirm at quotation', packaging:'Confirm at quotation', season:'Confirm at quotation', technicalSpecs:{ moisture:'', impurity:'', color:'', grade:'' }, published:true },
  { id:'oils', name:'Oils', category:'Export', origin:'Ethiopia', description:'Ethiopian oils prepared for international trade.', grade:'Confirm at quotation', packaging:'Confirm at quotation', season:'Confirm at quotation', technicalSpecs:{ moisture:'', impurity:'', color:'', grade:'' }, published:true },
  { id:'textiles', name:'Textiles', category:'Import', origin:'Eastern Asia', description:'Men’s and women’s fabrics sourced through trusted partners.', published:true },
  { id:'construction-materials', name:'Construction materials', category:'Import', origin:'Eastern Asia', description:'Client-specific construction material sourcing.', published:true }
], blog_posts:[], inquiries:[], licenses:[], site_settings:{ company:'ZADS PLC', email:'Sazeleke@zadsplc.et', location:'Labu Haile Garment, Addis Ababa, Ethiopia', languages:['EN','AM'], businessHours:'' } };

async function init(){await mkdir(path.dirname(dataFile),{recursive:true});if(existsSync(dataFile)){store=JSON.parse(await readFile(dataFile,'utf8'));}else{store=structuredClone(seed);await persist();}}
function persist(){writeQueue=writeQueue.then(()=>writeFile(dataFile,JSON.stringify(store,null,2),'utf8'));return writeQueue;}
function reply(res,status,data,headers={}){res.writeHead(status,{'content-type':'application/json; charset=utf-8','cache-control':'no-store',...headers});res.end(JSON.stringify(data));}
async function body(req){let text='';for await(const part of req){text+=part;if(text.length>100_000)throw new Error('Request too large');}return text?JSON.parse(text):{};}
function cookie(req,name){return (req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(name+'='))?.slice(name.length+1)||'';}
function validSession(req){if(!sessionKey)return false;const [stamp,sig]=decodeURIComponent(cookie(req,'zads_session')).split('.');if(!stamp||!sig||Date.now()-Number(stamp)>12*60*60*1000)return false;const wanted=createHmac('sha256',sessionKey).update(stamp).digest('hex');try{return timingSafeEqual(Buffer.from(sig),Buffer.from(wanted));}catch{return false;}}
function secureCookie(){return process.env.NODE_ENV==='production'?'; Secure':'';}
function safeEqual(a,b){const x=Buffer.from(a);const y=Buffer.from(b);return x.length===y.length&&timingSafeEqual(x,y);}
async function sendEmail(inquiry){if(!process.env.SENDGRID_API_KEY)return;const text=Object.entries(inquiry).map(([k,v])=>`${k}: ${typeof v==='string'?v:JSON.stringify(v)}`).join('\n');const result=await fetch('https://api.sendgrid.com/v3/mail/send',{method:'POST',headers:{authorization:`Bearer ${process.env.SENDGRID_API_KEY}`,'content-type':'application/json'},body:JSON.stringify({personalizations:[{to:[...new Set(['surafel5711@gmail.com',process.env.ALERT_EMAIL||'Sazeleke@zadsplc.et'])].map(email=>({email})),subject:`${inquiry.referenceId} — ${inquiry.type}`}],from:{email:process.env.SENDGRID_FROM_EMAIL||process.env.ALERT_EMAIL||'Sazeleke@zadsplc.et'},reply_to:{email:inquiry.email},content:[{type:'text/plain',value:text}]})});if(!result.ok)throw new Error(`Email provider returned ${result.status}`);}
function cleanPath(p){try{return decodeURIComponent(p.split('?')[0]);}catch{return '/';}}

const server=http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');const pathname=cleanPath(url.pathname);
    if(pathname==='/api/public/products'&&req.method==='GET')return reply(res,200,store.products.filter(x=>x.published!==false));
    if(pathname==='/api/public/news'&&req.method==='GET')return reply(res,200,store.blog_posts.filter(x=>x.published===true));
    if(pathname==='/api/public/licenses'&&req.method==='GET')return reply(res,200,store.licenses.filter(x=>x.published===true));
    if(pathname==='/api/inquiries'&&req.method==='POST'){
      const input=await body(req);if(!input.consent||!input.name||!input.email)return reply(res,400,{error:'Name, email and consent are required.'});
      const now=new Date();const dateParts=new Intl.DateTimeFormat('en',{timeZone:'Africa/Addis_Ababa',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);const datePart=key=>dateParts.find(part=>part.type===key)?.value||'';const day=`${datePart('year')}${datePart('month')}${datePart('day')}`;const inquiry={...input,referenceId:`ZADS-INQ-${day}-${randomBytes(2).toString('hex').toUpperCase()}`,createdAt:now.toISOString(),status:'New'};delete inquiry.consent;store.inquiries.unshift(inquiry);await persist();
      let emailStatus='not-configured';try{await sendEmail(inquiry);emailStatus=process.env.SENDGRID_API_KEY?'sent':'not-configured';}catch{emailStatus='failed';}
      return reply(res,201,{referenceId:inquiry.referenceId,emailStatus});
    }
    if(pathname==='/api/admin/login'&&req.method==='POST'){
      const ip=req.socket.remoteAddress||'unknown';const attempts=loginAttempts.get(ip)||{count:0,start:Date.now()};if(Date.now()-attempts.start>15*60*1000){attempts.count=0;attempts.start=Date.now();}if(attempts.count>=8)return reply(res,429,{error:'Too many attempts. Try again in 15 minutes.'});
      const {email,password}=await body(req);if(!process.env.ADMIN_EMAIL||!process.env.ADMIN_PASSWORD||!sessionKey)return reply(res,503,{error:'Admin credentials are not configured on the server.'});
      if(!safeEqual(String(email||''),process.env.ADMIN_EMAIL)||!safeEqual(String(password||''),process.env.ADMIN_PASSWORD)){attempts.count++;loginAttempts.set(ip,attempts);return reply(res,401,{error:'Email or password is incorrect.'});}
      loginAttempts.delete(ip);const stamp=String(Date.now());const sig=createHmac('sha256',sessionKey).update(stamp).digest('hex');return reply(res,200,{ok:true},{'set-cookie':`zads_session=${stamp}.${sig}; HttpOnly; SameSite=Strict; Path=/; Max-Age=43200${secureCookie()}`});
    }
    if(pathname.startsWith('/api/admin/')){
      if(!validSession(req))return reply(res,401,{error:'Admin sign-in required.'});
      if(pathname==='/api/admin/data'&&req.method==='GET')return reply(res,200,{...store});
      if(pathname==='/api/admin/logout'&&req.method==='POST')return reply(res,200,{ok:true},{'set-cookie':`zads_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${secureCookie()}`});
      const match=pathname.match(/^\/api\/admin\/(products|blog_posts|inquiries|licenses)(?:\/([^/]+))?$/);
      if(match){const [,collection,id]=match;if(req.method==='POST'){const data=await body(req);const record={...data,id:data.id||randomBytes(8).toString('hex'),updatedAt:new Date().toISOString()};store[collection].unshift(record);await persist();return reply(res,201,record);}if(req.method==='PATCH'&&id){const data=await body(req);const index=store[collection].findIndex(x=>x.id===id);if(index<0)return reply(res,404,{error:'Record not found.'});store[collection][index]={...store[collection][index],...data,id,updatedAt:new Date().toISOString()};await persist();return reply(res,200,store[collection][index]);}if(req.method==='DELETE'&&id){store[collection]=store[collection].filter(x=>x.id!==id);await persist();return reply(res,200,{ok:true});}}
      if(pathname==='/api/admin/site_settings'&&req.method==='PUT'){store.site_settings={...store.site_settings,...await body(req)};await persist();return reply(res,200,store.site_settings);}
      return reply(res,404,{error:'Admin endpoint not found.'});
    }
    if(pathname.startsWith('/api/'))return reply(res,404,{error:'API endpoint not found.'});
    const requested=path.resolve(root,'dist',pathname==='/'?'index.html':'.'+pathname);const distRoot=path.resolve(root,'dist');if(requested!==distRoot&&!requested.startsWith(distRoot+path.sep))return reply(res,403,{error:'Forbidden'});
    let target=requested;try{await readFile(target);}catch{target=path.join(root,'dist','index.html');}
    const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain'};const bytes=await readFile(target);res.writeHead(200,{'content-type':types[path.extname(target)]||'application/octet-stream','x-content-type-options':'nosniff','referrer-policy':'strict-origin-when-cross-origin','x-frame-options':'DENY'});res.end(bytes);
  }catch(error){reply(res,500,{error:'Request could not be completed.'});console.error(error.message);}
});
await init();server.on('error',error=>{console.error(`Could not start ZADS server: ${error.message}`);process.exitCode=1;});
server.listen(port,host,()=>console.log(`ZADS site/API listening on ${host}:${port}`));
