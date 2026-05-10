const revealElements = document.querySelectorAll(".reveal");
const portrait = document.querySelector(".portrait");
const portraitFallback = document.querySelector(".portrait-fallback");
const petalsRoot = document.querySelector(".petals");
const photoGrid = document.querySelector("#photo-grid");
const galleryPhotos = [
  "images/19bab277-64b3-4e65-8596-cfc840e28b13.jpeg",
  "images/c4d84311-8d05-4a9d-9db1-5cb6fbe5ac6c.jpeg",
  "images/d84c32f9-4821-4bed-a4b5-f87debc8afb7.jpeg",
];

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => revealObserver.observe(element));

if (portrait && portraitFallback) {
  portrait.addEventListener("error", () => {
    portrait.style.display = "none";
    portraitFallback.style.display = "grid";
  });
}

if (photoGrid) {
  galleryPhotos.forEach((src, index) => {
    const card = document.createElement("figure");
    card.className = "photo-card";

    const image = document.createElement("img");
    image.src = src;
    image.alt = `Memory with Mommy ${index + 1}`;

    const caption = document.createElement("figcaption");
    caption.textContent = "We love you mommy, best mom in the world.";

    card.append(image, caption);
    photoGrid.appendChild(card);
  });
}

function createPetal() {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.animationDuration = `${8 + Math.random() * 7}s`;
  petal.style.animationDelay = `${Math.random() * 2}s`;
  petal.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
  petalsRoot.appendChild(petal);

  window.setTimeout(() => {
    petal.remove();
  }, 15000);
}

for (let i = 0; i < 18; i += 1) {
  window.setTimeout(createPetal, i * 320);
}

window.setInterval(createPetal, 900);
