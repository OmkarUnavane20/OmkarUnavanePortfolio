(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var header = document.querySelector(".site-header");
  var scrollTicking = false;

  function updateScrollUi() {
    var scrollProgress = document.getElementById("scrollProgress");
    if (scrollProgress) {
      var scrollPx = document.documentElement.scrollTop;
      var winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      scrollProgress.style.transform = "scaleX(" + (winHeightPx > 0 ? scrollPx / winHeightPx : 0) + ")";
    }

    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 28);
    }
    var headerOffset = 96;
    var y = window.scrollY + headerOffset;
    var ids = ["work", "about", "contact"];
    var activeId = "";
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      if (el && el.offsetTop <= y) activeId = ids[i];
    }
    document.querySelectorAll('.site-nav a[href^="#"]').forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + activeId);
    });
    scrollTicking = false;
  }

  function onScroll() {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(updateScrollUi);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  updateScrollUi();

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var revealEls = document.querySelectorAll(".reveal");

  function initReveals() {
    if (reducedMotion.matches) {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    if (!("IntersectionObserver" in window) || !revealEls.length) {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.06 }
    );
    revealEls.forEach(function (el) {
      obs.observe(el);
    });
  }

  initReveals();

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
    }
  });

  // Mouse Glow logic
  var mouseGlow = document.createElement("div");
  mouseGlow.className = "mouse-glow";
  document.body.appendChild(mouseGlow);

  window.addEventListener("mousemove", function(e) {
    mouseGlow.style.transform = "translate(" + e.clientX + "px, " + e.clientY + "px)";
  }, { passive: true });

})();
