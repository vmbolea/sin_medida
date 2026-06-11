const galleries = {
  bolsos: {
    title: "Bolsos",
    images: [
      "imagenes/bolso_1.jpeg",
      "imagenes/bolso_2.jpeg",
      "imagenes/bolso_3.jpeg",
      "imagenes/bolso_4.jpeg",
      "imagenes/bolso_5.jpeg",
      "imagenes/bolso_6.jpeg",
      "imagenes/bolso_7.jpeg",
    ],
  },
  delantales: {
    title: "Delantales",
    images: [
      "imagenes/delantal_1.jpeg",
      "imagenes/delantal_2.jpeg",
      "imagenes/delantal_3.jpeg",
      "imagenes/delantal_4.jpeg",
    ],
  },
  maquea: {
    title: "Maquea tu ropa",
    images: [
      "imagenes/maqueada_1.jpeg",
      "imagenes/maqueada_2.jpeg",
      "imagenes/maqueada_3.jpeg",
      "imagenes/maqueada_4.jpeg",
      "imagenes/maqueada_5.jpeg",
    ],
  },
};

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const closeButton = document.querySelector(".lightbox-close");
const previousButton = document.querySelector(".lightbox-control.previous");
const nextButton = document.querySelector(".lightbox-control.next");

let activeGallery = null;
let activeIndex = 0;

function renderImage() {
  if (!activeGallery) return;

  const gallery = galleries[activeGallery];
  const imageNumber = activeIndex + 1;

  lightboxImage.src = gallery.images[activeIndex];
  lightboxImage.alt = `${gallery.title} ${imageNumber}`;
  lightboxCaption.textContent = `${gallery.title} · ${imageNumber} / ${gallery.images.length}`;
}

function openGallery(galleryName) {
  activeGallery = galleryName;
  activeIndex = 0;
  renderImage();
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeButton.focus();
}

function closeGallery() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  activeGallery = null;
}

function moveGallery(direction) {
  if (!activeGallery) return;

  const total = galleries[activeGallery].images.length;
  activeIndex = (activeIndex + direction + total) % total;
  renderImage();
}

document.querySelectorAll(".catalog-card").forEach((card) => {
  card.addEventListener("click", () => openGallery(card.dataset.gallery));
});

closeButton.addEventListener("click", closeGallery);
previousButton.addEventListener("click", () => moveGallery(-1));
nextButton.addEventListener("click", () => moveGallery(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeGallery();
  }
});

document.addEventListener("keydown", (event) => {
  if (!activeGallery) return;

  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowLeft") moveGallery(-1);
  if (event.key === "ArrowRight") moveGallery(1);
});
