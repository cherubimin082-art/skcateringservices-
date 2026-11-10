document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  var WHATSAPP_NUMBER = "919382292609";

  var form = document.getElementById("inquiry-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");

      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var email = form.email.value.trim();
      var eventType = form["event-type"].value;
      var eventDate = form["event-date"].value;
      var guests = form.guests.value.trim();
      var message = form.message.value.trim();

      var lines = [
        "New Inquiry - S.K. Catering Services & Events",
        "Name: " + name,
        "Phone: " + phone
      ];
      if (email) lines.push("Email: " + email);
      lines.push("Event Type: " + eventType);
      if (eventDate) lines.push("Event Date: " + eventDate);
      if (guests) lines.push("Guests: " + guests);
      if (message) lines.push("Message: " + message);

      var text = encodeURIComponent(lines.join("\n"));
      var waUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;

      status.textContent = "Redirecting you to WhatsApp to send your inquiry...";
      status.style.color = "#2e7d32";

      window.open(waUrl, "_blank");
      form.reset();
    });
  }

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Header gains a shadow once the page scrolls
  var header = document.querySelector("header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Scroll-reveal animation for sections, cards, etc.
  var revealTargets = document.querySelectorAll(
    ".section-title, .card, .testimonial, .showcase, .about-content, .contact-wrap > div, .gallery-grid"
  );
  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  // Animated count-up for stats (About page)
  var statNumbers = document.querySelectorAll(".stats strong");
  if (statNumbers.length && "IntersectionObserver" in window) {
    var animateCount = function (el) {
      var raw = el.textContent.trim();
      var match = raw.match(/[\d.]+/);
      if (!match) return;
      var target = parseFloat(match[0]);
      var suffix = raw.replace(match[0], "");
      var duration = 1200;
      var start = null;

      var step = function (timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var value = Math.floor(progress * target);
        el.textContent = value + suffix;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = target + suffix;
        }
      };
      window.requestAnimationFrame(step);
    };

    var statObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statNumbers.forEach(function (el) {
      statObserver.observe(el);
    });
  }

  // Button ripple effect
  document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement("span");
      var size = Math.max(rect.width, rect.height);
      ripple.className = "btn-ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
      ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
      btn.appendChild(ripple);
      window.setTimeout(function () {
        ripple.remove();
      }, 650);
    });
  });
});
