"use strict";var precacheConfig=[["/Maps-frontend/index.html","b11f1573d0a1ed8b9b26468b74264270"],["/Maps-frontend/static/css/main.0aed5655.css","9bdd057a38ce591e94cc3238fcf8484a"],["/Maps-frontend/static/js/main.dd4cde45.js","da5f21ecb8bff4295ce51d01c05bed6d"],["/Maps-frontend/static/media/ExMap.a8970b27.jpg","a8970b27390d4f070eb29a7809c71dc8"],["/Maps-frontend/static/media/PlaceBookLogo.60152914.png","601529145acdd96596256fb0961e4b71"],["/Maps-frontend/static/media/cafe.f37b499a.png","f37b499a2078062419b1597e1dad4375"],["/Maps-frontend/static/media/dogfriendly.1ca57c95.png","1ca57c953dab454b7e5381db0ab7282f"],["/Maps-frontend/static/media/home.30eaff18.png","30eaff18b9a414b2f4aaae791c50686f"],["/Maps-frontend/static/media/hotel.5063cfa8.png","5063cfa86215ef1f29b9d11552d00c96"],["/Maps-frontend/static/media/icecream-cone.09ecb67b.png","09ecb67bc9a0d2269fed5345616abd87"],["/Maps-frontend/static/media/outdoors.65c75045.png","65c75045c129435508b880789eedc616"],["/Maps-frontend/static/media/restaurant.58e89233.png","58e89233c229ce05079620fe02eadae9"],["/Maps-frontend/static/media/ticket.6f74883f.png","6f74883f266512721afe8b21a316e342"],["/Maps-frontend/static/media/travel.0084f9ba.png","0084f9baba60692cf8d98fe861b4b5cc"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return a.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),a="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),e=urlsToCacheKeys.has(n));var r="/Maps-frontend/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(n=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});