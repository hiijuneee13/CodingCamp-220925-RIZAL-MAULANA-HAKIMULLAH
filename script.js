
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 50);
});

(function () {
  // Utilities
  function $(sel) { return document.querySelector(sel); }
  function $all(sel) { return Array.from(document.querySelectorAll(sel)); }

  // Year in footer
  const yearEls = $all('#year, #year2');
  yearEls.forEach(e => e && (e.textContent = new Date().getFullYear()));

  // LocalStorage Name
  function getStoredName() { return localStorage.getItem('rv_userName') || ''; }
  function setStoredName(name) {
    localStorage.setItem('rv_userName', name || '');
    applyNameToPage();
  }

  // Typing Effect tanpa cursor
  function typeWriter(el, text, speed = 60, callback) {
    if (!el) return;
    el.textContent = "";

    let i = 0;
    function typing() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else if (callback) {
        callback();
      }
    }
    typing();
  }

  // ===== Apply Name + Typing untuk semua halaman =====
  function applyNameToPage() {
    const name = getStoredName();

    // ===== Index.html Banner =====
    const greetingEl = $('#greeting');
    const greetingSub = $('#greeting-sub');
    if (greetingEl) {
      typeWriter(greetingEl, name ? `Hai ${name}, Welcome To Website` : "Hai, Welcome To Website", 70);
    }
    if (greetingSub) {
      typeWriter(greetingSub, name ? `Senang bertemu denganmu, ${name}.` : "Selamat datang! Ini adalah website latihan.", 40);
    }

    // ===== Profil Banner =====
    const profileGreeting = $('#profileGreeting');
    const profileSub = $('#profileSub'); // buat <p id="profileSub">
    if (profileGreeting) {
      typeWriter(profileGreeting, name ? `Profil — ${name}` : 'Profil Perusahaan', 70);
    }
    if (profileSub) {
      typeWriter(profileSub, "Situs profil perusahaan contoh — dibuat untuk tugas.", 50);
    }

    // ===== Portofolio Banner =====
    const portfolioGreeting = $('#portfolioGreeting');
    const portfolioSub = $('#portfolioSub'); // buat <p id="portfolioSub">
    if (portfolioGreeting) {
      typeWriter(portfolioGreeting, name ? `Portofolio Kami — ${name}` : 'Portofolio Kami', 70);
    }
    if (portfolioSub) {
      typeWriter(portfolioSub, "Kumpulan project dan karya yang telah kami buat.", 50);
    }
  }

  // Escape HTML
  function escapeHtml(str) {
    return String(str).replace(/[&<>"'`=\/]/g, s => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
      '/': '&#x2F;', '`': '&#x60;', '=': '&#61;'
    }[s]));
  }

  // === Modal Edit Nama ===
  const editBtn = $('#editNameBtn');
  const modal = $('#nameModal');
  const nameInput = $('#nameInput');
  const saveNameBtn = $('#saveNameBtn');
  const closeModalBtn = $('#closeModalBtn');

  if (editBtn && modal) {
    editBtn.addEventListener("click", () => {
      modal.classList.add("show");
      if (nameInput) nameInput.value = getStoredName() || "";
      if (nameInput) nameInput.focus();
    });
  }
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => modal.classList.remove("show"));
  }
  if (saveNameBtn) {
    saveNameBtn.addEventListener("click", () => {
      const newName = nameInput.value.trim();
      if (newName) setStoredName(newName);
      modal.classList.remove("show");
    });
  }

  // === Profil Save Name ===
  const profileSaveBtn = $('#profileSaveBtn');
  if (profileSaveBtn) {
    profileSaveBtn.addEventListener('click', function () {
      const input = $('#profileNameInput');
      const v = input && input.value ? input.value.trim() : '';
      setStoredName(v);
      input.value = v;
      profileSaveBtn.textContent = 'Tersimpan ✓';
      setTimeout(() => profileSaveBtn.textContent = 'Simpan', 1200);
    });

    const stored = getStoredName();
    if (stored && $('#profileNameInput')) $('#profileNameInput').value = stored;
  }

  // === Form Validation ===
  const form = $('#messageForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const date = form.querySelector('#date').value;
      const gender = (form.querySelector('input[name="gender"]:checked') || {}).value || '';
      const message = form.querySelector('#message').value.trim();

      const errors = [];
      if (!name) errors.push('Nama wajib diisi.');
      if (!message) errors.push('Pesan tidak boleh kosong.');
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Email tidak valid.');

      const errorsEl = $('#formErrors');
      if (errors.length) {
        errorsEl.innerHTML = errors.map(e => `<div>• ${escapeHtml(e)}</div>`).join('');
        return;
      } else {
        errorsEl.textContent = '';
      }

      const resultEl = $('#submissionResult');
      resultEl.textContent =
        `Nama    : ${escapeHtml(name)}
Email   : ${escapeHtml(email || '-')}
Tanggal : ${escapeHtml(date || '-')}
Gender  : ${escapeHtml(gender || '-')}
Pesan   : ${escapeHtml(message)}`;

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Terkirim ✓';
      setTimeout(() => submitBtn.textContent = 'Submit', 1200);

      if (name) setStoredName(name);
    });
  }

  // Init applyNameToPage
  document.addEventListener('DOMContentLoaded', applyNameToPage);

  // === Particles ===
  if (document.querySelector('#particles-js')) {
    particlesJS("particles-js", {
      "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#0ea5a4" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.6, "random": true },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#0ea5a4", "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 3 }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } },
        "modes": {
          "grab": { "distance": 200, "line_linked": { "opacity": 0.6 } },
          "push": { "particles_nb": 4 }
        }
      },
      "retina_detect": true
    });
  }

  // === Fade-in Scroll ===
  const fadeEls = document.querySelectorAll('.fade-in');
  const onScroll = () => {
    fadeEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('visible');
      }
    });
  };
  window.addEventListener('scroll', onScroll);
  onScroll();
})();

