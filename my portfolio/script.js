// -----------------------------
// THEME TOGGLE
// -----------------------------
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") root.classList.add("light");
themeToggle.addEventListener("click", () => {
  const isLight = root.classList.toggle("light");
  themeToggle.setAttribute("aria-pressed", String(isLight));
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// -----------------------------
// MOBILE MENU
// -----------------------------
const mobileMenu = document.getElementById("mobileMenu");
const openBtn = document.getElementById("hamburger");
const closeBtn = document.getElementById("closeMenu");
const links = document.querySelectorAll(".m-link");

const toggleMenu = (open) => {
  mobileMenu.style.display = open ? "block" : "none";
  mobileMenu.setAttribute("aria-hidden", String(!open));
  openBtn.setAttribute("aria-expanded", String(open));
};
openBtn.addEventListener("click", () => toggleMenu(true));
closeBtn.addEventListener("click", () => toggleMenu(false));
links.forEach((l) => l.addEventListener("click", () => toggleMenu(false)));

// Close mobile menu on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") toggleMenu(false);
});

// -----------------------------
// TYPING / CODE DEMO
// -----------------------------
const code = `// quick demo
const anika = {
  role: ["Web Dev", "UI/UX", "Video", "Graphics"],
  stack: ["HTML", "CSS", "JS", "React", "Figma"],
  now: "AI + Fashion automation",
}

function ship(project){
  return \`{✨ Launch: \${project} 🚀}\`
}

console.log(ship("Virtual Try-On"));`;

const codeBlock = document.getElementById("codeBlock").querySelector("code");
let i = 0;
function type() {
  if (i <= code.length) {
    codeBlock.textContent = code.slice(0, i++);
    requestAnimationFrame(type);
  }
}
type();

// -----------------------------
// REVEAL ON SCROLL & PROGRESS BARS
// -----------------------------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("revealed");
        e.target.querySelectorAll(".bar>span").forEach((span) => {
          const pct = span.getAttribute("data-pct");
          span.style.width = pct + "%";
        });
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".will-reveal, #skills .panel").forEach((el) => {
  observer.observe(el);
});

// -----------------------------
// COUNTERS
// -----------------------------
const counters = document.querySelectorAll(".counter");
const countObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        const el = en.target;
        const to = +el.dataset.to;
        let cur = 0;
        const step = Math.max(1, Math.floor(to / 60));
        const tick = () => {
          cur += step;
          if (cur >= to) {
            el.textContent = to;
          } else {
            el.textContent = cur;
            requestAnimationFrame(tick);
          }
        };
        tick();
        countObs.unobserve(el);
      }
    });
  },
  { threshold: 0.6 }
);
counters.forEach((c) => countObs.observe(c));

// -----------------------------
// PROJECT FILTER
// -----------------------------
const filterBtns = document.querySelectorAll(".filter button");
const cards = document.querySelectorAll("#projectGrid .card");
filterBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    cards.forEach((card) => {
      const cat = card.getAttribute("data-cat") || "";
      const show = f === "all" || cat.includes(f);
      card.style.display = show ? "block" : "none";
    });
  })
);

// -----------------------------
// TESTIMONIAL CAROUSEL
// -----------------------------
const slides = document.getElementById("slides");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const items = slides.children;
let idx = 0;
const dotsWrap = document.getElementById("dots");

function makeDots() {
  dotsWrap.innerHTML = "";
  for (let d = 0; d < items.length; d++) {
    const s = document.createElement("span");
    s.textContent = "•";
    s.style.margin = "0 6px";
    s.style.cursor = "pointer";
    s.style.opacity = d === idx ? 1 : 0.4;
    s.addEventListener("click", () => go(d));
    dotsWrap.appendChild(s);
  }
}
function go(n) {
  idx = (n + items.length) % items.length;
  slides.style.transform = `translateX(-${idx * 100}%)`;
  makeDots();
}
next.addEventListener("click", () => go(idx + 1));
prev.addEventListener("click", () => go(idx - 1));
let auto = setInterval(() => go(idx + 1), 4500);
[next, prev, slides].forEach((el) => {
  el.addEventListener("mouseenter", () => clearInterval(auto));
  el.addEventListener(
    "mouseleave",
    () => (auto = setInterval(() => go(idx + 1), 4500))
  );
});
makeDots();

// -----------------------------
// CONTACT FORM (frontend only)
// -----------------------------
const form = document.getElementById("contactForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  if (!name || !email || !message) {
    alert("Please fill all fields.");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please use a valid email.");
    return;
  }
  const body = encodeURIComponent(message + `\n\n— ${name}`);
  location.href = `mailto:hello@example.com?subject=Portfolio%20Inquiry&body=${body}`;
});

// -----------------------------
// BACK TO TOP & YEAR
// -----------------------------
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) toTop.classList.add("show");
  else toTop.classList.remove("show");
});
toTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

document.getElementById("year").textContent = new Date().getFullYear();
