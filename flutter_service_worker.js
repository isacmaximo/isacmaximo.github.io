'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "86f9269fc04cac21e26db053d96b60e7",
"assets/AssetManifest.bin.json": "af24310641eeea0526ec3da238f183b3",
"assets/AssetManifest.json": "5de1cef8552254737d31697c0d27c66f",
"assets/assets/fonts/QuickSand-Bold.ttf": "8003228962d5cafb549cf4034f9ece07",
"assets/assets/fonts/QuickSand-Light.ttf": "271e0c24a39dadbe933bc774f64f68f5",
"assets/assets/fonts/QuickSand-Medium.ttf": "95906e2457ee777801b3ca4b02b4947c",
"assets/assets/fonts/QuickSand-Regular.ttf": "5845af22f839a90a9cca3b8ec0e3cff4",
"assets/assets/fonts/QuickSand-SemiBold.ttf": "dc8fa3ed1fa18875d0aac23ecbf64e02",
"assets/assets/images/css3.svg": "d3ad67fa720fd7aee8c322caff911082",
"assets/assets/images/docker.svg": "589dd3984c875f03e274f555b3ad6e78",
"assets/assets/images/educhat.png": "4e2da3cba53450ded80e035591154f2f",
"assets/assets/images/eu.jpeg": "93eaaebe69fd9948b09707578f66a769",
"assets/assets/images/firebase.svg": "0f39e03faf3080c2c56124b586489912",
"assets/assets/images/flutter.svg": "f2e3fb32c6ba7935f07f050f1782afd6",
"assets/assets/images/gemini.svg": "5b215c1cf1ec59a77d0e2928c9611df9",
"assets/assets/images/git.svg": "64d5e98f1a220cdcad2b1a70d52ab669",
"assets/assets/images/github.svg": "0255bf2cd6e42c2fdbe2e189e418929f",
"assets/assets/images/gmail.svg": "ddc5dd5b40c9e6dec4a6de30ae3495d6",
"assets/assets/images/html5.svg": "24845c5ca600cfab149e84387d826465",
"assets/assets/images/java.svg": "a732a6e5bc69653a55d6dd81ab8d2d5e",
"assets/assets/images/javascript.svg": "87711407412494d529d45ee76167583c",
"assets/assets/images/linkedin.svg": "84c7a50f79b32fc80e2e1d7a9052846f",
"assets/assets/images/postgresql.svg": "f16a2cda4a160e5aafbab5f2aa49c526",
"assets/assets/images/python.svg": "51c2eab22c8994e70e7633979982b451",
"assets/assets/images/simplepdf.png": "af864b634825aa68c853380d8dae0436",
"assets/assets/images/spring.svg": "8f4a3137fbc42829e9290fa2287ea16c",
"assets/assets/images/sqlite.svg": "bb077b0f2c5a27e91f266a034cfc1a3d",
"assets/assets/images/whatsapp.svg": "c1dc45c70e94ff7e35a2e9c39e193d78",
"assets/FontManifest.json": "a287f59440f7577ea1500ed18bbcb44b",
"assets/fonts/MaterialIcons-Regular.otf": "2c040a84f90e6672589e2fd24236bd5f",
"assets/NOTICES": "74807825843472e486a5c46ffca84acc",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.js.symbols": "58832fbed59e00d2190aa295c4d70360",
"canvaskit/canvaskit.wasm": "07b9f5853202304d3b0749d9306573cc",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.js.symbols": "193deaca1a1424049326d4a91ad1d88d",
"canvaskit/chromium/canvaskit.wasm": "24c77e750a7fa6d474198905249ff506",
"canvaskit/skwasm.js": "1ef3ea3a0fec4569e5d531da25f34095",
"canvaskit/skwasm.js.symbols": "0088242d10d7e7d6d2649d1fe1bda7c1",
"canvaskit/skwasm.wasm": "264db41426307cfc7fa44b95a7772109",
"canvaskit/skwasm_heavy.js": "413f5b2b2d9345f37de148e2544f584f",
"canvaskit/skwasm_heavy.js.symbols": "3c01ec03b5de6d62c34e17014d1decd3",
"canvaskit/skwasm_heavy.wasm": "8034ad26ba2485dab2fd49bdd786837b",
"favicon.png": "8c52e1955336fab9aca3dedeebd05b0b",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"flutter_bootstrap.js": "0b3c7201b4ca84206b2d05fbc1ebe378",
"icons/Icon-192.png": "01f4b111a0d3f2a562c23ed745e26b35",
"icons/Icon-512.png": "a52746f47bf9c031c48a8f8dad960124",
"icons/Icon-maskable-192.png": "01f4b111a0d3f2a562c23ed745e26b35",
"icons/Icon-maskable-512.png": "a52746f47bf9c031c48a8f8dad960124",
"index.html": "e7def07c6799706a490520ba22a7142e",
"/": "e7def07c6799706a490520ba22a7142e",
"main.dart.js": "b88bda97d48412575be1f9eee5f13578",
"manifest.json": "5e7c4ff0213e38a6a28db513685a6b07",
"version.json": "e2187ce973f6eb36c6a3dd84a4239e8d"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