// =====================
// Smooth Page Transition + Logo Bounce
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const transition = document.querySelector(".page-transition");
  const logo = document.querySelector(".logo");

  if (transition) {
    setTimeout(() => transition.classList.remove("active"), 300);

    document.querySelectorAll("a.nav-link").forEach(link => {
      link.addEventListener("click", e => {
        const href = link.getAttribute("href");
        if (href.startsWith("#")) return;

        if (href.includes("index.html") || href.includes("profil.html") || href.includes("portofolio.html")) {
          e.preventDefault();
          transition.classList.add("active");

          if (logo) {
            logo.classList.remove("logo-bounce");
            void logo.offsetWidth;
            logo.classList.add("logo-bounce");
          }

          document.querySelectorAll(".nav-link").forEach(n => n.classList.remove("active"));
          link.classList.add("active");

          setTimeout(() => {
            window.location.href = href;
          }, 600);
        }
      });
    });
  }
});

// Scroll Reveal
const revealElements = document.querySelectorAll(".reveal, .fade-in");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealElements.forEach(el => observer.observe(el));

// Smooth Scroll for anchors
document.addEventListener("DOMContentLoaded", () => {
  const transitionEl = document.querySelector(".page-transition");
  const links = document.querySelectorAll("a.nav-link");

  if (transitionEl) {
    setTimeout(() => {
      transitionEl.classList.remove("active");
    }, 300);
  }

  links.forEach(link => {
    link.addEventListener("click", e => {
      const target = link.getAttribute("href");

      if (target.startsWith("#")) {
        e.preventDefault();
        const section = document.querySelector(target);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }

      e.preventDefault();
      transitionEl.classList.add("active");
      setTimeout(() => {
        window.location.href = target;
      }, 500);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".portfolio-grid .card");
  const footer = document.querySelector(".site-footer");
  let lastScrollY = window.scrollY;
  const footerAnimatedFlags = {}; // key = filter, value = true jika sudah animasi

  // --- Tampilkan semua card otomatis dengan stagger ---
  cards.forEach((card, i) => {
    card.style.display = "block";
    setTimeout(() => card.classList.add("visible"), i * 150);
  });

  // --- Filter Button ---
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        card.classList.remove("visible");
        setTimeout(() => {
          if (filter === "all" || card.classList.contains(filter)) {
            card.style.display = "block";
            setTimeout(() => card.classList.add("visible"), 50);
          } else {
            card.style.display = "none";
          }
        }, 200);
      });

      // --- Footer animasi sekali per filter ---
      if (!footerAnimatedFlags[filter]) {
        footer.style.display = "block";
        footer.style.opacity = "0";
        footer.style.transform = "translateY(30px)";
        footer.style.transition = "transform 0.6s ease, opacity 0.6s ease";
        setTimeout(() => {
          footer.style.opacity = "1";
          footer.style.transform = "translateY(0)";
        }, 100);
        footerAnimatedFlags[filter] = true; // tandai footer sudah animasi untuk filter ini
      }
    });
  });

  // --- Scroll Reveal untuk card ---
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < triggerBottom) {
        card.classList.add("visible");
      } else {
        card.classList.remove("visible");
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // --- Footer smooth animation saat scroll ---
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollY) {
      footer.style.transform = "translateY(20px)";
      footer.style.opacity = "0.85";
    } else {
      footer.style.transform = "translateY(0)";
      footer.style.opacity = "1";
    }

    lastScrollY = currentScroll;
  });
});



