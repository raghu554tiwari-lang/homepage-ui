(function(){

if(window.marcoV18) return;
window.marcoV18 = true;

var NEW_LOGO = 'https://i.ibb.co/bgrvwjG7/1000002876-removebg-preview-2.png';

var DOWNLOAD_LINK = 'https://m-store-chi.vercel.app';

var TEXT_REPLACEMENTS = [
  { from: 'PWTHOR owner', to: 'PW-MARCO owner' },
  { from: 'PW THOR owner', to: 'PW-MARCO owner' },
  { from: 'PW-THOR owner', to: 'PW-MARCO owner' },
  { from: '@pwthor', to: '@official_marco_22' },
  { from: '@PWTHOR', to: '@official_marco_22' },
  { from: '@PW_THOR', to: '@official_marco_22' },
  { from: 'PW THOR', to: 'PW-MARCO' },
  { from: 'PWTHOR', to: 'PW-MARCO' },
  { from: 'PW-THOR', to: 'PW-MARCO' },
  { from: 'PW_THOR', to: 'PW-MARCO' },
  { from: 'pwthor', to: 'PW-MARCO' },
  { from: 'Akki', to: 'Marco' },
  { from: 'AKKI', to: 'MARCO' },
  { from: 'akki', to: 'marco' },
  { from: 'AkkiBhai', to: 'Marco' },
  { from: 'Akki Bhai', to: 'Marco' },
  { from: 'akki bhai', to: 'marco' },
];

/* ============================================================
   BATCH TOKEN ENGINE  (AES-256-GCM  via WebCrypto)
   ============================================================ */

var BATCH_TOKEN_SECRET = 'PW-MARCO-SECRET-KEY-2025-BATCH!!';
var BATCH_TOKEN_DB_KEY  = 'marcoBatchTokenDB';
var BATCH_TOKEN_EXPIRY  = 10 * 60 * 1000;

function getBatchDB(){
  try{ return JSON.parse(localStorage.getItem(BATCH_TOKEN_DB_KEY)||'{}'); }
  catch(e){ return {}; }
}
function saveBatchDB(db){
  try{ localStorage.setItem(BATCH_TOKEN_DB_KEY, JSON.stringify(db)); }
  catch(e){}
}
function markTokenUsed(tokenId){
  var db=getBatchDB();
  if(db[tokenId]) db[tokenId].used=true;
  saveBatchDB(db);
}
function saveTokenRecord(tokenId, meta){
  var db=getBatchDB();
  db[tokenId]=meta;
  saveBatchDB(db);
}
function getTokenRecord(tokenId){
  var db=getBatchDB();
  return db[tokenId]||null;
}
function pruneTokenDB(){
  var db=getBatchDB(); var now=Date.now(); var changed=false;
  Object.keys(db).forEach(function(k){
    if(db[k].expiry && db[k].expiry < now){ delete db[k]; changed=true; }
  });
  if(changed) saveBatchDB(db);
}

function strToBytes(str){ return new TextEncoder().encode(str); }
function bytesToB64url(buf){
  var bytes=new Uint8Array(buf);
  var bin='';
  for(var i=0;i<bytes.length;i++) bin+=String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');
}
function b64urlToBytes(str){
  var b64=str.replace(/-/g,'+').replace(/_/g,'/');
  while(b64.length%4) b64+='=';
  var bin=atob(b64);
  var bytes=new Uint8Array(bin.length);
  for(var i=0;i<bin.length;i++) bytes[i]=bin.charCodeAt(i);
  return bytes;
}

async function getAESKey(){
  var keyBytes=strToBytes(BATCH_TOKEN_SECRET.substring(0,32));
  return crypto.subtle.importKey('raw',keyBytes,{name:'AES-GCM'},false,['encrypt','decrypt']);
}

async function generateBatchToken(url){
  var tokenId = bytesToB64url(crypto.getRandomValues(new Uint8Array(8)));
  var nonce   = bytesToB64url(crypto.getRandomValues(new Uint8Array(6)));
  var expiry  = Date.now() + BATCH_TOKEN_EXPIRY;
  var payload = JSON.stringify({ url:url, expiry:expiry, nonce:nonce, tokenId:tokenId });
  var iv      = crypto.getRandomValues(new Uint8Array(12));
  var key     = await getAESKey();
  var enc     = await crypto.subtle.encrypt({name:'AES-GCM', iv:iv}, key, strToBytes(payload));
  var combined = new Uint8Array(12 + enc.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(enc), 12);
  var token = bytesToB64url(combined);
  saveTokenRecord(tokenId, { expiry:expiry, used:false, url:url });
  return token;
}

async function decodeBatchToken(token){
  try{
    var combined = b64urlToBytes(token);
    var iv       = combined.slice(0,12);
    var cipher   = combined.slice(12);
    var key      = await getAESKey();
    var dec      = await crypto.subtle.decrypt({name:'AES-GCM', iv:iv}, key, cipher);
    var payload  = JSON.parse(new TextDecoder().decode(dec));
    if(!payload.url||!payload.expiry||!payload.tokenId)
      return {ok:false, reason:'Invalid token structure'};
    if(Date.now() > payload.expiry)
      return {ok:false, reason:'Token expired. Please generate a new one.'};
    var rec = getTokenRecord(payload.tokenId);
    if(rec && rec.used)
      return {ok:false, reason:'Token already used. Each token works only once.'};
    markTokenUsed(payload.tokenId);
    return {ok:true, url:payload.url};
  }catch(e){
    return {ok:false, reason:'Invalid or corrupted token.'};
  }
}

/* ============================================================
   CLIPBOARD HELPER
   ============================================================ */
function copyToClipboard(text){
  if(navigator.clipboard && navigator.clipboard.writeText){
    return navigator.clipboard.writeText(text).catch(function(){ fallbackCopy(text); });
  }
  fallbackCopy(text);
  return Promise.resolve();
}
function fallbackCopy(text){
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
  document.body.appendChild(ta);
  ta.focus(); ta.select();
  try{ document.execCommand('copy'); }catch(e){}
  document.body.removeChild(ta);
}

/* ============================================================
   BUILD SHARE MESSAGE
   ============================================================ */
function buildShareMessage(token){
  return (
    'PW-MARCO \u2013 Free Education Access\n\n' +
    'App Store: ' + DOWNLOAD_LINK + '\n\n' +
    'Download the App and Get Free Access To:\n\n' +
    '\u2022 Live Classes (All Batches)\n' +
    '\u2022 Recorded Lectures\n' +
    '\u2022 DPP & Notes\n' +
    '\u2022 Test Series\n' +
    '\u2022 Easy Batch Access\n' +
    '\u2022 Smooth & Fast Performance\n' +
    '\u2022 Clean User Interface\n' +
    '\u2022 Regular Updates\n\n' +
    'Batch Token (Single Use \u2013 Valid for 10 Minutes):\n\n' +
    token + '\n\n' +
    'How to Use:\n\n' +
    '1. Open App Store\n' +
    DOWNLOAD_LINK + '\n\n' +
    '2. Download and Install the App\n\n' +
    '3. Create Account & Login\n\n' +
    '4. Tap on Batch Button (Bottom Right)\n\n' +
    '5. Paste the Token\n\n' +
    '6. Your Batch Will Open Instantly\n\n' +
    'Important Note:\n\n' +
    '\u2022 Token works only one time\n' +
    '\u2022 Token expires after 10 minutes\n' +
    '\u2022 Use quickly after receiving\n' +
    '\u2022 Do not share after use\n\n' +
    'PW-MARCO \u2013 Fast, Simple & Free Learning App'
  );
}

/* ============================================================
   YOUTUBE-STYLE SHARE BOTTOM SHEET
   ============================================================ */
function showShareSheet(shareText, shareTitle){
  var old = document.getElementById('marcoShareSheet');
  if(old) old.remove();

  var encoded = encodeURIComponent(shareText);

  var apps = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      color: '#25D366',
      svg: '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#25D366"/><path d="M22.6 9.4A9.3 9.3 0 0 0 7.1 20.5L6 26l5.7-1.5a9.3 9.3 0 0 0 4.4 1.1 9.3 9.3 0 0 0 9.3-9.3c0-2.5-1-4.8-2.7-6.5l-.1-.4zM16.1 24a7.7 7.7 0 0 1-3.9-1l-.3-.2-3.4.9.9-3.3-.2-.3A7.7 7.7 0 1 1 16 24zm4.2-5.7c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1l-.6.8c-.1.1-.2.1-.4 0-.2-.1-.9-.3-1.7-1.1-.6-.6-1-1.3-1.2-1.5 0-.2 0-.3.1-.4l.4-.4.2-.4v-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 3.9 3.5.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.3-.5 1.5-1s.2-.9.1-1c-.1-.1-.2-.2-.4-.3z" fill="#fff"/></svg>',
      getUrl: function(){ return 'https://wa.me/?text=' + encoded; }
    },
    {
      id: 'telegram',
      label: 'Telegram',
      color: '#2AABEE',
      svg: '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#2AABEE"/><path d="M23.5 9L6.5 15.5c-1.1.4-1.1 1.1-.2 1.4l4.3 1.3 1.6 5c.2.6.5.8.9.8.4 0 .6-.2.9-.5l2.1-2 4.4 3.2c.8.4 1.4.2 1.6-.8l2.9-13.6c.3-1.2-.5-1.8-1.5-1.3z" fill="#fff"/></svg>',
      getUrl: function(){ return 'https://t.me/share/url?url=' + encodeURIComponent(DOWNLOAD_LINK) + '&text=' + encoded; }
    },
    {
      id: 'instagram',
      label: 'Instagram',
      color: '#E1306C',
      svg: '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="ig1" cx="30%" cy="107%" r="150%"><stop offset="0%" stop-color="#fdf497"/><stop offset="5%" stop-color="#fdf497"/><stop offset="45%" stop-color="#fd5949"/><stop offset="60%" stop-color="#d6249f"/><stop offset="90%" stop-color="#285AEB"/></radialGradient></defs><rect width="32" height="32" rx="8" fill="url(#ig1)"/><rect x="9" y="9" width="14" height="14" rx="4" stroke="#fff" stroke-width="1.8" fill="none"/><circle cx="16" cy="16" r="3.5" stroke="#fff" stroke-width="1.8" fill="none"/><circle cx="21" cy="11" r="1" fill="#fff"/></svg>',
      getUrl: function(){ return null; },
      special: 'instagram'
    },
    {
      id: 'sms',
      label: 'SMS',
      color: '#4CAF50',
      svg: '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#4CAF50"/><path d="M8 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3l-3 3-3-3H10a2 2 0 0 1-2-2v-8z" fill="#fff"/></svg>',
      getUrl: function(){
        var sep = /iphone|ipad|ipod/i.test(navigator.userAgent) ? '&' : '?';
        return 'sms:' + sep + 'body=' + encoded;
      }
    },
    {
      id: 'copy',
      label: 'Copy',
      color: '#555',
      svg: '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#555"/><rect x="11" y="8" width="10" height="13" rx="2" stroke="#fff" stroke-width="1.8" fill="none"/><rect x="8" y="11" width="10" height="13" rx="2" fill="#555" stroke="#fff" stroke-width="1.8"/></svg>',
      getUrl: function(){ return null; },
      special: 'copy'
    },
    {
      id: 'more',
      label: 'More',
      color: '#888',
      svg: '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#888"/><circle cx="10" cy="16" r="2" fill="#fff"/><circle cx="16" cy="16" r="2" fill="#fff"/><circle cx="22" cy="16" r="2" fill="#fff"/></svg>',
      getUrl: function(){ return null; },
      special: 'more'
    }
  ];

  var overlay = document.createElement('div');
  overlay.id = 'marcoShareSheet';
  overlay.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;z-index:2147483647;' +
    'background:rgba(0,0,0,0.55);display:flex;align-items:flex-end;justify-content:center;' +
    'animation:mssFadeIn .18s ease;';

  overlay.addEventListener('click', function(e){
    if(e.target === overlay) overlay.remove();
  });

  var sheet = document.createElement('div');
  sheet.style.cssText =
    'width:100%;max-width:540px;background:#1a1a1a;border-radius:20px 20px 0 0;' +
    'padding:0 0 env(safe-area-inset-bottom,12px);' +
    'animation:mssSlideUp .22s cubic-bezier(.32,1,.56,1);overflow:hidden;';

  var header = document.createElement('div');
  header.style.cssText =
    'display:flex;align-items:center;justify-content:space-between;' +
    'padding:16px 20px 12px;border-bottom:1px solid rgba(255,255,255,0.08);';
  header.innerHTML =
    '<span style="color:#fff;font-size:15px;font-weight:700;font-family:-apple-system,sans-serif;">Share via</span>' +
    '<button id="mssClose" style="background:rgba(255,255,255,0.1);border:none;color:#fff;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:15px;font-weight:700;display:flex;align-items:center;justify-content:center;font-family:monospace;padding:0;line-height:1;">X</button>';

  var appsRow = document.createElement('div');
  appsRow.style.cssText =
    'display:flex;flex-direction:row;overflow-x:auto;padding:18px 16px 20px;gap:8px;' +
    'scrollbar-width:none;-ms-overflow-style:none;';

  apps.forEach(function(app){
    var item = document.createElement('div');
    item.style.cssText =
      'display:flex;flex-direction:column;align-items:center;gap:7px;min-width:64px;cursor:pointer;flex-shrink:0;';

    var iconWrap = document.createElement('div');
    iconWrap.style.cssText =
      'width:52px;height:52px;border-radius:14px;overflow:hidden;' +
      'display:flex;align-items:center;justify-content:center;' +
      'background:' + app.color + ';transition:transform .12s ease;';
    iconWrap.innerHTML = app.svg;

    iconWrap.addEventListener('touchstart', function(){ iconWrap.style.transform='scale(0.9)'; }, {passive:true});
    iconWrap.addEventListener('touchend', function(){ iconWrap.style.transform='scale(1)'; }, {passive:true});

    var label = document.createElement('span');
    label.textContent = app.label;
    label.style.cssText =
      'color:rgba(255,255,255,0.75);font-size:11px;font-family:-apple-system,sans-serif;' +
      'text-align:center;max-width:64px;white-space:nowrap;';

    item.appendChild(iconWrap);
    item.appendChild(label);

    item.addEventListener('click', function(){
      if(app.special === 'copy'){
        copyToClipboard(shareText).then(function(){
          label.textContent = 'Copied!';
          label.style.color = '#43e97b';
          setTimeout(function(){ label.textContent = 'Copy'; label.style.color='rgba(255,255,255,0.75)'; }, 1800);
        });
        return;
      }
      if(app.special === 'instagram'){
        copyToClipboard(shareText).then(function(){
          overlay.remove();
          showToast('Text copied! Paste it in Instagram');
          var a = document.createElement('a');
          a.href = 'instagram://';
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
        return;
      }
      if(app.special === 'more'){
        overlay.remove();
        if(navigator.share){
          navigator.share({
            title: shareTitle,
            text: shareText,
            url: DOWNLOAD_LINK
          }).catch(function(){});
        } else {
          copyToClipboard(shareText).then(function(){ showToast('Copied!'); });
        }
        return;
      }
      var url = app.getUrl();
      if(url){
        overlay.remove();
        window.open(url, '_blank');
      }
    });

    appsRow.appendChild(item);
  });

  if(!document.getElementById('mssStyles')){
    var style = document.createElement('style');
    style.id = 'mssStyles';
    style.textContent =
      '@keyframes mssFadeIn{from{opacity:0}to{opacity:1}}' +
      '@keyframes mssSlideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}' +
      '#marcoShareSheet ::-webkit-scrollbar{display:none}';
    document.head.appendChild(style);
  }

  sheet.appendChild(header);
  sheet.appendChild(appsRow);
  overlay.appendChild(sheet);
  document.body.appendChild(overlay);

  document.getElementById('mssClose').addEventListener('click', function(){
    overlay.remove();
  });
}

/* ============================================================
   SHARE INTERCEPTOR
   ============================================================ */
function interceptBatchShare(){
  document.addEventListener('click', async function(e){
    var el = e.target;
    for(var i = 0; i < 8; i++){
      if(!el || el === document.body) break;
      var txt  = (el.textContent || '').trim().toLowerCase();
      var cls  = (el.className   || '').toString().toLowerCase();
      var aria = (el.getAttribute('aria-label') || '').toLowerCase();
      var isShare =
        txt === 'share'       ||
        txt === 'share batch' ||
        txt === 'share now'   ||
        aria.includes('share')||
        cls.includes('share') ||
        (el.tagName === 'BUTTON' && txt.includes('share'));
      if(isShare){
        var batchUrl =
          el.getAttribute('data-url')       ||
          el.getAttribute('data-share-url') ||
          el.getAttribute('data-link')      ||
          el.getAttribute('href')           ||
          window.location.href;
        e.preventDefault();
        e.stopImmediatePropagation();
        try{
          showToast('Generating secure token...');
          var tok = await generateBatchToken(batchUrl);
          var shareText  = buildShareMessage(tok);
          var shareTitle = 'PW-MARCO \u2013 Free Education Access';
          showShareSheet(shareText, shareTitle);
        }catch(err){
          showToast('Token generate failed. Try again.');
        }
        return;
      }
      el = el.parentElement;
    }
  }, true);
}

/* ============================================================
   LOADING SCREEN
   ============================================================ */
function showLoadingScreen(targetUrl, duration){
  var overlay = document.createElement('div');
  overlay.id = 'marcoLoadingScreen';
  overlay.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;z-index:2147483646;' +
    'background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);' +
    'display:flex;flex-direction:column;align-items:center;justify-content:center;' +
    'font-family:-apple-system,BlinkMacSystemFont,sans-serif;';

  overlay.innerHTML =
    '<div style="text-align:center;padding:20px;">' +

    '<div style="font-size:34px;font-weight:900;letter-spacing:1px;' +
      'background:linear-gradient(90deg,#43e97b,#38f9d7);' +
      '-webkit-background-clip:text;-webkit-text-fill-color:transparent;' +
      'margin-bottom:6px;">PW-MARCO</div>' +

    '<div style="color:rgba(255,255,255,0.4);font-size:12px;' +
      'letter-spacing:2px;margin-bottom:48px;">FREE EDUCATION PLATFORM</div>' +

    '<div id="marcoSpinner" style="' +
      'width:60px;height:60px;border-radius:50%;' +
      'border:5px solid rgba(255,255,255,0.08);' +
      'border-top:5px solid #43e97b;' +
      'border-right:5px solid #38f9d7;' +
      'animation:marcoSpin 0.85s linear infinite;' +
      'margin:0 auto 36px;"></div>' +

    '<div style="color:white;font-size:17px;font-weight:700;' +
      'margin-bottom:8px;">Loading your batches...</div>' +

    '<div style="color:rgba(255,255,255,0.4);font-size:13px;' +
      'margin-bottom:36px;">Please wait a moment</div>' +

    '<div style="width:240px;height:5px;background:rgba(255,255,255,0.08);' +
      'border-radius:10px;overflow:hidden;margin:0 auto 12px;">' +
      '<div id="marcoProgressBar" style="height:100%;width:0%;' +
        'background:linear-gradient(90deg,#43e97b,#38f9d7);' +
        'border-radius:10px;transition:width linear;"></div>' +
    '</div>' +

    '<div id="marcoCountdown" style="color:rgba(255,255,255,0.3);' +
      'font-size:12px;margin-bottom:0;">Opening in 7s</div>' +

    '</div>';

  if(!document.getElementById('marcoSpinStyle')){
    var st = document.createElement('style');
    st.id = 'marcoSpinStyle';
    st.textContent =
      '@keyframes marcoSpin{' +
        'from{transform:rotate(0deg)}' +
        'to{transform:rotate(360deg)}' +
      '}';
    document.head.appendChild(st);
  }

  document.body.appendChild(overlay);

  var bar = document.getElementById('marcoProgressBar');
  var countdown = document.getElementById('marcoCountdown');

  setTimeout(function(){
    if(bar){
      bar.style.transitionDuration = duration + 'ms';
      bar.style.width = '100%';
    }
  }, 60);

  var secsLeft = Math.round(duration / 1000);
  var countIv = setInterval(function(){
    secsLeft--;
    if(countdown) countdown.textContent = 'Opening in ' + secsLeft + 's';
    if(secsLeft <= 0) clearInterval(countIv);
  }, 1000);

  setTimeout(function(){
    if(overlay && overlay.parentElement){
      overlay.parentElement.removeChild(overlay);
    }
    window.location.href = targetUrl;
  }, duration);
}


/* ============================================================
   START LEARNING BUTTON INTERCEPTOR
   ============================================================ */
function interceptStartLearning(){
  document.addEventListener('click', function(e){
    var btn = e.target.closest('button, a, div');
    if(!btn) return;

    var txt = (btn.innerText || '').trim();

    if(txt.includes('Start Learning')){
      e.preventDefault();
      e.stopImmediatePropagation();

      if(window.__redirecting) return;
      window.__redirecting = true;

      sessionStorage.setItem("marco_redirect", "1");
window.location.href = 'https://pwthor.live/study/batches';
    }
  }, true);
}

/* ============ TEXT REPLACE ============ */
function replaceTextInNode(node){
  if(node.nodeType===Node.TEXT_NODE){
    var text=node.textContent;
    var changed=false;
    TEXT_REPLACEMENTS.forEach(function(r){
      if(text.includes(r.from)){text=text.split(r.from).join(r.to);changed=true;}
    });
    if(changed) node.textContent=text;
  } else if(node.nodeType===Node.ELEMENT_NODE&&node.tagName!=='SCRIPT'&&node.tagName!=='STYLE'){
    node.childNodes.forEach(replaceTextInNode);
  }
}
function replaceAllText(){ if(document.body) replaceTextInNode(document.body); }

function replaceLogo(){
  document.querySelectorAll('img').forEach(function(img){

    if(img.dataset.logoReplaced) return;

    var rect = img.getBoundingClientRect();

    // 🎯 sirf top-left corner ka logo
    if(
      rect.top < 120 &&      // top area
      rect.left < 80 &&      // left side (IMPORTANT)
      rect.width > 20 && rect.width < 120 &&
      rect.height > 20 && rect.height < 120
    ){
      img.dataset.logoReplaced = '1';
      img.src = NEW_LOGO;

      img.style.cssText =
        'width:42px!important;height:42px!important;' +
        'object-fit:cover!important;object-position:center!important;' +
        'border-radius:50%!important;' +
        'display:block!important;margin:0!important;padding:0!important;';
    }

  });
}

function replaceLogo(){
  document.querySelectorAll('img').forEach(function(img){

    if(img.dataset.logoReplaced) return;

    var rect = img.getBoundingClientRect();

    // 🎯 sirf top-left corner ka logo
    if(
      rect.top < 120 &&      // top area
      rect.left < 80 &&      // left side (IMPORTANT)
      rect.width > 20 && rect.width < 120 &&
      rect.height > 20 && rect.height < 120
    ){
      img.dataset.logoReplaced = '1';
      img.src = NEW_LOGO;

      img.style.cssText =
        'width:42px!important;height:42px!important;' +
        'object-fit:cover!important;object-position:center!important;' +
        'border-radius:50%!important;' +
        'display:block!important;margin:0!important;padding:0!important;';
    }

  });
}

/* ============ HAMBURGER MENU ============ */
function editHamburgerMenu(){
  document.querySelectorAll('a, li, div').forEach(function(el){
    if(!el.offsetParent) return;
    var text=el.textContent.trim();
    if(text==='Join Telegram'||text==='Donate Batch'||text==='Contact Us'||text==='Test Series'){
      el.style.setProperty('display','none','important');
    }
  });
}

/* ============ TELEGRAM POPUP ============ */
function handleTelegram(){
  document.querySelectorAll('*').forEach(function(el){
    if(!el.offsetParent) return;
    if(!el.dataset.origText) el.dataset.origText=el.textContent||'';
    var text=el.dataset.origText;
    if(!text.includes('PW_THOR')&&!text.includes('Join The Channel For Latest')&&!text.includes('Telegram Community')) return;
    var tag=el.tagName;
    if(tag==='BODY'||tag==='HTML'||tag==='MAIN') return;
    if(el.dataset.handled) return;
    el.dataset.handled='1';
    el.style.setProperty('visibility','visible','important');
    var closeBtn=el.querySelector('[class*="close" i]')||el.querySelector('[aria-label*="close" i]')||el.querySelector('button');
    if(closeBtn){closeBtn.click();}else{el.style.setProperty('display','none','important');}
    setTimeout(function(){
      document.body.style.overflow='auto';
      document.body.style.pointerEvents='auto';
      document.documentElement.style.overflow='auto';
    },300);
  });
  document.querySelectorAll('a, button').forEach(function(el){
    var t=el.textContent.trim().toLowerCase();
    if(t==='join telegram channel'||t==='join now') el.style.setProperty('display','none','important');
  });
}

/* ============ WATERMARK ============ */
function applyWatermark(){
  function isBannerImage(img){
    if(img.dataset.logoReplaced||img.dataset.wmDone||!img.offsetParent) return false;
    var rect=img.getBoundingClientRect();
    if(rect.width<200||rect.height<80) return false;
    if(img.naturalWidth>0&&img.naturalWidth<200) return false;
    if(img.naturalHeight>0&&img.naturalHeight<80) return false;
    var parent=img.parentElement;
    for(var i=0;i<8;i++){
      if(!parent) break;
      var cls=(parent.className||'').toLowerCase();
      var role=(parent.getAttribute('role')||'').toLowerCase();
      if(cls.includes('drawer')||cls.includes('sidebar')||cls.includes('menu')||
         cls.includes('nav')||cls.includes('header')||cls.includes('navbar')||
         cls.includes('dialog')||cls.includes('modal')||cls.includes('leaderboard')||
         role==='dialog'||role==='menu') return false;
      parent=parent.parentElement;
    }
    return true;
  }
  function addWatermark(img){
    if(!isBannerImage(img)) return;
    img.dataset.wmDone='1';
    var wrapper=img.parentElement;
    if(!wrapper||wrapper.querySelector('.pw-marco-wm')) return;
    if(window.getComputedStyle(wrapper).position==='static') wrapper.style.position='relative';
    var w=document.createElement('div');
    w.className='pw-marco-wm';
    w.innerText='Powered by MARCO';
    w.style.cssText='position:absolute;bottom:6px;right:6px;background:rgba(0,0,0,0.75);color:white;font-size:11px;font-weight:bold;padding:3px 8px;border-radius:6px;z-index:1;pointer-events:none;letter-spacing:0.5px';
    wrapper.appendChild(w);
  }
  function watermarkAll(){ document.querySelectorAll('img').forEach(addWatermark); }
  watermarkAll();
  document.addEventListener('load',function(e){ if(e.target.tagName==='IMG') addWatermark(e.target); },true);
  new MutationObserver(watermarkAll).observe(document.body,{childList:true,subtree:true});
}

/* ============ REMOTE LOCK ============ */
function remoteLock(){
  fetch('https://raw.githubusercontent.com/pwxmarco/pwmarcoapodev/refs/heads/main/app-control.json?t='+Date.now())
  .then(function(r){return r.json();})
  .then(function(cfg){
    if(cfg.app==='off'){
      document.body.innerHTML='<div style="height:100vh;background:#0a0a0a;color:white;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:20px;font-family:sans-serif;"><div style="font-size:36px;font-weight:900;background:linear-gradient(90deg,#43e97b,#38f9d7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">PW-MARCO</div><p style="margin-top:12px;color:#aaa;font-size:14px;">App is under maintenance.<br>Temporarily disabled by developer.<br>Please check back later.</p><p style="opacity:.4;margin-top:16px;font-size:12px;">Powered by MARCO</p></div>';
    }
  }).catch(function(){});
}

/* ============ FIREBASE AUTH ============ */
function loadFirebase(cb){
  if(window.firebase){cb();return;}
  var s1=document.createElement('script');
  s1.src='https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js';
  s1.async=true;
  var s2=document.createElement('script');
  s2.src='https://www.gstatic.com/firebasejs/9.22.2/firebase-auth-compat.js';
  s2.async=true;
  document.head.appendChild(s1);
  document.head.appendChild(s2);
  s2.onload=function(){
    firebase.initializeApp({
      apiKey:'AIzaSyAMsA65Eg4swzh8fV2uatPHhE63rkgT-To',
      authDomain:'marcopwapp.firebaseapp.com',
      projectId:'marcopwapp'
    });
    cb();
  };
}

function authBg(){
  return 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999999;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);font-family:-apple-system,BlinkMacSystemFont,sans-serif;';
}
function inputSt(){
  return 'width:100%;padding:13px 14px;border-radius:10px;border:1.5px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.07);color:white;font-size:14px;box-sizing:border-box;outline:none;margin-bottom:10px;';
}
function primaryBtnSt(){
  return 'width:100%;padding:13px;background:linear-gradient(90deg,#43e97b,#38f9d7);border:none;border-radius:12px;color:#0a0a0a;font-weight:800;font-size:15px;cursor:pointer;margin-top:4px;';
}

function showLogin(){
  var ex=document.getElementById('marcoAuthDiv');
  if(ex) ex.remove();
  var div=document.createElement('div');
  div.id='marcoAuthDiv';
  div.style.cssText=authBg();
  div.innerHTML=
    '<div style="background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);padding:32px 24px 24px;border-radius:24px;width:90%;max-width:340px;border:1px solid rgba(255,255,255,0.1);box-shadow:0 20px 60px rgba(0,0,0,0.5);">'+
    '<div style="text-align:center;margin-bottom:24px;">'+
    '<div style="font-size:28px;font-weight:900;background:linear-gradient(90deg,#43e97b,#38f9d7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:1px;">PW-MARCO</div>'+
    '<div style="color:rgba(255,255,255,0.4);font-size:11px;margin-top:4px;">FREE EDUCATION PLATFORM</div>'+
    '<div style="font-size:16px;font-weight:700;color:white;margin-top:14px;">Welcome Back</div>'+
    '<div style="color:rgba(255,255,255,0.4);font-size:12px;margin-top:3px;">Sign in to continue</div>'+
    '</div>'+
    '<div id="marcoLoginErr" style="display:none;background:rgba(255,60,60,0.15);border:1px solid rgba(255,80,80,0.3);border-radius:10px;padding:10px 12px;font-size:12px;color:#ff9a9a;margin-bottom:12px;text-align:center;"></div>'+
    '<input id="lEmail" type="email" placeholder="Email address" style="'+inputSt()+'">'+
    '<input id="lPass" type="password" placeholder="Password" style="'+inputSt()+'">'+
    '<button id="loginBtn" style="'+primaryBtnSt()+'">Sign In</button>'+
    '<div style="text-align:center;margin-top:16px;color:rgba(255,255,255,0.4);font-size:12px;">New here? <span id="goSignup" style="color:#43e97b;cursor:pointer;font-weight:700;">Create Account</span></div>'+
    '<div style="text-align:center;margin-top:18px;color:rgba(255,255,255,0.2);font-size:10px;">Powered by MARCO</div>'+
    '</div>';
  document.body.appendChild(div);
  var err=document.getElementById('marcoLoginErr');
  document.getElementById('loginBtn').onclick=function(){
    var btn=document.getElementById('loginBtn');
    btn.innerText='Signing in...';btn.style.opacity='0.7';err.style.display='none';
    firebase.auth().signInWithEmailAndPassword(
      document.getElementById('lEmail').value,
      document.getElementById('lPass').value
    ).then(function(){div.remove();}).catch(function(e){
      btn.innerText='Sign In';btn.style.opacity='1';
      err.style.display='block';err.innerText=e.message;
    });
  };
  document.getElementById('goSignup').onclick=function(){div.remove();showSignup();};
}

function showSignup(){
  var ex=document.getElementById('marcoAuthDiv');
  if(ex) ex.remove();
  var div=document.createElement('div');
  div.id='marcoAuthDiv';
  div.style.cssText=authBg();
  div.innerHTML=
    '<div style="background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);padding:32px 24px 24px;border-radius:24px;width:90%;max-width:340px;border:1px solid rgba(255,255,255,0.1);box-shadow:0 20px 60px rgba(0,0,0,0.5);">'+
    '<div style="text-align:center;margin-bottom:24px;">'+
    '<div style="font-size:28px;font-weight:900;background:linear-gradient(90deg,#43e97b,#38f9d7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:1px;">PW-MARCO</div>'+
    '<div style="color:rgba(255,255,255,0.4);font-size:11px;margin-top:4px;">FREE EDUCATION PLATFORM</div>'+
    '<div style="font-size:16px;font-weight:700;color:white;margin-top:14px;">Create Account</div>'+
    '<div style="color:rgba(255,255,255,0.4);font-size:12px;margin-top:3px;">Join PW-MARCO for free</div>'+
    '</div>'+
    '<div id="marcoSignupErr" style="display:none;background:rgba(255,60,60,0.15);border:1px solid rgba(255,80,80,0.3);border-radius:10px;padding:10px 12px;font-size:12px;color:#ff9a9a;margin-bottom:12px;text-align:center;"></div>'+
    '<input id="sEmail" type="email" placeholder="Email address" style="'+inputSt()+'">'+
    '<input id="sPass" type="password" placeholder="Password (min 6 chars)" style="'+inputSt()+'">'+
    '<button id="signupBtn" style="'+primaryBtnSt()+'">Create Account</button>'+
    '<div style="text-align:center;margin-top:16px;color:rgba(255,255,255,0.4);font-size:12px;">Already have account? <span id="goLogin" style="color:#43e97b;cursor:pointer;font-weight:700;">Sign In</span></div>'+
    '<div style="text-align:center;margin-top:18px;color:rgba(255,255,255,0.2);font-size:10px;">Powered by MARCO</div>'+
    '</div>';
  document.body.appendChild(div);
  var err=document.getElementById('marcoSignupErr');
  document.getElementById('signupBtn').onclick=function(){
    var btn=document.getElementById('signupBtn');
    btn.innerText='Creating...';btn.style.opacity='0.7';err.style.display='none';
    firebase.auth().createUserWithEmailAndPassword(
      document.getElementById('sEmail').value,
      document.getElementById('sPass').value
    ).then(function(){div.remove();}).catch(function(e){
      btn.innerText='Create Account';btn.style.opacity='1';
      err.style.display='block';err.innerText=e.message;
    });
  };
  document.getElementById('goLogin').onclick=function(){div.remove();showLogin();};
}

function initAuth(){
  firebase.auth().onAuthStateChanged(function(user){
    if(!user) showLogin();
  });
}

/* ============ WELCOME POPUP ============ */
function showWelcomePopup(){
  var ov=document.createElement('div');
  ov.id='marcoWelcomeOv';
  ov.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999999;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;';
  ov.innerHTML=
    '<div style="background:linear-gradient(160deg,#0f2027,#203a43,#2c5364);border-radius:22px;width:88%;max-width:360px;padding:24px 20px 20px;color:white;position:relative;box-shadow:0 8px 32px rgba(0,0,0,0.6);">'+
    '<button id="marcoWelcomeClose" style="position:absolute;top:12px;right:14px;background:rgba(255,255,255,0.15);border:none;color:white;font-size:14px;width:30px;height:30px;border-radius:50%;cursor:pointer;font-weight:700;">x</button>'+
    '<div style="text-align:center;margin-bottom:14px;">'+
    '<div style="font-size:28px;font-weight:900;letter-spacing:1px;background:linear-gradient(90deg,#43e97b,#38f9d7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">PW-MARCO</div>'+
    '<div style="font-size:12px;color:#a0d9ff;margin-top:2px;">Free Education. No Compromise.</div>'+
    '</div>'+
    '<div style="background:rgba(255,60,60,0.18);border:1px solid rgba(255,80,80,0.4);border-radius:10px;padding:8px 12px;font-size:12px;color:#ff9a9a;text-align:center;margin-bottom:12px;">'+
    'Do NOT purchase this app from anyone. It is 100% FREE always.'+
    '</div>'+
    '<div style="font-size:13px;line-height:2;">'+
    '<div style="font-weight:700;color:#43e97b;margin-bottom:6px;">What is Available Free</div>'+
    '<div>- Live Classes, all batches</div>'+
    '<div>- Recorded Lectures, full access</div>'+
    '<div>- DPP and Notes, download anytime</div>'+
    '<div>- Quizzes and Test Series</div>'+
    '<div>- Regular, Infinity, Infinity Pro batches</div>'+
    '<div>- Fastrack and all other batches</div>'+
    '<div>- Full Test Series, working</div>'+
    '<div>- Instant updates, always latest</div>'+
    '</div>'+
    '<div style="border-top:1px solid rgba(255,255,255,0.12);margin:14px 0 12px;"></div>'+
    '<button id="marcoFollowBtn" style="width:100%;padding:11px;background:linear-gradient(90deg,#f953c6,#b91d73);border:none;border-radius:12px;color:white;font-weight:700;font-size:14px;cursor:pointer;">Follow Developer on Instagram</button>'+
    '<div style="margin-top:10px;text-align:center;">'+
    '<div id="marcoTimerTxt" style="font-size:10px;color:rgba(255,255,255,0.4);margin-bottom:4px;">Auto-closing in 10s</div>'+
    '<div style="height:3px;background:rgba(255,255,255,0.1);border-radius:3px;overflow:hidden;">'+
    '<div id="marcoTimerBar" style="height:100%;width:100%;background:linear-gradient(90deg,#43e97b,#38f9d7);border-radius:3px;"></div>'+
    '</div>'+
    '</div>'+
    '</div>';
  document.body.appendChild(ov);
  setTimeout(function(){
    var bar=document.getElementById('marcoTimerBar');
    if(bar){bar.style.transition='width 10s linear';bar.style.width='0%';}
  },50);
  var secs=10;
  var iv=setInterval(function(){
    secs--;
    var t=document.getElementById('marcoTimerTxt');
    if(t) t.textContent='Auto-closing in '+secs+'s';
    if(secs<=0){clearInterval(iv);closeW();}
  },1000);
  function closeW(){
    clearInterval(iv);
    if(ov&&ov.parentElement) ov.parentElement.removeChild(ov);
  }
  document.getElementById('marcoWelcomeClose').onclick=function(){closeW();};
  document.getElementById('marcoFollowBtn').onclick=function(){
    window.open('https://instagram.com/official_marco_22/','_blank');
  };
}

/* ============ TOAST ============ */
function showToast(msg){
  var t=document.createElement('div');
  t.innerText=msg;
  t.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(67,233,123,0.95);color:#0a0a0a;padding:10px 20px;border-radius:50px;font-size:13px;font-weight:700;z-index:9999999;white-space:nowrap;box-shadow:0 4px 16px rgba(0,0,0,0.4);';
  document.body.appendChild(t);
  setTimeout(function(){ if(t.parentElement) t.parentElement.removeChild(t); },2500);
}

/* ============ UI BUTTONS + POPUPS ============ */
function initUI(){
  if(document.getElementById('marcoUIInit')) return;
  var marker=document.createElement('div');
  marker.id='marcoUIInit';marker.style.display='none';
  document.body.appendChild(marker);

  var btnDefs=[
    {label:'info',  bottom:240, bg:'#ff416c'},
    {label:'Brainix',bottom:180, bg:'#4facfe'},
    {label:'Live',  bottom:120, bg:'#00c853'},
    {label:'Batch', bottom:60,  bg:'#f7971e'},
  ];

  var buttons=btnDefs.map(function(def){
    var b=document.createElement('div');
    b.innerText=def.label;
    b.style.cssText=
      'position:fixed;right:20px;bottom:'+def.bottom+'px;'+
      'padding:10px 16px;border-radius:50px;color:white;'+
      'z-index:999997;background:'+def.bg+';white-space:nowrap;'+
      'cursor:pointer;font-size:13px;font-weight:700;'+
      'box-shadow:0 3px 12px rgba(0,0,0,0.4);'+
      'transition:transform 0.35s ease,opacity 0.35s ease;';
    document.body.appendChild(b);
    return b;
  });

  var btnInfo=buttons[0], btnBrain=buttons[1], btnLive=buttons[2], btnBatch=buttons[3];

  var arrow=document.createElement('div');
  arrow.innerText='<';
  arrow.style.cssText=
    'position:fixed;right:0;top:50%;transform:translateY(-50%);'+
    'background:#222;color:white;padding:10px 8px;'+
    'border-radius:10px 0 0 10px;z-index:999997;cursor:pointer;'+
    'font-size:14px;font-weight:700;display:none;'+
    'box-shadow:-2px 0 8px rgba(0,0,0,0.3);';
  document.body.appendChild(arrow);

  var hidden=false;
  var hideTimer=null;

  function hideBtns(){
    hidden=true;
    buttons.forEach(function(b){ b.style.transform='translateX(160px)'; b.style.opacity='0'; });
    arrow.style.display='block';
  }
  function showBtns(){
    hidden=false;
    buttons.forEach(function(b){ b.style.transform='translateX(0)'; b.style.opacity='1'; });
    arrow.style.display='none';
    resetHideTimer();
  }
  function resetHideTimer(){
    if(hideTimer) clearTimeout(hideTimer);
    hideTimer=setTimeout(hideBtns,4000);
  }
  resetHideTimer();
  arrow.onclick=function(){ showBtns(); };

  /* ===== INFO POPUP ===== */
  var infoPopup=document.createElement('div');
  infoPopup.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.65);display:none;align-items:flex-start;justify-content:center;z-index:9999998;overflow-y:auto;padding:16px 0;box-sizing:border-box;';
  infoPopup.innerHTML=
    '<div style="background:linear-gradient(160deg,#141e30,#243b55);border-radius:22px;width:88%;max-width:380px;padding:22px 18px 18px;color:white;margin:auto;box-shadow:0 8px 32px rgba(0,0,0,0.5);">'+
    '<div style="text-align:center;margin-bottom:16px;">'+
    '<div style="font-size:22px;font-weight:900;background:linear-gradient(90deg,#43e97b,#38f9d7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">PW-MARCO</div>'+
    '<div style="font-size:11px;color:#a0d9ff;margin-top:3px;">Complete App Guide</div>'+
    '</div>'+
    '<div style="background:linear-gradient(135deg,rgba(67,233,123,0.12),rgba(56,249,215,0.08));border:1px solid rgba(67,233,123,0.25);border-radius:12px;padding:12px 14px;margin-bottom:14px;text-align:center;">'+
    '<div style="font-size:13px;font-weight:600;color:#e0fff8;line-height:1.7;font-style:italic;">Padhlo chahe kahi se,<br>manzil milegi yahi se....</div>'+
    '<div style="font-size:11px;color:#43e97b;font-weight:700;margin-top:6px;">Love from PW-MARCO</div>'+
    '</div>'+
    '<div style="background:rgba(255,60,60,0.18);border:1px solid rgba(255,80,80,0.4);border-radius:10px;padding:8px 12px;font-size:12px;color:#ff9a9a;text-align:center;margin-bottom:14px;">'+
    'This app is 100% FREE. Do NOT pay anyone for it.'+
    '</div>'+
    '<div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:12px 14px;margin-bottom:10px;">'+
    '<div style="font-size:12px;font-weight:700;color:#43e97b;margin-bottom:6px;">WHAT IS AVAILABLE FREE</div>'+
    '<div style="font-size:13px;line-height:2;">'+
    '<div>- Live Classes, all batches</div>'+
    '<div>- Recorded Lectures, full access</div>'+
    '<div>- DPP and Notes, download anytime</div>'+
    '<div>- Quizzes and Test Series</div>'+
    '<div>- Regular, Infinity, Infinity Pro batches</div>'+
    '<div>- Fastrack and all other batches</div>'+
    '<div>- Full Test Series, working</div>'+
    '<div>- Instant updates, always latest</div>'+
    '</div>'+
    '</div>'+
    '<div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:12px 14px;margin-bottom:10px;">'+
    '<div style="font-size:12px;font-weight:700;color:#00c853;margin-bottom:6px;">HOW TO ATTEND LIVE CLASS</div>'+
    '<div style="font-size:13px;line-height:2;">'+
    '<div>1. Open Hamburger Menu (top-left)</div>'+
    '<div>2. Tap Study section</div>'+
    '<div>3. Select Live Classes</div>'+
    '<div>4. Attend your class directly</div>'+
    '<div style="color:#a0d9ff;margin-top:4px;font-size:12px;">Or use Live button (bottom-right) - paste Video Token and tap Open Video</div>'+
    '</div>'+
    '</div>'+
    '<div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:12px 14px;margin-bottom:10px;">'+
    '<div style="font-size:12px;font-weight:700;color:#f7971e;margin-bottom:6px;">HOW TO OPEN A BATCH VIA TOKEN</div>'+
    '<div style="font-size:13px;line-height:2;">'+
    '<div>1. Get Batch Token from a friend</div>'+
    '<div>2. Tap <b>Batch</b> button (bottom-right)</div>'+
    '<div>3. Paste the token in the box</div>'+
    '<div>4. Tap <b>Open Batch</b></div>'+
    '<div>5. Batch opens instantly!</div>'+
    '<div style="color:#ff9a9a;margin-top:4px;font-size:12px;">Each token is single-use &amp; expires in 10 min. Generate a new one from Share button inside batch.</div>'+
    '</div>'+
    '</div>'+
    '<div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:12px 14px;margin-bottom:10px;">'+
    '<div style="font-size:12px;font-weight:700;color:#4facfe;margin-bottom:6px;">HOW TO ENROLL IN A BATCH</div>'+
    '<div style="font-size:13px;line-height:2;">'+
    '<div>1. Open Hamburger Menu, tap Batches</div>'+
    '<div>2. Find your desired batch</div>'+
    '<div>3. Tap Enroll - it is completely free</div>'+
    '<div>4. Batch added to My Batches</div>'+
    '</div>'+
    '</div>'+
    '<div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:12px 14px;margin-bottom:10px;">'+
    '<div style="font-size:12px;font-weight:700;color:#f953c6;margin-bottom:6px;">INSIDE A BATCH - WHAT YOU GET</div>'+
    '<div style="font-size:13px;line-height:2;">'+
    '<div style="color:#38f9d7;font-weight:600;">Description tab</div>'+
    '<div>- Batch start date and full details</div>'+
    '<div>- Faculty info and schedule</div>'+
    '<div style="color:#38f9d7;font-weight:600;margin-top:4px;">All Classes tab</div>'+
    '<div>- Subject-wise recorded lectures</div>'+
    '<div>- Notes, DPP, DPP Video Solutions</div>'+
    '<div>- Quizzes for each topic</div>'+
    '<div style="color:#38f9d7;font-weight:600;margin-top:4px;">Test tab</div>'+
    '<div>- Master Test Series and batch tests</div>'+
    '<div style="color:#38f9d7;font-weight:600;margin-top:4px;">Share button</div>'+
    '<div>- Generates secure Batch Token</div>'+
    '<div>- Token valid 10 min, single-use</div>'+
    '<div style="color:#38f9d7;font-weight:600;margin-top:4px;">Announcement tab</div>'+
    '<div>- Class cancel or reschedule alerts</div>'+
    '</div>'+
    '</div>'+
    '<div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:12px 14px;margin-bottom:10px;">'+
    '<div style="font-size:12px;font-weight:700;color:#ffb300;margin-bottom:6px;">HOW TO DOWNLOAD A LECTURE</div>'+
    '<div style="font-size:13px;line-height:2;">'+
    '<div style="color:#ff9a9a;font-size:12px;">Only Recorded lectures can be downloaded</div>'+
    '<div>1. Open recorded lecture on Android</div>'+
    '<div>2. Tap 3-dot menu (top-right of player)</div>'+
    '<div>3. Tap Download</div>'+
    '<div>4. Select quality</div>'+
    '<div>5. Tap Execute Download</div>'+
    '<div style="color:#ff9a9a;font-size:12px;margin-top:4px;">Do NOT close app until download completes.</div>'+
    '</div>'+
    '</div>'+
    '<div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:12px 14px;margin-bottom:10px;">'+
    '<div style="font-size:12px;font-weight:700;color:#38f9d7;margin-bottom:6px;">XP AND PROFILE</div>'+
    '<div style="font-size:13px;line-height:2;">'+
    '<div>- XP shows your real PW rank</div>'+
    '<div>- Tap XP section to view details</div>'+
    '<div style="color:#38f9d7;font-weight:600;margin-top:4px;">To Logout</div>'+
    '<div>1. Tap Profile icon (top-right)</div>'+
    '<div>2. Tap Logout button</div>'+
    '</div>'+
    '</div>'+
    '<div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:12px 14px;margin-bottom:14px;">'+
    '<div style="font-size:12px;font-weight:700;color:#4facfe;margin-bottom:6px;">DEVELOPER</div>'+
    '<div style="font-size:13px;line-height:1.8;">'+
    '<div>Marco - @official_marco_22</div>'+
    '<div>Built for students, by a student</div>'+
    '</div>'+
    '</div>'+
    '<button onclick="window.open(\'https://instagram.com/official_marco_22/\')" style="width:100%;padding:12px;background:linear-gradient(90deg,#f953c6,#b91d73);border:none;border-radius:12px;color:white;font-weight:700;font-size:14px;cursor:pointer;margin-bottom:8px;">Follow on Instagram</button>'+
    '<button onclick="window.open(\'https://t.me/officialmarco22/\')" style="width:100%;padding:12px;background:linear-gradient(90deg,#0072ff,#00c6ff);border:none;border-radius:12px;color:white;font-weight:700;font-size:14px;cursor:pointer;margin-bottom:8px;">Contact on Telegram</button>'+
    '<button id="infoClose" style="width:100%;padding:11px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:12px;color:white;font-size:13px;cursor:pointer;">Close</button>'+
    '</div>';
  document.body.appendChild(infoPopup);
  btnInfo.onclick=function(){ infoPopup.style.display='flex'; };
  document.getElementById('infoClose').onclick=function(){ infoPopup.style.display='none'; };

  /* ===== LIVE POPUP ===== */
  var livePopup=document.createElement('div');
  livePopup.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.65);display:none;align-items:flex-start;justify-content:center;z-index:9999998;overflow-y:auto;padding:16px 0;box-sizing:border-box;';
  livePopup.innerHTML=
    '<div style="background:linear-gradient(160deg,#141e30,#243b55);border-radius:22px;width:88%;max-width:360px;padding:22px 18px 18px;color:white;box-shadow:0 8px 32px rgba(0,0,0,0.5);">'+
    '<div style="text-align:center;margin-bottom:16px;">'+
    '<div style="font-size:18px;font-weight:800;color:#00c853;">Live / Recorded Video</div>'+
    '<div style="font-size:11px;color:#a0d9ff;margin-top:3px;">Enter your token below to open</div>'+
    '</div>'+
    '<input id="liveTokenInput" placeholder="Paste Video Token here" style="width:100%;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.08);color:white;font-size:14px;box-sizing:border-box;outline:none;">'+
    '<button id="liveOpenBtn" style="width:100%;padding:12px;margin-top:10px;background:linear-gradient(90deg,#00c853,#00e676);border:none;border-radius:12px;color:white;font-weight:700;font-size:15px;cursor:pointer;">Open Video</button>'+
    '<div style="border-top:1px solid rgba(255,255,255,0.12);margin:16px 0 14px;"></div>'+
    '<div style="font-size:12px;font-weight:700;color:#43e97b;margin-bottom:10px;">HOW TO USE</div>'+
    '<div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:12px 14px;margin-bottom:10px;font-size:13px;line-height:1.9;">'+
    '<div style="font-weight:700;color:#38f9d7;margin-bottom:4px;">If you have a Video Token</div>'+
    '<div>1. Copy your Live / Recorded Video Token</div>'+
    '<div>2. Paste it in the box above</div>'+
    '<div>3. Tap Open Video</div>'+
    '<div>4. Video starts automatically</div>'+
    '</div>'+
    '<div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:12px 14px;margin-bottom:10px;font-size:13px;line-height:1.9;">'+
    '<div style="font-weight:700;color:#38f9d7;margin-bottom:4px;">Already enrolled in a Batch?</div>'+
    '<div>1. Tap Hamburger Menu (top-left)</div>'+
    '<div>2. Go to Study section</div>'+
    '<div>3. Select Live Classes</div>'+
    '<div>4. Attend your classes directly</div>'+
    '</div>'+
    '<div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:12px 14px;margin-bottom:14px;font-size:13px;line-height:1.9;">'+
    '<div style="font-weight:700;color:#f953c6;margin-bottom:4px;">How to Enroll in a Batch Free</div>'+
    '<div>1. Open the Batch section</div>'+
    '<div>2. Find your desired batch</div>'+
    '<div>3. Tap Enroll - it is completely free</div>'+
    '</div>'+
    '<button id="liveClose" style="width:100%;padding:11px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:12px;color:white;font-size:13px;cursor:pointer;">Close</button>'+
    '</div>';
  document.body.appendChild(livePopup);
  btnLive.onclick=function(){ livePopup.style.display='flex'; };
  document.getElementById('liveClose').onclick=function(){ livePopup.style.display='none'; };
  document.getElementById('liveOpenBtn').onclick=function(){
    try{
      var raw=document.getElementById('liveTokenInput').value.trim();
      var url=atob(raw);
      if(!url.startsWith('http')) url='https://'+url;
      window.location.href=url;
    }catch(e){ alert('Invalid Token'); }
  };

  /* ===== BATCH TOKEN POPUP ===== */
  var batchPopup=document.createElement('div');
  batchPopup.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.65);display:none;align-items:flex-start;justify-content:center;z-index:9999998;overflow-y:auto;padding:16px 0;box-sizing:border-box;';
  batchPopup.innerHTML=
    '<div style="background:linear-gradient(160deg,#1a120b,#3e2723);border-radius:22px;width:88%;max-width:380px;padding:22px 18px 18px;color:white;margin:auto;box-shadow:0 8px 40px rgba(0,0,0,0.6);">'+
    '<div style="text-align:center;margin-bottom:18px;">'+
    '<div style="font-size:22px;font-weight:900;background:linear-gradient(90deg,#f7971e,#ffd200);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Batch Token</div>'+
    '<div style="font-size:11px;color:#ffcc80;margin-top:3px;">Secure | Single-Use | Expires in 10 min</div>'+
    '</div>'+
    '<div id="batchErrBox" style="display:none;background:rgba(255,60,60,0.15);border:1px solid rgba(255,80,80,0.3);border-radius:10px;padding:10px 12px;font-size:12px;color:#ff9a9a;text-align:center;margin-bottom:12px;"></div>'+
    '<input id="batchTokenInput" placeholder="Paste Batch Token here" style="width:100%;padding:13px 14px;border-radius:12px;border:1.5px solid rgba(255,171,64,0.35);background:rgba(255,255,255,0.06);color:white;font-size:14px;box-sizing:border-box;outline:none;margin-bottom:10px;">'+
    '<button id="batchOpenBtn" style="width:100%;padding:13px;background:linear-gradient(90deg,#f7971e,#ffd200);border:none;border-radius:14px;color:#1a0a00;font-weight:800;font-size:15px;cursor:pointer;margin-bottom:6px;">Open Batch</button>'+
    '<div id="batchLoading" style="display:none;text-align:center;color:#ffd200;font-size:13px;padding:6px 0;">Verifying token...</div>'+
    '<div style="border-top:1px solid rgba(255,255,255,0.1);margin:18px 0 14px;"></div>'+
    '<div style="font-size:12px;font-weight:700;color:#ffd200;margin-bottom:10px;">HOW BATCH TOKEN WORKS</div>'+
    '<div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:12px 14px;margin-bottom:10px;font-size:13px;line-height:1.9;">'+
    '<div style="font-weight:700;color:#43e97b;margin-bottom:4px;">To Share a Batch (Token Generate)</div>'+
    '<div>1. Open any batch inside the app</div>'+
    '<div>2. Tap the <b>Share</b> button</div>'+
    '<div>3. Token automatically generates</div>'+
    '<div>4. Share message copied — paste in WhatsApp or Telegram</div>'+
    '<div style="color:#ffcc80;font-size:12px;margin-top:4px;">Token is valid for 10 minutes only. Each token works once.</div>'+
    '</div>'+
    '<div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:12px 14px;margin-bottom:10px;font-size:13px;line-height:1.9;">'+
    '<div style="font-weight:700;color:#4facfe;margin-bottom:4px;">To Open a Batch (Token Use)</div>'+
    '<div>1. Get Batch Token from a friend</div>'+
    '<div>2. Tap <b>Batch</b> button (bottom-right)</div>'+
    '<div>3. Paste token in the box above</div>'+
    '<div>4. Tap <b>Open Batch</b></div>'+
    '<div>5. Batch opens instantly</div>'+
    '</div>'+
    '<div style="background:rgba(255,60,60,0.1);border:1px solid rgba(255,80,80,0.25);border-radius:12px;padding:12px 14px;margin-bottom:14px;font-size:13px;line-height:1.9;">'+
    '<div style="font-weight:700;color:#ff9a9a;margin-bottom:4px;">Token Security</div>'+
    '<div>- Encrypted with AES-256-GCM</div>'+
    '<div>- Random IV + Nonce, never predictable</div>'+
    '<div>- Expiry timestamp embedded</div>'+
    '<div>- Single-use: once opened, token dies</div>'+
    '<div>- Original batch URL is never shared</div>'+
    '</div>'+
    '<div style="background:rgba(67,233,123,0.08);border:1px solid rgba(67,233,123,0.2);border-radius:12px;padding:12px 14px;margin-bottom:14px;font-size:13px;line-height:1.9;">'+
    '<div style="font-weight:700;color:#43e97b;margin-bottom:4px;">New to PW-MARCO?</div>'+
    '<div>1. Download PW-MARCO App</div>'+
    '<div>2. Create free account &amp; login</div>'+
    '<div>3. Tap Batch button (bottom-right)</div>'+
    '<div>4. Paste the token you received</div>'+
    '<div>5. Batch opens for you!</div>'+
    '<div style="margin-top:8px;">'+
    '<span style="color:#ffd200;font-weight:700;">Download Link:</span> <span style="color:#4facfe;font-size:12px;word-break:break-all;">https://m-store-chi.vercel.app</span>'+
    '</div>'+
    '</div>'+
    '<button id="batchClose" style="width:100%;padding:11px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:12px;color:white;font-size:13px;cursor:pointer;">Close</button>'+
    '</div>';
  document.body.appendChild(batchPopup);

  btnBatch.onclick=function(){ batchPopup.style.display='flex'; };
  document.getElementById('batchClose').onclick=function(){ batchPopup.style.display='none'; };

  document.getElementById('batchOpenBtn').onclick=async function(){
    var rawToken=document.getElementById('batchTokenInput').value.trim();
    var errBox=document.getElementById('batchErrBox');
    var loading=document.getElementById('batchLoading');
    errBox.style.display='none';
    if(!rawToken){ errBox.style.display='block'; errBox.innerText='Please paste a Batch Token first.'; return; }
    loading.style.display='block';
    var result=await decodeBatchToken(rawToken);
    loading.style.display='none';
    if(!result.ok){
      errBox.style.display='block';
      errBox.innerText='Error: '+result.reason;
      return;
    }
    batchPopup.style.display='none';
    showToast('Batch opening...');
    setTimeout(function(){ window.location.href=result.url; },300);
  };

  /* ===== BRAINIX FLOATING POPUP ===== */
  var DEF_W=300, DEF_H=400, MIN_W=180, MIN_H=180;
  var popW=DEF_W, popH=DEF_H;
  var popL=Math.round((window.innerWidth-DEF_W)/2);
  var popT=Math.round((window.innerHeight-DEF_H)/2);

  var bStyle=document.createElement('style');
  bStyle.textContent='#mBrainMedoBar{position:absolute;bottom:0;left:0;right:0;height:38px;background:#fff;z-index:3;pointer-events:none;}';
  document.head.appendChild(bStyle);

  var bPanel=document.createElement('div');
  bPanel.id='marcoBrainixPanel';
  bPanel.style.cssText=
    'position:fixed;left:'+popL+'px;top:'+popT+'px;'+
    'width:'+popW+'px;height:'+popH+'px;'+
    'background:#1a1a2e;display:none;flex-direction:column;'+
    'z-index:9999997;border-radius:18px;'+
    'box-shadow:0 8px 40px rgba(0,0,0,0.7);overflow:hidden;touch-action:none;';
  bPanel.innerHTML=
    '<div id="mBrainHeader" style="'+
      'background:linear-gradient(90deg,#4facfe,#00f2fe);'+
      'color:white;padding:0 14px;height:46px;flex-shrink:0;'+
      'display:flex;align-items:center;justify-content:space-between;'+
      'cursor:grab;user-select:none;-webkit-user-select:none;">'+
      '<span style="font-weight:700;font-size:14px;">Brainix AI</span>'+
      '<div style="display:flex;gap:8px;">'+
        '<button id="mBrainMax" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:0 10px;height:30px;border-radius:8px;font-size:11px;cursor:pointer;font-weight:700;">MAX</button>'+
        '<button id="mBrainClose" style="background:rgba(220,50,50,0.8);border:none;color:white;width:30px;height:30px;border-radius:8px;font-size:13px;cursor:pointer;font-weight:700;">x</button>'+
      '</div>'+
    '</div>'+
    '<div style="flex:1;position:relative;overflow:hidden;background:#fff;">'+
      '<iframe id="mBrainFrame" src="https://app-a21v70ibrzlt.appmedo.com/" '+
        'style="width:100%;height:calc(100% + 38px);border:none;display:block;" '+
        'allow="camera;microphone;fullscreen"></iframe>'+
      '<div id="mBrainMedoBar"></div>'+
    '</div>';
  document.body.appendChild(bPanel);

  btnBrain.onclick=function(){
    bPanel.style.display='flex';
    bPanel.style.flexDirection='column';
  };

  var header=document.getElementById('mBrainHeader');
  var maxBtn=document.getElementById('mBrainMax');
  var closeBrainBtn=document.getElementById('mBrainClose');
  var isMax=false, savedL, savedT, savedW, savedH;

  function setPos(w,h,l,t){
    popW=Math.max(MIN_W,Math.min(window.innerWidth,w));
    popH=Math.max(MIN_H,Math.min(window.innerHeight,h));
    popL=Math.max(0,Math.min(window.innerWidth-popW,l));
    popT=Math.max(0,Math.min(window.innerHeight-popH,t));
    bPanel.style.width=Math.round(popW)+'px';
    bPanel.style.height=Math.round(popH)+'px';
    bPanel.style.left=Math.round(popL)+'px';
    bPanel.style.top=Math.round(popT)+'px';
  }

  function goMax(){
    savedL=popL; savedT=popT; savedW=popW; savedH=popH;
    bPanel.style.left='0'; bPanel.style.top='0';
    bPanel.style.width='100%'; bPanel.style.height='100%';
    bPanel.style.borderRadius='0';
    maxBtn.innerText='MIN'; isMax=true;
  }
  function goMin(){
    setPos(savedW,savedH,savedL,savedT);
    bPanel.style.borderRadius='18px';
    maxBtn.innerText='MAX'; isMax=false;
  }

  maxBtn.onclick=function(){ isMax?goMin():goMax(); };
  closeBrainBtn.onclick=function(){
    bPanel.style.display='none';
    if(isMax) goMin();
  };

  var drag=false, dSX=0, dSY=0, dPL=0, dPT=0;
  header.addEventListener('touchstart',function(e){
    if(e.touches.length!==1||isMax) return;
    drag=true; dSX=e.touches[0].clientX; dSY=e.touches[0].clientY; dPL=popL; dPT=popT;
  },{passive:true});
  document.addEventListener('touchmove',function(e){
    if(!drag||isMax) return;
    var nl=Math.max(0,Math.min(window.innerWidth-popW, dPL+(e.touches[0].clientX-dSX)));
    var nt=Math.max(0,Math.min(window.innerHeight-popH, dPT+(e.touches[0].clientY-dSY)));
    popL=nl; popT=nt;
    bPanel.style.left=Math.round(nl)+'px'; bPanel.style.top=Math.round(nt)+'px';
  },{passive:true});
  document.addEventListener('touchend',function(e){ if(e.touches.length===0) drag=false; },{passive:true});

  header.addEventListener('mousedown',function(e){
    if(isMax) return;
    drag=true; dSX=e.clientX; dSY=e.clientY; dPL=popL; dPT=popT;
    header.style.cursor='grabbing'; e.preventDefault();
  });
  document.addEventListener('mousemove',function(e){
    if(!drag||isMax) return;
    var nl=Math.max(0,Math.min(window.innerWidth-popW, dPL+(e.clientX-dSX)));
    var nt=Math.max(0,Math.min(window.innerHeight-popH, dPT+(e.clientY-dSY)));
    popL=nl; popT=nt;
    bPanel.style.left=Math.round(nl)+'px'; bPanel.style.top=Math.round(nt)+'px';
  });
  document.addEventListener('mouseup',function(){ drag=false; header.style.cursor='grab'; });

  var pinching=false, pinchD0=0, pinchW0=0, pinchH0=0, pinchL0=0, pinchT0=0, pinchCX=0, pinchCY=0;
  function dist2(t){ var dx=t[0].clientX-t[1].clientX, dy=t[0].clientY-t[1].clientY; return Math.sqrt(dx*dx+dy*dy); }
  function center2(t){ return {x:(t[0].clientX+t[1].clientX)/2, y:(t[0].clientY+t[1].clientY)/2}; }
  bPanel.addEventListener('touchstart',function(e){
    if(e.touches.length===2){
      drag=false; pinching=true;
      pinchD0=dist2(e.touches);
      pinchW0=popW; pinchH0=popH; pinchL0=popL; pinchT0=popT;
      var c=center2(e.touches); pinchCX=c.x; pinchCY=c.y;
    }
  },{passive:true});
  bPanel.addEventListener('touchmove',function(e){
    if(!pinching||e.touches.length!==2||isMax) return;
    var ratio=dist2(e.touches)/pinchD0;
    var nW=pinchW0*ratio, nH=pinchH0*ratio;
    var nL=pinchCX-nW/2, nT=pinchCY-nH/2;
    if(nW>=window.innerWidth*0.85){ goMax(); pinching=false; return; }
    setPos(nW,nH,nL,nT);
  },{passive:true});
  bPanel.addEventListener('touchend',function(e){ if(e.touches.length<2) pinching=false; },{passive:true});
}

