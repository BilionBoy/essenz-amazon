// ===================================
// ESSENZA AMAZON - LUXURY INTERACTIONS
// ===================================

// Initialize AOS (Animate On Scroll)
document.addEventListener("DOMContentLoaded", () => {
  window.AOS.init({
    duration: 1000,
    easing: "ease-out-cubic",
    once: true,
    offset: 100,
  });
});

// Preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hidden");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }, 1500);
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.getElementById("mainNav");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Scroll Progress Bar
const scrollProgress = document.createElement("div");
scrollProgress.className = "scroll-progress";
document.body.appendChild(scrollProgress);

window.addEventListener("scroll", () => {
  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  scrollProgress.style.width = scrolled + "%";
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Product Data
const productsData = {
  "amazonia-noir": {
    name: "Amazônia Noir",
    description: "Carvão ativado & Eucalipto",
    price: "R$ 89,00",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=800&fit=crop&q=80",
    ingredients: [
      "Carvão ativado da Amazônia",
      "Óleo essencial de eucalipto",
      "Manteiga de cacau orgânica",
      "Óleo de coco virgem",
    ],
    benefits: [
      "Desintoxicação profunda da pele",
      "Remoção de impurezas e toxinas",
      "Propriedades antibacterianas",
      "Aroma refrescante e revigorante",
    ],
  },
  "flor-da-mata": {
    name: "Flor da Mata",
    description: "Lavanda & Camomila",
    price: "R$ 79,00",
    image:
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=600&h=800&fit=crop&q=80",
    ingredients: [
      "Óleo essencial de lavanda francesa",
      "Extrato de camomila amazônica",
      "Manteiga de karité pura",
      "Óleo de amêndoas doces",
    ],
    benefits: [
      "Relaxamento e alívio do estresse",
      "Propriedades calmantes e anti-inflamatórias",
      "Hidratação profunda",
      "Aroma floral suave e terapêutico",
    ],
  },
  "ouro-verde": {
    name: "Ouro Verde",
    description: "Açaí & Cupuaçu",
    price: "R$ 95,00",
    image:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&h=700&fit=crop&q=80",
    ingredients: [
      "Óleo de açaí prensado a frio",
      "Manteiga de cupuaçu amazônica",
      "Extrato de guaraná",
      "Óleo de buriti",
    ],
    benefits: [
      "Antioxidantes poderosos",
      "Nutrição intensa da pele",
      "Proteção contra radicais livres",
      "Revitalização celular",
    ],
  },
  "essencia-pura": {
    name: "Essência Pura",
    description: "Coco & Karité",
    price: "R$ 85,00",
    image:
      "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=600&h=800&fit=crop&q=80",
    ingredients: [
      "Óleo de coco virgem extra",
      "Manteiga de karité não refinada",
      "Óleo de babaçu",
      "Extrato de castanha-do-pará",
    ],
    benefits: [
      "Hidratação suprema",
      "Suavidade e maciez extrema",
      "Reparação da barreira cutânea",
      "Aroma tropical delicado",
    ],
  },
};

// 3D Product Modal Functions
let isDragging = false;
let startX = 0;
let currentRotation = 0;

function openProductModal(productId) {
  const modal = document.getElementById("productModal");
  const product = productsData[productId];

  if (!product) return;

  // Update modal content
  document.getElementById("modalProductName").textContent = product.name;
  document.getElementById("modalProductDescription").textContent =
    product.description;
  document.getElementById("modalProductPrice").textContent = product.price;
  document.getElementById("modalProductImage").src = product.image;

  // Update ingredients
  const ingredientsList = document.getElementById("modalProductIngredients");
  ingredientsList.innerHTML = "";
  product.ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    ingredientsList.appendChild(li);
  });

  // Update benefits
  const benefitsList = document.getElementById("modalProductBenefits");
  benefitsList.innerHTML = "";
  product.benefits.forEach((benefit) => {
    const li = document.createElement("li");
    li.textContent = benefit;
    benefitsList.appendChild(li);
  });

  // Show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Initialize 3D interaction
  init3DInteraction();
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
  currentRotation = 0;
}

function init3DInteraction() {
  const wrapper = document.getElementById("product3DWrapper");

  wrapper.addEventListener("mousedown", startDrag);
  wrapper.addEventListener("touchstart", startDrag);

  document.addEventListener("mousemove", drag);
  document.addEventListener("touchmove", drag);

  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchend", stopDrag);
}

function startDrag(e) {
  isDragging = true;
  startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
}

function drag(e) {
  if (!isDragging) return;

  const currentX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  const deltaX = currentX - startX;
  currentRotation += deltaX * 0.5;

  const wrapper = document.getElementById("product3DWrapper");
  wrapper.style.transform = `rotateY(${currentRotation}deg)`;

  startX = currentX;
}

function stopDrag() {
  isDragging = false;
}

// Floating Particles Animation
function createFloatingParticles() {
  const particlesContainer = document.querySelector(".floating-particles");
  if (!particlesContainer) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(201, 169, 97, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatParticle ${
              Math.random() * 10 + 10
            }s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
    particlesContainer.appendChild(particle);
  }
}

// Add particle animation keyframes
const style = document.createElement("style");
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${
  Math.random() * 200 - 100
}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
createFloatingParticles();

// Form Submission Handler
document
  .querySelector(".contact-form")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Obrigado pelo contato! Retornaremos em breve.");
    this.reset();
  });

document
  .querySelector(".newsletter-form")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Inscrição realizada com sucesso!");
    this.reset();
  });

// Parallax Effect for Images
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(
    ".philosophy-img, .image-frame-alt img"
  );

  parallaxElements.forEach((element) => {
    const speed = 0.5;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

// Add 3D Particles to Modal
function create3DParticles() {
  const particlesContainer = document.querySelector(".product-3d-particles");
  if (!particlesContainer) return;

  for (let i = 0; i < 10; i++) {
    const particle = document.createElement("div");
    particle.className = "modal-particle";
    particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: var(--color-accent);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: 0;
            animation: particle ${Math.random() * 4 + 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
    particlesContainer.appendChild(particle);
  }
}

// Initialize 3D particles when modal opens
const originalOpenModal = openProductModal;
openProductModal = (productId) => {
  originalOpenModal(productId);
  setTimeout(create3DParticles, 100);
};

// Close modal on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProductModal();
  }
});

// Lazy Loading for Images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img").forEach((img) => {
    imageObserver.observe(img);
  });
}

console.log("Essenza Amazon - Luxury Experience Loaded ✨");