// Headquarter Animations
document.addEventListener("DOMContentLoaded", () => {
  const hqSection = document.querySelector('.headquarter');
  const hqItems = document.querySelectorAll('.hq-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        hqSection.classList.remove('hq-exit');
        hqSection.classList.add('hq-enter');

        hqItems.forEach((item, index) => {
          item.classList.remove('hq-item-exit');
          setTimeout(() => {
            item.classList.add('hq-item-enter');
          }, index * 150);
        });
      } else {
        hqSection.classList.remove('hq-enter');
        hqSection.classList.add('hq-exit');

        hqItems.forEach((item, index) => {
          item.classList.remove('hq-item-enter');
          setTimeout(() => {
            item.classList.add('hq-item-exit');
          }, index * 100);
        });
      }
    });
  }, { threshold: 0.3 });

  if (hqSection) observer.observe(hqSection);
});

// Vision & Mission Animations
document.addEventListener("DOMContentLoaded", () => {
  const vmSection = document.querySelector('.vision-mission');
  const vmItems = document.querySelectorAll('.vm-card');

  if (!vmSection || vmItems.length === 0) return;

  const vmObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        vmSection.classList.add('visible');

        vmItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('visible');
          }, index * 150);
        });

        observer.unobserve(entry.target); // animasi muncul sekali saja
      }
    });
  }, { threshold: 0.2 });

  vmObserver.observe(vmSection);
});


// visi text
document.addEventListener("DOMContentLoaded", () => {
  const visionEl = document.querySelector('#visionText');
  if (!visionEl) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visionEl.classList.add('visible');
    });
  }, { threshold: 0.3 });

  observer.observe(visionEl);
});


// misi text
function typeWriter(el, text, speed = 40, callback) {
  if (!el) return;
  el.textContent = '';
  let i = 0;
  function typing() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if (callback) callback();
  }
  typing();
}

// Typing effect untuk visi & misi saat section terlihat
document.addEventListener("DOMContentLoaded", () => {
  const vmSection = document.querySelector('.vision-mission');
  const visionEl = document.querySelector('#visionText');
  const missionItems = document.querySelectorAll('#missionList li');

  if (!vmSection || !visionEl || missionItems.length === 0) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Visi typing
        typeWriter(visionEl, visionEl.textContent, 50, () => {
          // Setelah visi selesai, munculkan tiap misi
          missionItems.forEach((li, index) => {
            setTimeout(() => {
              li.classList.add('visible');
            }, index * 400);
          });
        });
        observer.unobserve(vmSection);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(vmSection);
});