/* ============ ZOOM LOCK ============ */
function lockZoom(){
  document.addEventListener('gesturestart',function(e){e.preventDefault();},{passive:false});
  document.addEventListener('dblclick',function(e){e.preventDefault();});
}

/* ============ RUN ALL ============ */
function runAll(){
  handleTelegram();
  replaceAllText();
  editHamburgerMenu();
  replaceLogo();
}

/* ============ START ============ */
function start(){
  pruneTokenDB();
  lockZoom();
  remoteLock();
  applyWatermark();
  showWelcomePopup();
  initUI();
  interceptBatchShare();
  interceptStartLearning();
  
  if (window.location.hostname === 'appex-lecture.lovable.app') {
    loadFirebase(initAuth);
  }

  runAll();
  setTimeout(runAll,200);
  setTimeout(runAll,600);
  setTimeout(runAll,1500);
  new MutationObserver(runAll).observe(document.documentElement,{childList:true,subtree:true});
  setInterval(replaceLogo, 800);
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',start);
} else {
  start();
}

})();

/* LIVE CHAT INJECT */
(function(){

  function isLivePage(){
    var path = location.pathname + location.search;
    return path.includes('/live') && path.includes('batchId');
  }

  function findChatList(){
    var panel = document.querySelector('div.absolute.right-0.top-0.h-full');
    if(!panel) return null;
    var allDivs = Array.from(panel.querySelectorAll('div'));
    for(var i=0; i<allDivs.length; i++){
      var d = allDivs[i];
      var s = window.getComputedStyle(d);
      if((s.overflowY==='auto'||s.overflowY==='scroll')&&d.children.length>2) return d;
    }
    var allEls = Array.from(panel.querySelectorAll('*'));
    for(var j=0; j<allEls.length; j++){
      var el = allEls[j];
      if(el.children.length===0&&/\d{1,2}:\d{2}\s*(am|pm)/i.test(el.textContent)){
        var p = el.parentElement;
        for(var k=0; k<4; k++){
          if(!p) break;
          if(p.children.length>3) return p;
          p = p.parentElement;
        }
      }
    }
    return null;
  }

  function findSampleComment(chatList){
    var children = Array.from(chatList.children);
    for(var i=0; i<children.length; i++){
      if(children[i].id!=='marcoInjectComment'&&/\d{1,2}:\d{2}\s*(am|pm)/i.test(children[i].textContent))
        return children[i];
    }
    return children[0]||null;
  }

  var MESSAGES = [
    'Bhai kisi se bhi ye app purchase mat karna, ye bilkul FREE hai. Contact: @official_marco_22',
    'Agar app me koi bhi problem aaye to seedha mujhse baat karo Instagram pe: @official_marco_22',
    'Ye app maine students ke liye banaya hai, koi charge nahi hai kabhi bhi. @official_marco_22',
    'Padhai pe focus karo, app ki tension mat lo, sab smooth chal rha hai. @official_marco_22',
    'Agar koi bolta hai paid hai ye app to wo jhooth bol rha hai. FREE hai. @official_marco_22',
    'Live class attend karo properly, notes banao, revision karo. All the best! @official_marco_22',
    'Ye app PW ka official app nahi hai, ye ek free tool hai students ke liye. @official_marco_22',
    'Kisi bhi problem ke liye Instagram pe DM karo, reply dunga. @official_marco_22',
    'Exam ke liye sab prepare ho? Padhai karo consistency se. @official_marco_22',
    'App ka koi bhi feature kaam na kare to batao, fix kar dunga. @official_marco_22',
    'Bhai note karo jo sir padha rahe hain, baad me kaam aayega. @official_marco_22',
    'Is app ko apne doston ke saath share karo, unhe bhi free me padhai milegi. @official_marco_22',
    'Kisi ne bola paid karo app ke liye? Screenshot leke DM karo: @official_marco_22',
    'Concentration rakho class me, phone pe sirf notes लेना. @official_marco_22',
    'Daily class attend karo, ek bhi miss mat karo. Consistency hi key hai. @official_marco_22',
    'App update hoti rehti hai, koi naya feature chahiye to batao. @official_marco_22',
    'Sir jo padha rahe hain wo baar baar revise karo, tab hi yaad rahega. @official_marco_22',
    'Ye app free hai aur free rahegi. Koi subscription nahi, koi charge nahi. @official_marco_22',
    'Doubt hai koi topic me? Sir se poochho, sharmao mat. @official_marco_22',
    'Exam clear karna hai to distractions band karo, padhai pe lo. @official_marco_22',
    'Agar video quality ya loading me issue aaye to Instagram pe batao: @official_marco_22',
    'Mehnat karo bhai, shortcut se kuch nahi milta. Padho properly. @official_marco_22',
    'Is app ko banane me time laga, please kisi ko bhi sell mat karna. @official_marco_22',
    'Hardwork aur consistency se koi bhi exam crack ho sakta hai. @official_marco_22',
    'Apne sapne yaad rakho, isliye padh rahe ho. Focus mat todna. @official_marco_22',
    'Revision schedule banao, sirf sunna kaafi nahi hota. @official_marco_22',
    'Jo bhi feature add karna chahte ho app me, suggest karo: @official_marco_22',
    'Ye app students ne students ke liye banwayi hai, respect karo ise. @official_marco_22',
    'Class ke baad notes review karo, kal ka topic ready rakho. @official_marco_22',
    'Sabka exam accha jaye, mehnat karo. Support chahiye to: @official_marco_22',
  ];

  var msgIndex = 0;

  function getTimeStr(){
    var now = new Date();
    var hh = now.getHours();
    var mm = now.getMinutes();
    var ampm = hh>=12?'pm':'am';
    hh = hh%12; if(hh===0) hh=12;
    return hh+':'+(mm<10?'0':'')+mm+' '+ampm;
  }

  function createMarcoComment(sample){
    var item = document.createElement('div');
    item.id = 'marcoInjectComment';
    if(sample&&sample.className) item.className = sample.className;
    var pad='8px 12px', mg='0';
    if(sample){
      var cs = window.getComputedStyle(sample);
      pad = cs.padding||pad;
      mg = cs.margin||mg;
    }
    item.style.cssText =
      'padding:'+pad+';margin:'+mg+';width:100%;'+
      'box-sizing:border-box;display:flex;'+
      'align-items:flex-start;gap:8px;background:transparent;';

    var msg = MESSAGES[msgIndex % MESSAGES.length];
    msgIndex++;

    item.innerHTML =
      '<div style="width:32px;height:32px;min-width:32px;border-radius:50%;'+
        'background:#4facfe;display:flex;align-items:center;justify-content:center;'+
        'font-weight:700;color:white;font-size:14px;flex-shrink:0;">M</div>'+
      '<div style="flex:1;min-width:0;">'+
        '<span style="color:#4facfe;font-weight:700;font-size:13px;">Marco</span>'+
        '<div style="color:white;font-size:13px;line-height:1.5;'+
          'word-break:break-word;margin-top:2px;">'+msg+'</div>'+
        '<div style="color:rgba(255,255,255,0.4);font-size:11px;margin-top:2px;">'+
          getTimeStr()+'</div>'+
      '</div>';
    return item;
  }

  function tryInject(){
    if(!isLivePage()) return;
    var chatList = findChatList();
    if(!chatList) return;
    var old = document.getElementById('marcoInjectComment');
    if(old&&old.parentElement) old.parentElement.removeChild(old);
    var sample = findSampleComment(chatList);
    var item = createMarcoComment(sample);
    if(chatList.firstChild){
      chatList.insertBefore(item, chatList.firstChild);
    } else {
      chatList.appendChild(item);
    }
    chatList.scrollTop = 0;
  }

  var lastHref = location.href;
  setInterval(function(){
    if(location.href!==lastHref){
      lastHref = location.href;
      var o = document.getElementById('marcoInjectComment');
      if(o&&o.parentElement) o.parentElement.removeChild(o);
    }
  }, 500);

  setInterval(function(){
    if(isLivePage()) tryInject();
  }, 10000);

  setTimeout(function(){
    if(isLivePage()) tryInject();
  }, 3000);

  new MutationObserver(function(){
    if(!isLivePage()) return;
    var chatList = findChatList();
    if(chatList&&!document.getElementById('marcoInjectComment')){
      setTimeout(tryInject, 800);
    }
  }).observe(document.body, {childList:true, subtree:true});

})();

/* POWERED BY MARCO - playback popup inject */
(function(){

  var TARGETS = ['High Quality Dash Stream', 'Optimized HLS Stream'];
  var ATTR = 'data-marco-powered';

  function injectPoweredBy(){
    var allP = Array.from(document.querySelectorAll('p.text-xs.text-gray-400, p[class*="text-xs"][class*="text-gray"]'));
    allP.forEach(function(el){
      var txt = el.textContent.trim();
      var matched = TARGETS.some(function(t){ return txt === t; });
      if(!matched) return;
      if(el.getAttribute(ATTR)) return;
      el.setAttribute(ATTR, '1');

      var powered = document.createElement('p');
      powered.className = el.className;
      powered.textContent = 'Powered by Marco';
      powered.setAttribute(ATTR, 'label');

      if(el.nextSibling){
        el.parentNode.insertBefore(powered, el.nextSibling);
      } else {
        el.parentNode.appendChild(powered);
      }
    });
  }

  new MutationObserver(function(){
    injectPoweredBy();
  }).observe(document.body, {childList:true, subtree:true});

  setTimeout(injectPoweredBy, 1000);

})();
