const express = require('express');
const app = express();
const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { default: makeWASocket, useMultiFileAuthState, delay, makeCacheableSignalKeyStore, Browsers } = require("@whiskeysockets/baileys");
const pino = require("pino");

app.use(express.json());

app.get('/', (req,res)=>{
 res.send(`<html><head><title>ABDULLAH-MD PAIR</title></head><body style="background:#000;color:#fff;text-align:center;padding-top:50px;font-family:sans-serif"><h1>ABDULLAH-MD</h1><h3>Owner: 03327297075</h3><a href="https://whatsapp.com/channel/0029VbDl232JZg4CnW2atE28" style="color:cyan">Join My Channel</a><br><br><form onsubmit="event.preventDefault(); let n=document.getElementById('num').value; window.location='/code?number='+n"><input id="num" placeholder="923327297075" style="padding:10px" required><br><br><button style="padding:10px 20px;background:lime;border:none">GET PAIR CODE</button></form></body></html>`);
});

app.get('/code', async(req,res)=>{
 let num = req.query.number.replace(/[^0-9]/g,'');
 const { state, saveCreds } = await useMultiFileAuthState('./temp/'+num);
 let sock = makeWASocket({ auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({level:"silent"})) }, printQRInTerminal:false, logger:pino({level:"silent"}), browser: Browsers.macOS("Chrome") });
 if(!sock.authState.creds.registered){
  await delay(1500);
  let code = await sock.requestPairingCode(num);
  res.send(`<center style="margin-top:100px"><h1 style="font-size:50px">${code}</h1><h2>Go to WhatsApp > Linked Devices > Link with phone number</h2><h3>ABDULLAH-MD | 03327297075</h3></center>`);
 }
 sock.ev.on("creds.update", saveCreds);
 sock.ev.on("connection.update", async(s)=>{
   if(s.connection==="open"){
     let data = JSON.stringify(await require('fs').promises.readFile('./temp/'+num+'/creds.json'));
     let id = await pastebin.createPasteFromFile('./temp/'+num+'/creds.json',"ABDULLAH-MD","javascript",1,"N");
     let session = "ABDULLAH-MD~"+Buffer.from(id).toString('base64');
     console.log(session);
   }
 });
});

app.listen(3000);
