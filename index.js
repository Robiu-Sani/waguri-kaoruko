const petalCont = document.getElementById('petal-container');

for(let i = 0; i < 100; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';

    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.top = Math.random() * 100 + 'vh';
    petal.style.width = Math.random() * 15 + 5 + 'px';
    petal.style.height = petal.style.width;

    petalCont.appendChild(petal);

    gsap.to(petal, {
        y: '100vh',
        x: '+=100',
        rotation: 360,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        delay: Math.random() * 5,
        ease: "none"
    });
}

  // Lenis
  const lenis = new Lenis();
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  gsap.registerPlugin(ScrollTrigger);

  // Parallax hero
  gsap.to(".parallax-img", { y: -130, ease: "none", scrollTrigger: { trigger: "body", start: "top top", end: "bottom top", scrub: 1.2 } });

  // Love story slides
  gsap.timeline({ scrollTrigger: { trigger: "#carousel-bond", start: "top 65%", toggleActions: "play none none reverse" } })
    .to(".character-slide-left", { x: 30, opacity: 1, duration: 1.2 }, 0)
    .to(".character-slide-right", { x: -30, opacity: 1, duration: 1.2 }, 0);

  // CAROUSEL TEXT (auto + dots)
  const texts = ['carousel-text-1','carousel-text-2','carousel-text-3','carousel-text-4'];
  const dots = document.querySelectorAll('.carousel-dot');
  let currentCarousel = 0;
  function showCarouselIndex(idx) {
    texts.forEach((id, i) => { document.getElementById(id).style.opacity = i === idx ? '1' : '0'; });
    dots.forEach((d, i) => { d.classList.toggle('bg-pink-400', i === idx); d.classList.toggle('bg-gray-300', i !== idx); });
  }
  dots.forEach((dot, i) => dot.addEventListener('click', () => { currentCarousel = i; showCarouselIndex(i); }));
  setInterval(() => { currentCarousel = (currentCarousel + 1) % 4; showCarouselIndex(currentCarousel); }, 5000);
  showCarouselIndex(0);



  
  // FASTER FRAMES (scrub 2.2 instead of 1, makes it move quickly)
  let framesWrapper = document.getElementById("frames-wrapper");
  gsap.to(framesWrapper, {
    x: () => -(framesWrapper.scrollWidth - window.innerWidth + 7000),
    ease: "none",
    scrollTrigger: { trigger: "#frames-section", start: "top top", end: () => "+=" + (framesWrapper.scrollWidth * 1), scrub: 2.2, pin: true, anticipatePin: 5 }
  });

  const track = document.getElementById("carouselTrack");
let scrollAmount = 0;

/* duplicate for infinite effect */
track.innerHTML += track.innerHTML;

/* auto scroll */
function autoScroll() {
    scrollAmount += 0.5;
    track.style.transform = `translateX(-${scrollAmount}px)`;

    if (scrollAmount >= track.scrollWidth / 2) {
        scrollAmount = 0;
    }

    requestAnimationFrame(autoScroll);
}
autoScroll();

/* center highlight */
const items = document.querySelectorAll(".carousel-item");
setInterval(() => {
    items.forEach(i => i.classList.remove("active"));
    const index = Math.floor((scrollAmount / 240) % items.length);
    items[index]?.classList.add("active");
}, 200);


/* ===== MODAL ===== */
let currentIndex = 0;
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");

const allImages = Array.from(document.querySelectorAll(".carousel-item"));

allImages.forEach((img, i) => {
    img.addEventListener("click", () => {
        currentIndex = i;
        showImage();
        modal.classList.remove("hidden");
    });
});

function showImage() {
    modalImg.src = allImages[currentIndex].src;
}

function closeModal() {
    modal.classList.add("hidden");
}

function nextImage() {
    currentIndex = (currentIndex + 1) % allImages.length;
    showImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    showImage();
}

// Story items
  gsap.utils.toArray(".story-item").forEach(item => {
    gsap.from(item.querySelector(".story-img"), { x: -60, opacity: 0, duration: 1, scrollTrigger: { trigger: item, start: "top 80%", toggleActions: "play none none reverse" } });
    gsap.from(item.querySelector(".story-text"), { x: 60, opacity: 0, duration: 1, scrollTrigger: { trigger: item, start: "top 80%" } });
  });