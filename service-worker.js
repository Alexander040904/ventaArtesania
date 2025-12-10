self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("artesanias-cache-v1").then((cache) => {
      return cache.addAll([
        "./", // raíz
        "./index.html",
        "./manifest.json",
        "./css/style.css",
        "./css/bootstrap.min.css",
        "./css/bootstrap-icons.css",
        "./fonts/bootstrap-icons.woff2",
        "./fonts/bootstrap-icons.woff",
        "./js/app.js",
        "./js/firebase.js",
      ]);
    })
  );
});
self.addEventListener("fetch", (e) => {
  // ✅ Solo manejar peticiones GET
  if (e.request.method !== "GET") return;

  e.respondWith(
    caches.match(e.request).then((cached) => {
      return (
        cached ||
        fetch(e.request).then((response) => {
          const clone = response.clone();
          caches.open("artesanias-cache-v2").then((cache) => cache.put(e.request, clone));
          return response;
        })
      );
    })
  );
});


