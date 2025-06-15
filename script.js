// Log saat halaman dimuat
console.log("Halaman dimuat.");

// Log saat user menggulir ke setiap section
function setupImageZoom() {
  const galleries = document.querySelectorAll(".gallery.zoomable");

  galleries.forEach(gallery => {
    const images = gallery.querySelectorAll("img");

    images.forEach((img, index) => {
      img.addEventListener("click", (e) => {
        const popup = document.getElementById("image-popup");
        const popupImg = document.getElementById("popup-img");

        if (!popup || !popupImg) return;

        currentZoomGroup = Array.from(images);
        currentZoomIndex = index;

        popupImg.src = img.src;
        popup.classList.remove("hidden");

        document.querySelector(".zoom-nav.left").style.display =
          currentZoomGroup.length > 1 ? "block" : "none";
        document.querySelector(".zoom-nav.right").style.display =
          currentZoomGroup.length > 1 ? "block" : "none";
      });
    });
  });
}

function startAutoSlide(galleryId) {
  const gallery = document.getElementById(galleryId);
  if (!gallery) return;

  let scrollPosition = 0;
  const scrollStep = 300;

  setInterval(() => {
    scrollPosition += scrollStep;

    if (scrollPosition >= gallery.scrollWidth - gallery.clientWidth) {
      scrollPosition = 0;
    }

    gallery.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }, 4000);
}

function navigateZoom(direction) {
  currentZoomIndex += direction;

  if (currentZoomIndex < 0) currentZoomIndex = currentZoomGroup.length - 1;
  if (currentZoomIndex >= currentZoomGroup.length) currentZoomIndex = 0;

  const popupImg = document.getElementById("popup-img");
  popupImg.src = currentZoomGroup[currentZoomIndex].src;
}

function closePopup(event) {
  if (event.target.id === "image-popup") {
    document.getElementById("image-popup").classList.add("hidden");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupImageZoom();

  startAutoSlide("gallery1");
  startAutoSlide("gallery2");
  startAutoSlide("gallery3");

  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".navbar a");
  window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + document.querySelector('.navbar').offsetHeight + 20;
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        const currentId = section.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  const burger = document.getElementById("burger-btn");
  const navList = document.querySelector(".navbar ul");
  if (burger && navList) {
    burger.addEventListener("click", () => {
      navList.classList.toggle("show");
    });

    navList.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navList.classList.remove("show");
      });
    });
  }

  const canvas = document.getElementById("landing-star-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let stars = [];

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.5 + 0.2
      });
    }

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00fff7";
      ctx.shadowColor = "#00fff7";
      ctx.shadowBlur = 8;

      for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.speed;

        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      }

      requestAnimationFrame(drawStars);
    }

    drawStars();
  }
});

// Log saat user klik link kontak
document.querySelectorAll(".contact a").forEach(link => {
  link.addEventListener("click", (e) => {
    console.log(`Klik pada kontak: ${e.target.href}`);
  });
});

//galery porto
function toggleGallery1() {
    const wrapper = document.getElementById("wrapper1");
    wrapper.classList.toggle("hidden"); 
  }

  function toggleGallery2() {
    const wrapper = document.getElementById("wrapper2");
    wrapper.classList.toggle("hidden");
  }  
  
  
  function toggleGallery3() {
    const wrapper = document.getElementById("wrapper3");
    wrapper.classList.toggle("hidden");
  }

  
function setupImageZoom() {
  const galleries = document.querySelectorAll(".gallery.zoomable");

  galleries.forEach(gallery => {
    const images = gallery.querySelectorAll("img");

    images.forEach((img, index) => {
      img.addEventListener("click", (e) => {
        const popup = document.getElementById("image-popup");
        const popupImg = document.getElementById("popup-img");

        if (!popup || !popupImg) return;

        currentZoomGroup = Array.from(images);
        currentZoomIndex = index;

        popupImg.src = img.src;
        popup.classList.remove("hidden");

        // Tombol navigasi hanya muncul jika gambar lebih dari 1
        document.querySelector(".zoom-nav.left").style.display =
          currentZoomGroup.length > 1 ? "block" : "none";
        document.querySelector(".zoom-nav.right").style.display =
          currentZoomGroup.length > 1 ? "block" : "none";
      });
    });
  });
}

  // PROFILE ZOOM
  // ZOOM UNTUK FOTO PROFIL
  const profileImg = document.querySelector(".profile-img");
  const escBtn = document.getElementById("close-profile-btn");

  function closeProfileZoom() {
    if (!profileImg) return;
    profileImg.classList.remove("zoomed");
    if (escBtn) escBtn.classList.add("hidden");
    document.removeEventListener("click", closeProfileZoomOutside);
  }

  function closeProfileZoomOutside(e) {
    if (!profileImg.contains(e.target) && e.target !== escBtn) {
      closeProfileZoom();
    }
  }

  if (profileImg) {
    profileImg.addEventListener("click", () => {
      if (profileImg.classList.contains("zoomed")) {
        closeProfileZoom();
      } else {
        profileImg.classList.add("zoomed");
        if (escBtn) escBtn.classList.remove("hidden");
        setTimeout(() => {
          document.addEventListener("click", closeProfileZoomOutside);
        }, 0);
      }
    });
  }

  if (escBtn) {
    escBtn.addEventListener("click", () => {
      closeProfileZoom();
    });
  }


