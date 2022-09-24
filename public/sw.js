let cacheData = "appV1";
// console.log("dileep vvvvv");
// console.log("pwa ",);

// window.addEventListener('beforeinstallprompt', (e) => {
//   document.getElementsByClassName("navbar__link")[0].style.display = 'none'
// });


this.addEventListener("install", (event) => {
  // console.log("event ",event);

  // if(event.type === "install"){
  //   console.log("lohar",document.getElementsByClassName("navbar__link"));
  //   document.getElementsByClassName("navbar__link").style.display = 'none'
  // }
  // if (window.matchMedia('(display-mode: standalone)').matches) {
  //   console.log('display-mode is standalone');
  // }
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/bundle.js",
        "/static/js/main.chunk.js",
        "/static/js/0.chunk.js",
        "/static/js/vendors~main.chunk.js",
        "/index.html",
        "/student",
      ]);
    })
  );
  
});

this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((result) => {
        if (result) {
          return result;
        }
        let requestUrl = event.request.clone()
        return fetch(requestUrl)
      })
    );
  }
});
