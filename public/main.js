/*(function () {
  const auth = localStorage.getItem("isLoggedIn");

  if (auth !== "true") {
    window.location.href = "/";
    alert("Yetkisiz erişim! Lütfen önce giriş yapın.");
  }
})();*/

const album = document.getElementById("album");
const folderPath = "/photos/";
let photoNumber = 1;
let featuredDiv = null;

const macyInstance = Macy({
  container: "#album",
  trueOrder: true,
  waitForImages: false,
  margin: 20,
  columns: 3,
  breakAt: { 900: 2, 600: 1 },
});

function loadMedia() {
  const img = new Image();
  const currentSrc = `${folderPath}${photoNumber}.jpg`;
  img.src = currentSrc;

  img.onload = function () {
    createMediaElement(currentSrc, "img");
  };
  img.onerror = function () {
    const video = document.createElement("video");
    const videoSrc = `${folderPath}${photoNumber}.mp4`;
    video.src = videoSrc;
    video.onloadedmetadata = function () {
      createMediaElement(videoSrc, "video");
    };
    video.onerror = function () {
      console.log(`End at #${photoNumber - 1}`);
    };
  };
}

let slider1 = null; // For 1-6
let slider2 = null; // For 50-51

function createMediaElement(src, type) {
  let el =
    type === "img"
      ? document.createElement("img")
      : document.createElement("video");
  el.src = src;

  // --- NEW: Add Click/Touch Listener ---
  // We extract the filename from the 'src' string
  el.addEventListener("click", () => {
    const fullName = src.split("/").pop();
    const match = fullName.match(/^\d+/);

    if (match) {
      const photoNum = Number(match[0]);

      if (photoNum <= 6) {
      } else if (photoNum === 7) {
        const willingtoremove = el.parentElement.querySelector(
          ".album_photo_catchPhrase",
        );
        if (willingtoremove) {
          willingtoremove.remove();
          el.parentElement.style.filter = "brightness(100%)";
        } else {
          el.insertAdjacentHTML(
            "beforebegin",
            "<h3 class='album_photo_catchPhrase'>blablablabla</h3>",
          );
          el.parentElement.style.filter = "brightness(40%)";
        }
      } else if (photoNum === 11) {
      } else if (photoNum === 12) {
      } else if (photoNum === 13) {
      } else {
        el.style.scale = 1.1;
      }
    }
  });

  if (type === "video") {
    el.autoplay = true;
    el.loop = true;
    el.muted = true;
    el.playsInline = true;
  }

  // --- SLIDER 1 (Photos 1-6) ---
  if (photoNumber <= 6) {
    if (!slider1) {
      slider1 = document.createElement("div");
      slider1.className = "album_photo featured_slider";
      album.appendChild(slider1);
    }
    if (photoNumber === 1) el.classList.add("active");
    slider1.appendChild(el);
    if (photoNumber === 6) startSlider(slider1); // Pass the specific div
  }

  // --- SLIDER 2 (Photos 50-51) ---
  else if (photoNumber >= 50 && photoNumber <= 51) {
    if (!slider2) {
      slider2 = document.createElement("div");
      slider2.className = "album_photo featured_slider";
      album.appendChild(slider2);
    }
    if (photoNumber === 50) el.classList.add("active");
    slider2.appendChild(el);
    if (photoNumber === 51) startSlider(slider2); // Pass the specific div
  }

  // --- INDIVIDUAL PHOTOS ---
  else {
    const photoDiv = document.createElement("div");
    photoDiv.className = "album_photo";
    photoDiv.appendChild(el);
    album.appendChild(photoDiv);
  }

  macyInstance.runOnImageLoad(() => macyInstance.recalculate(true));
  photoNumber++;
  loadMedia();
}

loadMedia();

// Updated to accept a specific slider element
function startSlider(container) {
  let current = 0;
  const slides = container.children;

  if (slides.length <= 1) return; // Don't slide if only 1 image

  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 3000);
}

let spotifyActive = false;

const spotify = document.querySelector("#spotify");
const img = document.querySelector("#spotify img");

img.addEventListener("click", () => {
  if (spotifyActive) {
    spotify.style.transform = "translateX(100%)"; // kapat
  } else {
    spotify.style.transform = "translateX(0%)"; // aç
  }

  spotifyActive = !spotifyActive;
});