// about perusahaan
document.addEventListener("DOMContentLoaded", () => {
  const aboutCard = document.querySelector('.about-card');
  if (!aboutCard) return;

  const header = aboutCard.querySelector('h2');
  const paragraphs = aboutCard.querySelectorAll('p');

  // Simpan teks asli di data-text
  header.dataset.text = header.textContent;
  paragraphs.forEach(p => p.dataset.text = p.textContent);

  // Kosongkan teks awal
  header.textContent = '';
  paragraphs.forEach(p => p.textContent = '');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Typing untuk header
        typeWriter(header, header.dataset.text, 50, () => {
          // Setelah header selesai, typing tiap paragraph berurutan
          let delay = 0;
          paragraphs.forEach((p) => {
            setTimeout(() => {
              typeWriter(p, p.dataset.text, 30);
            }, delay);
            delay += p.dataset.text.length * 30 + 200; // waktu sesuai panjang teks
          });
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(aboutCard);
});

// Fungsi typeWriter
function typeWriter(el, text, speed = 50, callback) {
  if (!el) return;
  el.textContent = '';
  let i = 0;
  function typing() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if (callback) callback();
  }
  typing();
}

// Smooth appear for Profile Settings Card
document.addEventListener("DOMContentLoaded", () => {
  const profileCard = document.querySelector('.profile-settings-card');
  if (!profileCard) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        profileCard.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(profileCard);
});

// animasi scroll profil kami
document.addEventListener("DOMContentLoaded", () => {

  function revealInOut(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          if (options.staggerChildren) {
            Array.from(el.children).forEach((child, i) => {
              setTimeout(() => child.classList.add('visible'), i * (options.staggerDelay || 150));
            });
          }
          el.classList.add('visible');
        } else {
          if (options.staggerChildren) {
            Array.from(el.children).forEach((child, i) => {
              setTimeout(() => child.classList.remove('visible'), i * (options.staggerDelay || 150));
            });
          }
          el.classList.remove('visible');
        }
      });
    }, { threshold: options.threshold || 0.2 });

    elements.forEach(el => observer.observe(el));
  }

  // About section
  revealInOut('.about-card', { staggerChildren: true, staggerDelay: 200 });
  revealInOut('.profile-settings-card', { staggerChildren: true, staggerDelay: 300 });

  // Vision & Mission section
  revealInOut('.vision-mission.reveal', { threshold: 0.2 });
  revealInOut('.vm-card', { staggerChildren: true, staggerDelay: 150 });
  revealInOut('#visionText');
  document.querySelectorAll('#missionList li').forEach(li => revealInOut(li));

});

// Shortcut Message Us dari halaman lain
document.addEventListener("DOMContentLoaded", () => {
  const messageLink = document.querySelector('a.nav-link[href="#contact"]');

  if (messageLink) {
    messageLink.addEventListener('click', e => {
      e.preventDefault();

      // Jika sudah di index.html, scroll langsung
      if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        const section = document.querySelector('#contact');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Kalau di halaman lain, redirect ke index.html#contact
        window.location.href = 'index.html#contact';
      }
    });
  }

  // Jika halaman dibuka dengan hash #contact, scroll otomatis
  if (window.location.hash === '#contact') {
    const section = document.querySelector('#contact');
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100); // delay kecil biar halaman load dulu
    }
  }
});

// ===== Page Transition Overlay =====
const pageTransition = document.createElement('div');
pageTransition.classList.add('page-transition');
document.body.appendChild(pageTransition);

// Fungsi scroll smooth ke target
function smoothScrollTo(hash) {
  const target = document.querySelector(hash);
  if (target) target.scrollIntoView({ behavior: "smooth" });
}

// Tambahkan listener ke semua nav-link
document.querySelectorAll("a.nav-link").forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");

    // Jika link adalah anchor (#...) di halaman Home
    if (href.startsWith("#")) {
      e.preventDefault();

      if (window.location.pathname.endsWith("index.html")) {
        // USER DI HOME → scroll langsung
        smoothScrollTo(href);
      } else {
        // USER DI HALAMAN LAIN → animasi overlay + redirect
        pageTransition.classList.add('active');
        const targetAnchor = href;
        setTimeout(() => {
          window.location.href = `index.html${targetAnchor}`;
        }, 550); // durasi sama dengan overlay CSS
      }
    }
  });
});

// Fade-in content on load
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fade-in-content").forEach(el => {
    el.classList.add("visible");
  });
  pageTransition.classList.remove('active');
});

// Optional: subtle parallax
window.addEventListener("scroll", () => {
  document.querySelectorAll(".parallax").forEach(el => {
    el.style.transform = `translateY(-${window.scrollY * 0.03}px)`;
  });
});

