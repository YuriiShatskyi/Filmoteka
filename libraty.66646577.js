!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},r=n.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in a){var n=a[e];delete a[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){a[e]=n},n.parcelRequired7c6=r);var i=r("8nrFW"),o={watchedBtn:document.querySelector(".wached-btn"),queueBtn:document.querySelector(".queue-btn"),gallery:document.querySelector(".gallery"),openModalE:document.querySelector(".filmsModal")};function c(){o.queueBtn.classList.remove("active"),o.watchedBtn.classList.add("active");var n=JSON.parse(localStorage.getItem("watched-films"));if(null!==n){var t=e(i)(new Map(n.map((function(e){return[e.id,e]}))).values());console.log("queuedMovies",t);var a=t.map((function(e){return"\n <a id=".concat(e.id,' class="gallery__poster-card" href="">\n  <img class="poster-card__image" src="https://image.tmdb.org/t/p/w780').concat(e.poster_path,'" alt="" loading="lazy" />\n  <div class="poster-card__info">\n    <p class="info-item title">\n      ').concat(e.original_title,'\n    </p>\n    <p class="info-item">\n    ').concat(e.genres[0].name,", ").concat(e.genres[1].name,", ").concat(e.genres[2].name," | ").concat(e.release_date.substring(0,4),"\n    </p>\n  \n  </div>\n  </a>\n")})).join("");o.gallery.innerHTML=a}else{o.gallery.innerHTML="<p>Your list is empty(</p>"}}o.watchedBtn.addEventListener("click",c),o.queueBtn.addEventListener("click",(function(){o.watchedBtn.classList.remove("active"),o.queueBtn.classList.add("active");var n=JSON.parse(localStorage.getItem("queue-films"));if(null===n){return void(o.gallery.innerHTML="<p>Your list is empty(</p>")}var t=e(i)(new Map(n.map((function(e){return[e.id,e]}))).values());console.log("queuedMovies",t);var a=t.map((function(e){return"\n <a id=".concat(e.id,' class="gallery__poster-card" href="">\n  <img class="poster-card__image" src="https://image.tmdb.org/t/p/w780').concat(e.poster_path,'" alt="" loading="lazy" />\n  <div class="poster-card__info">\n    <p class="info-item title">\n      ').concat(e.original_title,'\n    </p>\n    <p class="info-item">\n    ').concat(e.genres[0].name,", ").concat(e.genres[1].name,", ").concat(e.genres[2].name," | ").concat(e.release_date.substring(0,4),"\n    </p>\n  \n  </div>\n  </a>\n")})).join("");o.gallery.innerHTML=a})),c(),r("5xtVg"),r("ghnK3")}();
//# sourceMappingURL=libraty.66646577.js.map
