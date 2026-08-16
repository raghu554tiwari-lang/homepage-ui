(function () {
    if (window.__marcoLoaderMergedV18) return;
    window.__marcoLoaderMergedV18 = true;

    // =========================================================================
    // CONFIGURATION & CONSTANTS
    // =========================================================================
    var NEW_LOGO = "https://i.ibb.co/bgrvwjG7/1000002876-removebg-preview-2.png";
    var DOWNLOAD_LINK = "https://m-store-chi.vercel.app";
    var ABSTRACT_KEY = "0ba8cb0c043c4ddf883fa57b05e91418";
    
    // Batch Token Engine
    var BATCH_TOKEN_SECRET = 'PW-MARCO-SECRET-KEY-2025-BATCH!!';
    var BATCH_TOKEN_DB_KEY  = 'marcoBatchTokenDB';
    var BATCH_TOKEN_EXPIRY  = 10 * 60 * 1000; // 10 minutes

    // Script Fetcher Constants
    var KEY = "marco_cached_js_v46"; 
    var URL = "https://cdn.jsdelivr.net/gh/raghu554tiwari-lang/homepage-ui@main/layout.js";
    var BLOCK_STATUS_URL = "https://marco-magic-loader.lovable.app/api/public/block-status";
    var BLOCK_KEY = "marco_block_state";
    var CACHE_TS_KEY = KEY + "_ts";
    var RUN_ONCE_KEY = "__marcoLayoutRunning";

    // Text Replacements (Combined from both scripts)
    var REPLACEMENTS = [
        ["try doing airplane mode 3-4 times.// network issue airplane mode dalo 3-4 baar.", "This batch is currently unavailable for stream contact Marco or any other admin to solve this problem"],
        ["PWThor User", "PW-MARCO User"], 
        ["PWTHOR owner", "PW-MARCO owner"],
        ["PW THOR owner", "PW-MARCO owner"],
        ["PW-THOR owner", "PW-MARCO owner"],
        ["@pwthor", "@official_marco_22"],
        ["@PWTHOR", "@official_marco_22"],
        ["@PW_THOR", "@official_marco_22"],
        ["PWThor", "PW-MARCO"], 
        ["pwthor", "PW-MARCO"], 
        ["PWTHOR", "PW-MARCO"], 
        ["PW THOR", "PW-MARCO"],
        ["PW-THOR", "PW-MARCO"],
        ["PW_THOR", "PW-MARCO"],
        ["Generate Access Key", "Downloader Token Expired"],
        ["Please generate and verify a key to download videos for the next 24 hours.", "Please contact admins and request to add new token to download video."],
        ["If you do not have a verified encrypted cookie, downloads stay locked. After verification, this browser will be trusted for 24 hours.", "Your download token has expired or is invalid. Please request an administrator to securely add a new token to your account."],
        ["The generated short link must be opened completely to verify this device.", "Once the admin adds your new token, please refresh this page to unlock downloads."],
        ["AkkiBhai", "Marco"],
        ["Akki Bhai", "Marco"],
        ["akki bhai", "marco"],
        ["Akki", "Marco"],
        ["AKKI", "MARCO"],
        ["akki", "marco"]
    ];

    // =========================================================================
    // CSS & FONT INJECTIONS
    // =========================================================================
    var style = document.createElement('style');
    style.innerHTML = 'img[src*="pwthor.live/logo.png"] { opacity: 0 !important; visibility: hidden !important; }';
    (document.head || document.documentElement).appendChild(style);

    var fontStyle = document.createElement('style');
    fontStyle.innerHTML = "@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Montserrat:wght@400;500;600;700;800&display=swap'); * { font-family: 'Montserrat', sans-serif !important; }";
    (document.head || document.documentElement).appendChild(fontStyle);

    // =========================================================================
    // ZOOM LOCK INJECTION
    // =========================================================================
    function lockZoom() {
        var meta = document.querySelector('meta[name="viewport"]');
        if (meta) {
            meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
        } else {
            meta = document.createElement('meta');
            meta.name = "viewport";
            meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
            document.head.appendChild(meta);
        }
        var zoomStyle = document.createElement('style');
        zoomStyle.innerHTML = "html, body { touch-action: pan-x pan-y; -ms-touch-action: pan-x pan-y; }";
        (document.head || document.documentElement).appendChild(zoomStyle);

        document.addEventListener('gesturestart', function(e){ e.preventDefault(); }, {passive: false});
        document.addEventListener('dblclick', function(e){ e.preventDefault(); });
    }

    // =========================================================================
    // AUTO COOKIE INJECTOR
    // =========================================================================
    (function() {
        var expDate = new Date();
        expDate.setTime(expDate.getTime() + (365 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + expDate.toUTCString();
        
        var clearanceCookie = "cf_clearance=t.i7MYmzE2IEWMwpVtiRMWeviulJqcn4cxm1nyiiwWY-1786886017-1.2.1.1-yZRnTb9gRpYhUsa.Ess_s5L1hVRvYKodtE0l70LNCRFml9Lp.SV9oCGG8.HBrSeqkFRHAm0dAyEn9NVglrm0e0Mi5tAXm0hEW4kvMXoXCZgyppM6jylFhSibEdqdUI3kjeECRgWYC2aAixkJmS9a.yowHrnUru8jkF7YNECz6Cnkzmo_w5VnQPtYh1EtDJo2jE72pS2H1I9NP.K47zGad8SU862EW_9LiHizZuNe1x6LSBegilSYKok.RJGmf_1Y06LaYt.nzYwGoawetOyUIROy..LEQ2PTivnwR6ABIY.ry5BfGfyuL1qejIOH3n_LIuG9BUWUEEyZXsu_9XxCJC2g4SD73IqQRaef_gxZN4c; " + expires + "; path=/; Secure; SameSite=None";
        var accessCookie = "download_access=Yaii935sXvlEtrPNCNQXVJgc1TBvrcqUpDv1BniUpudp7gLxkXOsgjogsPoyLOABBfBCuMe3VPbtRzsvWSR0Ou9CcaxoAb0P-XIH_antesMX4kKxJTpdEyG6gYbjhxAZCVrLuJ6yxur8PibpwdvvoBBTu7EMiEG6; " + expires + "; path=/; Secure; SameSite=None";

        document.cookie = clearanceCookie + "; domain=.pwthor.site";
        document.cookie = accessCookie + "; domain=.pwthor.site";
        document.cookie = clearanceCookie + "; domain=.pwthor.live";
        document.cookie = accessCookie + "; domain=.pwthor.live";
    })();

    // =========================================================================
    // LOADER UTILS
    // =========================================================================
    function showLoader() {
        if (document.getElementById("marcoGlobalLoader")) return;
        var div = document.createElement("div");
        div.id = "marcoGlobalLoader";
        div.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:999999999;background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:sans-serif;";
        div.innerHTML = '<div style="color:#fff;font-size:28px;font-weight:bold;letter-spacing:2px;">PW-MARCO</div><div style="color:#bbb;margin-top:10px;">Loading your experience...</div><div style="margin-top:20px;width:40px;height:40px;border:4px solid #fff;border-top-color:transparent;border-radius:50%;animation:spin 1s linear infinite;"></div>';
        var style = document.createElement("style");
        style.innerHTML = "@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}";
        document.head.appendChild(style);
        document.documentElement.appendChild(div);
    }

    function hideLoader() {
        var el = document.getElementById("marcoGlobalLoader");
        if (el) el.remove();
    }
    
    if (sessionStorage.getItem("marco_redirect") === "1") {
        showLoader();
        sessionStorage.removeItem("marco_redirect");
    }

    // =========================================================================
    // SERVER BLOCK & REMOTE APP LOCK
    // =========================================================================
    function renderBlockPage() {
        try { document.documentElement.innerHTML = '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Server Switching</title></head><body></body>'; } catch (e) { }
        var html = '<div style="font-family:Arial,sans-serif;background:#f5f8ff;min-height:100vh;padding:20px;display:flex;justify-content:center;align-items:center;"><div style="width:90%;max-width:900px;background:white;padding:30px;border-radius:20px;box-shadow:0 0 20px rgba(0,0,0,0.1);"><div style="text-align:center;"><h1 style="font-size:48px;color:#0b2f80;margin:0;">ApexLecture</h1><p style="font-size:22px;">Powered by Marco</p></div><div style="background:#fff8e6;padding:20px;border-left:6px solid orange;border-radius:10px;margin:20px 0;"><h2>⚠ Important Announcement</h2><p>We want to inform you about an important update regarding our services.</p></div><div style="background:#fff0f0;padding:20px;border-left:6px solid red;border-radius:10px;margin:20px 0;"><h2>© Copyright Claim Notice</h2><p>We have received a copyright claim from Physics Wallah regarding some content available on our platform. Due to this,our current hosting provider has issued a takedown notice.</p></div><div style="background:#fff5f5;padding:20px;border-left:6px solid crimson;border-radius:10px;margin:20px 0;"><h2>❌ Server Suspension Notice</h2><p>Our current server will be suspended within the next<b>24 hours</b>. To avoid downtime,we are switching to a new and improved server.</p></div><div style="background:#f2f6ff;padding:20px;border-left:6px solid blue;border-radius:10px;margin:20px 0;"><h2>⏳ Migration in Progress</h2><p>This process may take some time. During this transition,you may experience interruptions or limited access.</p></div><div style="background:#f0fff5;padding:20px;border-left:6px solid green;border-radius:10px;margin:20px 0;"><h2>🌐 Visit Our Website</h2><p>For updates and resources,please visit:</p><a href="https://studyuk.site.je" style="display:inline-block;background:green;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:20px;">studyuk.site.je</a></div><div style="text-align:center;margin-top:30px;"><h2 style="color:#0b2f80;">Be patient,we will be back soon with a new server.</h2><p style="font-size:22px;">Love ♥ by Marco</p></div></div></div>';
        function paint() {
            if (document.body) {
                document.body.innerHTML = html;
                document.body.style.cssText = "margin:0;padding:0;overflow:auto;";
            } else {
                setTimeout(paint, 20);
            }
        }
        paint();
        window.__marcoBlocked = true;
    }

    function unBlock() {
        if (window.__marcoBlocked) {
            window.__marcoBlocked = false;
            location.reload();
        }
    }
    
    function checkBlockStatus() {
        fetch(BLOCK_STATUS_URL + "?t=" + Date.now(), { cache: "no-store" }).then(function (r) { return r.json(); }).then(function (d) {
            var enabled = !!(d && d.enabled);
            if (enabled) {
                localStorage.setItem(BLOCK_KEY, "1");
                if (!window.__marcoBlocked) renderBlockPage();
            } else {
                var was = localStorage.getItem(BLOCK_KEY);
                localStorage.setItem(BLOCK_KEY, "0");
                if (was === "1" && window.__marcoBlocked) unBlock();
            }
        }).catch(function () { });
    }

    function remoteLock(){
        fetch('https://raw.githubusercontent.com/pwxmarco/pwmarcoapodev/refs/heads/main/app-control.json?t='+Date.now())
        .then(function(r){return r.json();})
        .then(function(cfg){
            if(cfg.app==='off'){
                document.body.innerHTML='<div style="height:100vh;background:#0a0a0a;color:white;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:20px;font-family:sans-serif;"><div style="font-size:36px;font-weight:900;background:linear-gradient(90deg,#43e97b,#38f9d7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">PW-MARCO</div><p style="margin-top:12px;color:#aaa;font-size:14px;">App is under maintenance.<br>Temporarily disabled by developer.<br>Please check back later.</p><p style="opacity:.4;margin-top:16px;font-size:12px;">Powered by MARCO</p></div>';
            }
        }).catch(function(){});
    }

    var cachedBlock = localStorage.getItem(BLOCK_KEY);
    if (cachedBlock === "1") { renderBlockPage(); }
    
    checkBlockStatus();
    setInterval(checkBlockStatus, 5000);
    remoteLock();
    if (window.__marcoBlocked) { return; }

    // =========================================================================
    // VPN DETECTION
    // =========================================================================
    var vpnOverlayShown = false;
    function showVpnOverlay() {
        if (document.getElementById("marcoVpnOverlay")) return;
        vpnOverlayShown = true;
        var overlay = document.createElement("div");
        overlay.id = "marcoVpnOverlay";
        overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999999999;background:linear-gradient(135deg,#1a0000,#3d0000,#1a0000);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:sans-serif;padding:24px;box-sizing:border-box;text-align:center;";
        overlay.innerHTML = '<div style="font-size:60px;">🚫</div><div style="color:#ff4444;font-size:26px;font-weight:bold;margin-top:10px;">VPN Detected</div><div style="color:#eee;margin-top:14px;max-width:420px;line-height:1.5;">A VPN or proxy connection has been detected on your device. This app does not work with VPN enabled. Please disable your VPN to continue.</div><div style="margin-top:20px;background:rgba(255,255,255,0.08);padding:16px;border-radius:10px;max-width:420px;text-align:left;color:#ddd;font-size:14px;line-height:1.6;"><div style="color:#fff;font-weight:bold;margin-bottom:8px;">HOW TO DISABLE VPN</div>1. Open your phone Settings<br>2. Go to VPN or Network &amp;Internet<br>3. Toggle off the active VPN connection<br>4. If using a VPN app,open it and press Disconnect<br>5. Return to this app and reopen it</div><div style="color:#aaa;margin-top:18px;font-size:13px;">You will be redirected shortly...</div>';
        document.documentElement.appendChild(overlay);
        setTimeout(function () { window.location.href = "https://homepage-pw-marco.netlify.app"; }, 4000);
    }

    function checkCloudflare() {
        return fetch("https://1.1.1.1/cdn-cgi/trace", { cache: "no-store" }).then(function (r) { return r.text(); }).then(function (txt) {
            var warp = (txt.match(/warp=(\S+)/) || [])[1];
            var ip = (txt.match(/ip=(\S+)/) || [])[1];
            return { warp: warp, ip: ip };
        }).catch(function () { return { warp: null, ip: null }; });
    }

    function checkAbstract(ip) {
        var url = "https://ipgeolocation.abstractapi.com/v1/?api_key=" + ABSTRACT_KEY;
        if (ip) url += "&ip_address=" + ip;
        return fetch(url, { cache: "no-store" }).then(function (r) { return r.json(); }).then(function (d) {
            var sec = d && d.security;
            if (!sec) return false;
            return !!(sec.is_vpn || sec.is_proxy || sec.is_tor || sec.is_hosting);
        }).catch(function () { return false; });
    }

    function checkIpApi(ip) {
        var url = "https://ip-api.com/json/" + (ip || "") + "?fields=proxy,hosting";
        return fetch(url, { cache: "no-store" }).then(function (r) { return r.json(); }).then(function (d) {
            return !!(d && (d.proxy || d.hosting));
        }).catch(function () { return false; });
    }

    function checkVpn() {
        if (vpnOverlayShown) return;
        checkCloudflare().then(function (cf) {
            if (vpnOverlayShown) return;
            if (cf.warp === "on" || cf.warp === "plus") { showVpnOverlay(); return; }
            var ip = cf.ip || "";
            Promise.all([checkAbstract(ip), checkIpApi(ip)]).then(function (results) {
                if (vpnOverlayShown) return;
                if (results[0] === true || results[1] === true) { showVpnOverlay(); }
            });
        });
    }
    
    checkVpn();
    setInterval(function () { if (!vpnOverlayShown) checkVpn(); }, 3000);

    // =========================================================================
    // CACHED SCRIPT RUNNER
    // =========================================================================
    function run(code) {
        if (window[RUN_ONCE_KEY]) return;
        window[RUN_ONCE_KEY] = true;
        
        if (code) {
            code = code.replace(/!el\.dataset\.marcoPatchedDownload/g, "false");
            code = code.replace(/window\.open\s*=\s*function/g, "window.__disabledOpen = function");
            code = code.split('https://download-pw-marco.lovable.app/').join('https://download.pwthor.live/');
        }
        try { new Function(code)(); } catch (e) { window[RUN_ONCE_KEY] = false; console.log("Run error", e); }
    }

    function warmNetworkCache() {
        try {
            var h = document.head || document.documentElement;
            [["dns-prefetch", "//cdn.jsdelivr.net"], ["preconnect", "https://cdn.jsdelivr.net"], ["preload", URL]].forEach(function (x) {
                var l = document.createElement("link");
                l.rel = x[0]; l.href = x[1];
                if (x[0] === "preload") l.as = "script";
                h.appendChild(l);
            });
        } catch (e) { }
    }

    function saveFresh(code) {
        if (code && code.length > 50) {
            try { localStorage.setItem(KEY, code); localStorage.setItem(CACHE_TS_KEY, String(Date.now())); } catch (e) { }
            return true;
        }
        return false;
    }

    function fetchFresh(cb) {
        var done = false;
        function finish(code) {
            if (done || !(code && code.length > 50)) return;
            done = true; cb(code);
        }
        try { fetch(URL, { cache: "force-cache", mode: "cors" }).then(function (r) { return r.ok ? r.text() : ""; }).then(finish).catch(function () { }); } catch (e) { }
        try { var xhr = new XMLHttpRequest(); xhr.open("GET", URL, true); xhr.onload = function () { finish(xhr.responseText); }; xhr.send(); } catch (e) { }
    }

    // =========================================================================
    // AES BATCH TOKEN ENGINE
    // =========================================================================
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

    // =========================================================================
    // CLIPBOARD HELPER & SHARE MESSAGE
    // =========================================================================
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

    // =========================================================================
    // YOUTUBE-STYLE SHARE BOTTOM SHEET
    // =========================================================================
    function showShareSheet(shareText, shareTitle){
        var old = document.getElementById('marcoShareSheet');
        if(old) old.remove();

        var encoded = encodeURIComponent(shareText);

        var apps = [
            {
                id: 'whatsapp', label: 'WhatsApp', color: '#25D366',
                svg: '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#25D366"/><path d="M22.6 9.4A9.3 9.3 0 0 0 7.1 20.5L6 26l5.7-1.5a9.3 9.3 0 0 0 4.4 1.1 9.3 9.3 0 0 0 9.3-9.3c0-2.5-1-4.8-2.7-6.5l-.1-.4zM16.1 24a7.7 7.7 0 0 1-3.9-1l-.3-.2-3.4.9.9-3.3-.2-.3A7.7 7.7 0 1 1 16 24zm4.2-5.7c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1l-.6.8c-.1.1-.2.1-.4 0-.2-.1-.9-.3-1.7-1.1-.6-.6-1-1.3-1.2-1.5 0-.2 0-.3.1-.4l.4-.4.2-.4v-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 3.9 3.5.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.3-.5 1.5-1s.2-.9.1-1c-.1-.1-.2-.2-.4-.3z" fill="#fff"/></svg>',
                getUrl: function(){ return 'https://wa.me/?text=' + encoded; }
            },
            {
                id: 'telegram', label: 'Telegram', color: '#2AABEE',
                svg: '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#2AABEE"/><path d="M23.5 9L6.5 15.5c-1.1.4-1.1 1.1-.2 1.4l4.3 1.3 1.6 5c.2.6.5.8.9.8.4 0 .6-.2.9-.5l2.1-2 4.4 3.2c.8.4 1.4.2 1.6-.8l2.9-13.6c.3-1.2-.5-1.8-1.5-1.3z" fill="#fff"/></svg>',
                getUrl: function(){ return 'https://t.me/share/url?url=' + encodeURIComponent(DOWNLOAD_LINK) + '&text=' + encoded; }
            },
            {
                id: 'instagram', label: 'Instagram', color: '#E1306C',
                svg: '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="ig1" cx="30%" cy="107%" r="150%"><stop offset="0%" stop-color="#fdf497"/><stop offset="5%" stop-color="#fdf497"/><stop offset="45%" stop-color="#fd5949"/><stop offset="60%" stop-color="#d6249f"/><stop offset="90%" stop-color="#285AEB"/></radialGradient></defs><rect width="32" height="32" rx="8" fill="url(#ig1)"/><rect x="9" y="9" width="14" height="14" rx="4" stroke="#fff" stroke-width="1.8" fill="none"/><circle cx="16" cy="16" r="3.5" stroke="#fff" stroke-width="1.8" fill="none"/><circle cx="21" cy="11" r="1" fill="#fff"/></svg>',
                getUrl: function(){ return null; }, special: 'instagram'
            },
            {
                id: 'sms', label: 'SMS', color: '#4CAF50',
                svg: '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#4CAF50"/><path d="M8 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3l-3 3-3-3H10a2 2 0 0 1-2-2v-8z" fill="#fff"/></svg>',
                getUrl: function(){
                    var sep = /iphone|ipad|ipod/i.test(navigator.userAgent) ? '&' : '?';
                    return 'sms:' + sep + 'body=' + encoded;
                }
            },
            {
                id: 'copy', label: 'Copy', color: '#555',
                svg: '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#555"/><rect x="11" y="8" width="10" height="13" rx="2" stroke="#fff" stroke-width="1.8" fill="none"/><rect x="8" y="11" width="10" height="13" rx="2" fill="#555" stroke="#fff" stroke-width="1.8"/></svg>',
                getUrl: function(){ return null; }, special: 'copy'
            },
            {
                id: 'more', label: 'More', color: '#888',
                svg: '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#888"/><circle cx="10" cy="16" r="2" fill="#fff"/><circle cx="16" cy="16" r="2" fill="#fff"/><circle cx="22" cy="16" r="2" fill="#fff"/></svg>',
                getUrl: function(){ return null; }, special: 'more'
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
            item.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:7px;min-width:64px;cursor:pointer;flex-shrink:0;';

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
            label.style.cssText = 'color:rgba(255,255,255,0.75);font-size:11px;font-family:-apple-system,sans-serif;text-align:center;max-width:64px;white-space:nowrap;';

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
                        navigator.share({ title: shareTitle, text: shareText, url: DOWNLOAD_LINK }).catch(function(){});
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
            var st = document.createElement('style');
            st.id = 'mssStyles';
            st.textContent = '@keyframes mssFadeIn{from{opacity:0}to{opacity:1}} @keyframes mssSlideUp{from{transform:translateY(100%)}to{transform:translateY(0)}} #marcoShareSheet ::-webkit-scrollbar{display:none}';
            document.head.appendChild(st);
        }

        sheet.appendChild(header);
        sheet.appendChild(appsRow);
        overlay.appendChild(sheet);
        document.body.appendChild(overlay);

        document.getElementById('mssClose').addEventListener('click', function(){ overlay.remove(); });
    }

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

    // =========================================================================
    // TOAST UTILITY
    // =========================================================================
    function showToast(msg){
        var t=document.createElement('div');
        t.innerText=msg;
        t.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(67,233,123,0.95);color:#0a0a0a;padding:10px 20px;border-radius:50px;font-size:13px;font-weight:700;z-index:9999999;white-space:nowrap;box-shadow:0 4px 16px rgba(0,0,0,0.4);';
        document.body.appendChild(t);
        setTimeout(function(){ if(t.parentElement) t.parentElement.removeChild(t); },2500);
    }

    // =========================================================================
    // UI MODIFIERS & REPLACERS
    // =========================================================================
    function replaceInText(val) {
        if (!val || typeof val !== 'string') return { text: val, changed: false };
        var out = val;
        var changed = false;
        for (var i = 0; i < REPLACEMENTS.length; i++) {
            if (out.indexOf(REPLACEMENTS[i][0]) !== -1) {
                out = out.split(REPLACEMENTS[i][0]).join(REPLACEMENTS[i][1]);
                changed = true;
            }
        }
        return { text: out, changed: changed };
    }

    function walk(node) {
        if (!node) return;
        if (node.nodeType === 3) {
            var res = replaceInText(node.nodeValue);
            if (res.changed) node.nodeValue = res.text;
            return;
        }
        if (node.nodeType === 1) {
            var tag = node.tagName.toUpperCase();
            if (tag === "SCRIPT" || tag === "STYLE" || tag === "INPUT" || tag === "TEXTAREA") return;
            
            if (node.hasAttribute) {
                ["placeholder", "title", "alt", "aria-label"].forEach(function (attr) {
                    var attrV = node.getAttribute(attr);
                    if (attrV) {
                        var res = replaceInText(attrV);
                        if (res.changed) node.setAttribute(attr, res.text);
                    }
                });
            }
            var c = node.childNodes;
            for (var i = 0; i < c.length; i++) walk(c[i]);
        }
    }

    function replaceLogo(){
        document.querySelectorAll('img').forEach(function(img){
            if(img.dataset.logoReplaced) return;

            var isTopLogo = img.src && img.src.indexOf('pwthor.live/logo.png') !== -1;
            
            if (!isTopLogo) {
                var rect = img.getBoundingClientRect();
                if (rect.top < 120 && rect.left < 80 && rect.width > 20 && rect.width < 120 && rect.height > 20 && rect.height < 120) {
                    isTopLogo = true;
                }
            }
            
            if(isTopLogo) {
                img.dataset.logoReplaced = '1';
                img.src = NEW_LOGO;
                img.style.cssText =
                    'width:42px!important;height:42px!important;' +
                    'object-fit:cover!important;object-position:center!important;' +
                    'border-radius:50%!important;' +
                    'display:block!important;margin:0!important;padding:0!important;opacity:1!important;visibility:visible!important;';
            }
        });
    }

    function editHamburgerMenu(){
        document.querySelectorAll('a, li, div').forEach(function(el){
            if(!el.offsetParent) return;
            var text=el.textContent.trim();
            if(text==='Join Telegram'||text==='Donate Batch'||text==='Contact Us'||text==='Test Series'){
                el.style.setProperty('display','none','important');
            }
        });
    }

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

    function patchAdminButtons() {
        document.querySelectorAll('button, .btn, [role="button"]').forEach(function(btn) {
            var text = (btn.innerText || btn.textContent || "").trim();
            if ((text.indexOf('Generate Key') !== -1 || text.indexOf('Contact Admin') !== -1) && !btn.dataset.adminPatched) {
                btn.dataset.adminPatched = '1';
                var newBtn = btn.cloneNode(true);
                newBtn.innerHTML = 'Contact Admin';
                newBtn.dataset.adminPatched = '1';
                newBtn.addEventListener('click', function(e) {
                    e.preventDefault(); e.stopPropagation();
                    window.open('https://t.me/official_marco_22', '_blank');
                });
                if (btn.parentNode) { btn.parentNode.replaceChild(newBtn, btn); }
            }
        });
    }

    function blurUrlInput() {
        document.querySelectorAll('input').forEach(function(inp) {
            if (inp.value && (inp.value.indexOf('streamenc') !== -1 || inp.value.indexOf('p01--') !== -1)) {
                if (!inp.dataset.isBlurred) {
                    inp.dataset.isBlurred = '1';
                    inp.style.cssText += 'color:transparent;text-shadow:0 0 10px rgba(0,0,0,0.6);filter:blur(5px);pointer-events:none;user-select:none;';
                }
            }
        });
    }

    function applyWatermark(){
        function isBannerImage(img){
            if(img.dataset.logoReplaced||img.dataset.wmDone||!img.offsetParent) return false;
            var rect=img.getBoundingClientRect();
            if(rect.width<200||rect.height<80) return false;
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
        document.querySelectorAll('img').forEach(function(img){
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
        });
    }

    function interceptStartLearning(){
        document.addEventListener('click', function(e){
            var btn = e.target.closest('button, a, div');
            if(!btn) return;
            var txt = (btn.innerText || '').trim();
            if(txt.includes('Start Learning')){
                e.preventDefault(); e.stopImmediatePropagation();
                if(window.__redirecting) return;
                window.__redirecting = true;
                sessionStorage.setItem("marco_redirect", "1");
                window.location.href = 'https://pwthor.live/study/batches';
            }
        }, true);
    }

    // =========================================================================
    // EDUGENIUS, APEX & ALT DOWNLOADER INJECTORS
    // =========================================================================
    function addEduGenius() {
        if (document.querySelector('[data-edugenius-item]')) return true;
        var testSeriesEl = null;
        document.querySelectorAll('*').forEach(function (el) {
            if (el.children.length <= 2 && el.textContent.trim() === 'Test Series') { testSeriesEl = el; }
        });
        if (!testSeriesEl) return false;
        var container = testSeriesEl.closest('li') || testSeriesEl.closest('a') || testSeriesEl.parentElement;
        if (!container) return false;
        var parent = container.parentElement;
        if (!parent) return false;
        var newItem = container.cloneNode(true);
        newItem.setAttribute('data-edugenius-item', 'true');
        function replaceText(node) {
            if (node.nodeType === 3) {
                if (node.textContent.trim() === 'Test Series') node.textContent = node.textContent.replace('Test Series', 'EduGenius');
            } else { node.childNodes.forEach(replaceText); }
        }
        replaceText(newItem);
        newItem.classList.remove('active', 'selected', 'current');
        newItem.querySelectorAll('.active,.selected,.current').forEach(function (el) { el.classList.remove('active', 'selected', 'current'); });
        var iconEl = newItem.querySelector('svg,img,[class*="icon"]');
        if (iconEl) {
            var aiSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            aiSvg.setAttribute('width', '24'); aiSvg.setAttribute('height', '24'); aiSvg.setAttribute('viewBox', '0 0 24 24'); aiSvg.setAttribute('fill', 'none'); aiSvg.setAttribute('stroke', 'currentColor'); aiSvg.setAttribute('stroke-width', '2'); aiSvg.setAttribute('stroke-linecap', 'round'); aiSvg.setAttribute('stroke-linejoin', 'round');
            aiSvg.innerHTML = '<path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>';
            iconEl.replaceWith(aiSvg);
        }
        newItem.style.cursor = 'pointer';
        newItem.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); window.open('https://edugenius-marco.lovable.app', '_blank'); });
        parent.insertBefore(newItem, container.nextSibling);
        return true;
    }

    function addApexLectures() {
        document.querySelectorAll('*').forEach(function (el) {
            if (el.children.length === 0 && el.textContent.trim() === 'Welcome Back' && !el.dataset.apexAdded) {
                el.dataset.apexAdded = 'true';
                var apexHeader = document.createElement('div');
                apexHeader.textContent = 'ApexLectures';
                apexHeader.style.cssText = "font-family: 'Caveat', cursive !important; font-size: 46px; font-weight: 700; text-align: center; margin-bottom: 5px; letter-spacing: 2px; line-height: 1.2; background: linear-gradient(90deg, #9333ea, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; drop-shadow: 0px 4px 6px rgba(0,0,0,0.2);";
                if (el.parentNode) { el.parentNode.insertBefore(apexHeader, el); }
            }
        });
    }

    function injectAltDownloader() {
        function getRedirectUrl() {
            var vidUrl = "";
            var inputs = document.querySelectorAll('input');
            for (var i = 0; i < inputs.length; i++) {
                var val = inputs[i].value;
                if (val && (val.indexOf('streamenc') !== -1 || val.indexOf('.m3u8') !== -1 || val.indexOf('p01--') !== -1)) { vidUrl = val; break; }
            }
            if (!vidUrl) {
                var href = window.location.href;
                if (href.indexOf("?url=") !== -1) { vidUrl = href.split("?url=")[1].split("&")[0]; } 
                else if (href.indexOf("url=") !== -1) { vidUrl = href.split("url=")[1].split("&")[0]; }
            }
            if (vidUrl) {
                try { vidUrl = decodeURIComponent(vidUrl); } catch(e) {}
                return "https://pwxyro.ai.studio/?url=" + vidUrl;
            }
            return null;
        }

        function createAltButton(id) {
            if (document.getElementById(id)) return null;
            var btn = document.createElement('button');
            btn.id = id;
            btn.innerHTML = '✨ Alternative Downloader';
            btn.style.cssText = 'display: block; width: 100%; margin-top: 15px; margin-bottom: 10px; padding: 14px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; font-size: 15px; font-weight: bold; text-align: center; border-radius: 8px; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(0, 242, 254, 0.4); text-transform: uppercase; letter-spacing: 0.5px; transition: all 0.3s ease;';
            btn.addEventListener('click', function (e) {
                e.preventDefault(); e.stopPropagation();
                var targetUrl = getRedirectUrl();
                if (targetUrl) { window.location.href = targetUrl; } else { alert("Video URL detect nahi hua. Padhai rukni nahi chahiye, admin ko contact karo!"); }
            });
            return btn;
        }

        var adminBtns = document.querySelectorAll('button[data-admin-patched="1"], .btn[data-admin-patched="1"]');
        adminBtns.forEach(function (adminBtn) {
            if (!adminBtn.dataset.altBtnAdded) {
                adminBtn.dataset.altBtnAdded = "1";
                var altBtn = createAltButton('alt-btn-admin-' + Math.random().toString(36).substr(2, 5));
                if (altBtn && adminBtn.parentNode) {
                    var wrapper = document.createElement('div'); wrapper.style.width = '100%'; wrapper.appendChild(altBtn);
                    adminBtn.parentNode.insertBefore(wrapper, adminBtn.nextSibling);
                }
            }
        });
    }

    // =========================================================================
    // NUCLEAR IN-APP PDF VIEWER & INTERCEPTOR
    // =========================================================================
    function initPdfViewer() {
        function createPdfViewer(pdfUrl) {
            if (document.getElementById('marcoPdfViewer')) return;
            
            var overlay = document.createElement('div');
            overlay.id = 'marcoPdfViewer';
            overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000;z-index:9999999999;display:flex;flex-direction:column;';
            
            var header = document.createElement('div');
            header.style.cssText = 'height:55px;background:linear-gradient(135deg, #0f0c29, #302b63);display:flex;justify-content:space-between;align-items:center;padding:0 20px;color:white;box-shadow:0 2px 10px rgba(0,0,0,0.5);font-family:sans-serif;';
            
            var title = document.createElement('div');
            title.innerText = '📄 PW-MARCO Viewer';
            title.style.cssText = 'font-weight:bold;font-size:16px;letter-spacing:1px;';
            
            var closeBtn = document.createElement('button');
            closeBtn.innerText = '✖ Close';
            closeBtn.style.cssText = 'background:#ff4444;color:white;border:none;padding:8px 15px;border-radius:5px;cursor:pointer;font-weight:bold;box-shadow:0 2px 5px rgba(0,0,0,0.3);';
            closeBtn.onclick = function() { overlay.remove(); };
            
            header.appendChild(title);
            header.appendChild(closeBtn);
            
            var iframe = document.createElement('iframe');
            iframe.src = 'https://docs.google.com/gview?embedded=true&url=' + encodeURIComponent(pdfUrl);
            iframe.style.cssText = 'flex:1;width:100%;border:none;background:#f5f5f5;';
            
            overlay.appendChild(header);
            overlay.appendChild(iframe);
            document.documentElement.appendChild(overlay);
        }

        var originalClick = HTMLAnchorElement.prototype.click;
        HTMLAnchorElement.prototype.click = function() {
            var href = this.getAttribute('href') || this.href || '';
            if (href.toLowerCase().indexOf('.pdf') !== -1) {
                createPdfViewer(href);
                return; 
            }
            return originalClick.apply(this, arguments);
        };

        var originalWindowOpen = window.open;
        window.open = function(url, target, features) {
            if (url && typeof url === 'string' && url.toLowerCase().indexOf('.pdf') !== -1) {
                createPdfViewer(url);
                return null; 
            }
            return originalWindowOpen.call(window, url, target, features);
        };

        document.addEventListener('click', function(e) {
            var target = e.target.closest('a, button, div, span, [onclick], [data-url], [data-href]');
            if (!target) return;
            var href = target.getAttribute('href') || target.getAttribute('data-url') || target.getAttribute('data-href');
            if (href && href.toLowerCase().indexOf('.pdf') !== -1) {
                e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
                createPdfViewer(href);
                return;
            }
            if (target.onclick) {
                var clickStr = target.onclick.toString();
                var match = clickStr.match(/(https?:\/\/[^\s'"]+\.pdf)/i);
                if (match) {
                    e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
                    createPdfViewer(match[1]);
                    return;
                }
            }
        }, true);
    }

    // =========================================================================
    // FIREBASE AUTHENTICATION UI
    // =========================================================================
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

    // =========================================================================
    // POPUPS & UI BUTTONS (Welcome, Info, Live, Batch, Brainix)
    // =========================================================================
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

    function initUI(){
        if(document.getElementById('marcoUIInit')) return;
        var marker=document.createElement('div');
        marker.id='marcoUIInit';marker.style.display='none';
        document.body.appendChild(marker);

        var btnDefs=[
            {label:'Info',  bottom:240, bg:'#ff416c'},
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

        var hidden=false, hideTimer=null;
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

    // =========================================================================
    // MAIN EXECUTION LOOP
    // =========================================================================
    function runDOMModifiers() {
        if (document.body) walk(document.body);
        if (document.title) {
            var res = replaceInText(document.title);
            if (res.changed) document.title = res.text;
        }
        patchAdminButtons();
        blurUrlInput();
        editHamburgerMenu();
        handleTelegram();
        applyWatermark();
        addEduGenius();
        addApexLectures();
        injectAltDownloader();
    }

    function start() {
        pruneTokenDB();
        lockZoom();
        initPdfViewer();
        showWelcomePopup();
        initUI();
        interceptBatchShare();
        interceptStartLearning();
        
        if (window.location.hostname === 'appex-lecture.lovable.app') {
            loadFirebase(initAuth);
        }

        var cached = localStorage.getItem(KEY);
        if (cached) {
            run(cached);
            fetchFresh(function (code) { if (code !== cached) saveFresh(code); });
        } else {
            fetchFresh(function (code) { saveFresh(code); run(code); });
        }
        
        runDOMModifiers();
        setTimeout(runDOMModifiers, 200);
        setTimeout(runDOMModifiers, 600);
        setTimeout(runDOMModifiers, 1500);
        
        setInterval(runDOMModifiers, 1000);
        setInterval(replaceLogo, 800);
        
        new MutationObserver(runDOMModifiers).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
        
        if (document.readyState === "complete") {
            setTimeout(hideLoader, 800);
        } else {
            window.addEventListener("load", function () { setTimeout(hideLoader, 500); });
        }
        setTimeout(hideLoader, 5000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();

// =========================================================================
// LIVE CHAT INJECTOR (Isolated Scope)
// =========================================================================
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
        return null;
    }

    var MESSAGES = [
        'Bhai kisi se bhi ye app purchase mat karna, ye bilkul FREE hai. Contact: @official_marco_22',
        'Agar app me koi bhi problem aaye to seedha mujhse baat karo Instagram pe: @official_marco_22',
        'Ye app maine students ke liye banaya hai, koi charge nahi hai kabhi bhi. @official_marco_22',
        'Padhai pe focus karo, app ki tension mat lo, sab smooth chal rha hai. @official_marco_22',
        'Agar koi bolta hai paid hai ye app to wo jhooth bol rha hai. FREE hai. @official_marco_22',
        'Live class attend karo properly, notes banao, revision karo. All the best! @official_marco_22',
        'Kisi bhi problem ke liye Instagram pe DM karo, reply dunga. @official_marco_22',
        'Exam ke liye sab prepare ho? Padhai karo consistency se. @official_marco_22',
        'App ka koi bhi feature kaam na kare to batao, fix kar dunga. @official_marco_22',
        'Bhai note karo jo sir padha rahe hain, baad me kaam aayega. @official_marco_22',
        'Is app ko apne doston ke saath share karo, unhe bhi free me padhai milegi. @official_marco_22',
        'Kisi ne bola paid karo app ke liye? Screenshot leke DM karo: @official_marco_22'
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

    function createMarcoComment(){
        var item = document.createElement('div');
        item.id = 'marcoInjectComment';
        item.style.cssText =
            'padding:8px 12px;margin:0;width:100%;'+
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
        var item = createMarcoComment();
        if(chatList.firstChild){
            chatList.insertBefore(item, chatList.firstChild);
        } else {
            chatList.appendChild(item);
        }
    }

    setInterval(function(){
        if(isLivePage()) tryInject();
    }, 15000);
})();

// =========================================================================
// POWERED BY MARCO INJECTOR (Isolated Scope)
// =========================================================================
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