document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    const popup = document.getElementById("image-popup");

    if (!popup || popup.classList.contains("hidden")) {
      // Jika foto profil dalam keadaan zoom
      if (profileImg && profileImg.classList.contains("zoomed")) {
        closeProfileZoom();
      }
      return;
    }

    // Escape untuk popup galeri
    popup.classList.add("hidden");
    popup.classList.remove("single-image");
  }
});


function closeProfileZoom() {
  profileImg.classList.remove("zoomed");
  escBtn.classList.add("hidden");
  document.removeEventListener("click", closeProfileZoomOutside);
}

function closeProfileZoomOutside(e) {
  if (!profileImg.contains(e.target)) {
    closeProfileZoom();
  }
}


  function closeProfileZoomOutside(e) {
    if (!profileImg.contains(e.target)) {
      profileImg.classList.remove("zoomed");
      document.removeEventListener("click", closeProfileZoomOutside);
    }
  }


  // Sticky navbar saat scroll ke bawah
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    const body = document.body;
  
    if (window.scrollY > 100) {
      navbar.classList.add("sticky");
      body.classList.add("nav-fixed");
    } else {
      navbar.classList.remove("sticky");
      body.classList.remove("nav-fixed");
    }
  });

  // Header sembunyi saat scroll ke bawah, muncul saat scroll ke atas
let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scroll ke bawah
    header.classList.add("hide");
  } else {
    // Scroll ke atas
    header.classList.remove("hide");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // biar tidak negatif
});

// Highlight navbar item sesuai section yang terlihat
const sections = document.querySelectorAll("section[id], header[id]");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY + 150;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      const currentId = section.getAttribute("id");
      
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});


// Efek bintang neon di landing page
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Buat bintang
for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 0.5 + 0.2
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00fff7';
  ctx.shadowColor = '#00fff7';
  ctx.shadowBlur = 8;

  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;

    // reset ke atas
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  }

  requestAnimationFrame(drawStars);
}

drawStars();

// Animasi fade-in saat scroll masuk viewport
const faders = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // agar tidak diulang
    }
  });
}, {
  threshold: 0.2
});

faders.forEach(fader => {
  fadeObserver.observe(fader);
});

function scrollGallery(galleryId, direction) {
    const gallery = document.getElementById(galleryId);
    const scrollAmount = 220; // lebar gambar + margin
  
    gallery.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }
  
let currentZoomIndex = 0;
let currentZoomGroup = [];

function openZoom(src) {
  document.body.classList.add("popup-open");
  const popup = document.getElementById("image-popup");
  const popupImg = document.getElementById("popup-img");
  const leftBtn = document.querySelector(".zoom-nav.left");
  const rightBtn = document.querySelector(".zoom-nav.right");

  popupImg.src = src;
  popup.classList.remove("hidden");

  if (currentZoomGroup.length <= 1) {
    leftBtn.style.display = "none";
    rightBtn.style.display = "none";
  } else {
    leftBtn.style.display = "block";
    rightBtn.style.display = "block";
  }
}


function navigateZoom(direction) {
    if (currentZoomGroup.length <= 1) {
        // Jika hanya 1 gambar (seperti profil), tidak perlu navigasi
        return;
    }
    
    currentZoomIndex += direction;
    if (currentZoomIndex < 0) currentZoomIndex = currentZoomGroup.length - 1;
    if (currentZoomIndex >= currentZoomGroup.length) currentZoomIndex = 0;

    const popupImg = document.getElementById("popup-img");
    popupImg.src = currentZoomGroup[currentZoomIndex].src;
}

if (profileImg) {
  profileImg.addEventListener('click', () => {
    profilePopup.classList.remove('hidden');
  });
}

function closeProfilePopup(event) {
  if (event.target.id === "profile-popup") {
    profilePopup.classList.add("hidden");
  }
}

function closePopup(event) {
  document.body.classList.remove("popup-open");
    const popup = document.getElementById("image-popup");
    if (event.target.id === "image-popup" || event.target.classList.contains('close-btn')) {
        popup.classList.add("hidden");
        popup.classList.remove("single-image"); // Hapus class
    }
}

// ESC key
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    const popup = document.getElementById("image-popup");

    if (!popup || popup.classList.contains("hidden")) return;

    if (popup.classList.contains("single-image")) {
      // Escape untuk foto profil
      console.log("Escape ditekan untuk foto profil");
      popup.classList.add("hidden");
      popup.classList.remove("single-image");
    } else {
      // Escape untuk galeri
      console.log("Escape ditekan untuk galeri");
      popup.classList.add("hidden");
    }
  }
});


function startAutoSlide(galleryId) {
  const gallery = document.getElementById(galleryId);
  if (!gallery) return;

  let scrollStep = 300; 
  let scrollPosition = 0;

  setInterval(() => {
    if (!gallery) return;

    scrollPosition += scrollStep;

    if (scrollPosition >= gallery.scrollWidth - gallery.clientWidth) {
      scrollPosition = 0;
    }

    gallery.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }, 4000);
}

window.addEventListener("scroll", () => {
  const burger = document.getElementById("burger-btn");
  const profile = document.getElementById("profile");
  const scrollY = window.scrollY;

  if (!burger || !profile) return;

  const profileTop = profile.offsetTop;

  if (scrollY >= profileTop - 100) {
    burger.style.display = "block";
  } else {
    burger.style.display = "none";
  }
});
