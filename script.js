/* Om Shri Shyam Manpower Service
   Plain JavaScript. No libraries and no build step. */

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var WHATSAPP_NUMBER = "918700490277";

  var SERVICES = [
    { name: "Newborn & Baby Care", text: "Discuss everyday baby-care support.", tone: "pink", image: "Newborn & Baby Care.jpg" },
    { name: "Japa Maid", text: "Ask about post-delivery mother and baby support.", tone: "lilac", image: "Japa Maid.jpg" },
    { name: "Babysitter", text: "Explain childcare schedule and requirements.", tone: "blue", image: "Babysitter.jpg" },
    { name: "Maid & Housekeeping", text: "Enquire about household chores and cleaning.", tone: "mint", image: "Maid & Housekeeping.jpg" },
    { name: "Cook", text: "Discuss cooking needs, meal preferences and schedule.", tone: "cream", image: "cook.jpg" },
    { name: "Driver", text: "Ask about driver availability for daily or family travel.", tone: "blue", image: "Driver.jpg" },
    { name: "Pantry & Office Help", text: "Enquire about pantry and housekeeping support.", tone: "mint", image: "Pantry & Office Help.jpg" },
    { name: "Patient Care", text: "Discuss patient-attendant support requirements.", tone: "pink", image: "Patient Care.jpg" },
    { name: "Nursing Support", text: "Ask about home or hospital nursing; confirm qualifications.", tone: "lilac", image: "Nursing Support.jpg" }
  ];

  var FAQS = [
    ["Which areas do you serve?", "The office is in Sector 28, Gurugram. Contact us to confirm availability in your locality."],
    ["What staff can I enquire about?", "Newborn care, Japa maid, babysitter, maid, cook, driver, housekeeping, pantry, patient care and nursing."],
    ["How quickly can staff be arranged?", "Availability depends on the service and requirements. Ask about your preferred start date."],
    ["What are the service charges?", "Fees vary by service and arrangement. Confirm charges and payment terms before proceeding."],
    ["Do you verify staff identity and background?", "Ask which identity documents, references and background checks are completed."],
    ["Is a replacement available?", "Ask whether a replacement policy applies and request its conditions in writing."],
    ["Can I request live-in or part-time help?", "Share your preferred schedule and ask which arrangements are available."],
    ["Do you provide patient care at home and in hospitals?", "Patient care and nursing are listed services. Confirm the care type and staff qualifications."],
    ["How can I make an enquiry?", "Call Manoj Kumar at 8700490277 or use the WhatsApp button."],
    ["Can I visit your office?", "Shop No. 2, Manju Market, Sector 28, Gurugram. Confirm opening hours before visiting."]
  ];

  function $(selector, root) { return (root || document).querySelector(selector); }
  function $all(selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); }

  /* ---------- Build the service cards ---------- */
  var grid = $("#service-grid");
  SERVICES.forEach(function (item, i) {
    var card = document.createElement("article");
    card.className = "service-card tone-" + item.tone;
    card.dataset.index = String(i);
    card.classList.add("reveal");
    card.style.setProperty("--reveal-delay", (i % 3) * 70 + "ms");

    var top = document.createElement("div");
    top.className = "service-top";
    var num = document.createElement("span");
    num.className = "service-num";
    num.textContent = (i < 9 ? "0" : "") + (i + 1);
    var title = document.createElement("h3");
    title.textContent = item.name;
    top.appendChild(num);
    top.appendChild(title);

    var image = document.createElement("img");
    image.className = "service-image";
    image.src = "images/" + item.image;
    image.alt = item.name;
    image.loading = "lazy";

    var text = document.createElement("p");
    text.textContent = item.text;

    var button = document.createElement("button");
    button.type = "button";
    button.className = "service-cta";
    button.textContent = "Enquire about this service";
    button.addEventListener("click", function () { chooseService(i); });

    card.appendChild(image);
    card.appendChild(top);
    card.appendChild(text);
    card.appendChild(button);
    grid.appendChild(card);
  });

  /* ---------- Fill the service dropdowns ---------- */
  $all("[data-service-select]").forEach(function (select) {
    SERVICES.forEach(function (item, i) {
      var option = document.createElement("option");
      option.value = String(i);
      option.textContent = item.name;
      select.appendChild(option);
    });
    select.addEventListener("change", function () { setService(select.value, select); });
  });

  function setService(value, source) {
    $all("[data-service-select]").forEach(function (select) {
      if (select !== source) { select.value = value; }
    });
    $all(".service-card").forEach(function (card) {
      card.classList.toggle("is-selected", card.dataset.index === value);
    });
    updateWhatsAppLink();
  }

  function chooseService(index) {
    setService(String(index));
    $all("[data-service-select]").forEach(function (select) { select.value = String(index); });
    var form = $("#contact");
    if (form) { form.scrollIntoView({ behavior: "smooth", block: "start" }); }
    window.setTimeout(function () { $("#f-name").focus({ preventScroll: true }); }, 450);
  }

  /* ---------- FAQ accordion ---------- */
  var faqGrid = $("#faq-grid");
  FAQS.forEach(function (pair, i) {
    var item = document.createElement("div");
    item.className = "faq-item";
    item.classList.add("reveal");
    item.style.setProperty("--reveal-delay", (i % 2) * 60 + "ms");

    var button = document.createElement("button");
    button.type = "button";
    button.className = "faq-q";
    button.id = "faq-q-" + i;
    button.setAttribute("aria-expanded", i === 0 ? "true" : "false");
    button.setAttribute("aria-controls", "faq-a-" + i);
    var label = document.createElement("span");
    label.textContent = pair[0];
    var icon = document.createElement("span");
    icon.className = "faq-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = i === 0 ? "-" : "+";
    button.appendChild(label);
    button.appendChild(icon);

    var answer = document.createElement("div");
    answer.className = "faq-a";
    answer.id = "faq-a-" + i;
    answer.setAttribute("role", "region");
    answer.setAttribute("aria-labelledby", button.id);
    answer.textContent = pair[1];
    answer.hidden = i !== 0;

    button.addEventListener("click", function () {
      var open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", open ? "false" : "true");
      icon.textContent = open ? "+" : "-";
      answer.hidden = open;
    });

    item.appendChild(button);
    item.appendChild(answer);
    faqGrid.appendChild(item);
  });

  /* ---------- Mobile menu ---------- */
  var toggle = $(".nav-toggle");
  var nav = $("#site-nav");
  function closeMenu() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  $all("a", nav).forEach(function (link) { link.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (event) { if (event.key === "Escape") { closeMenu(); } });

  /* ---------- Highlight the current section in the menu ---------- */
  var sectionMap = { services: "services", process: "process", why: "why", faq: "faq", contact: "contact" };
  var navLinks = $all("[data-nav]");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
          });
        }

            });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(sectionMap).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { observer.observe(el); }
    });
  }

  /* ---------- Soft scroll reveals ---------- */
  $all(".steps .step, .why-card, .trust-card, .contact-card, .enquiry-card").forEach(function (item, i) {
    item.classList.add("reveal");
    item.style.setProperty("--reveal-delay", (i % 4) * 70 + "ms");
  });
  var revealItems = $all(".reveal");
  if ("IntersectionObserver" in window && revealItems.length) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  }
  function revealInViewport() {
    revealItems.forEach(function (item) {
      var bounds = item.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0) {
        item.classList.add("is-visible");
      }
    });
  }
  revealInViewport();
  window.addEventListener("scroll", revealInViewport, { passive: true });

  /* ---------- Forms ---------- */
  function cleanPhone(value) { return value.replace(/[\s\-()]/g, ""); }
  function validPhone(value) { return /^(\+?91)?[6-9]\d{9}$/.test(cleanPhone(value)); }

  function serviceName(select) {
    var index = Number(select.value);
    return select.value === "" || !SERVICES[index] ? "" : SERVICES[index].name;
  }

  function getFormData() {
    return {
      name: $("#f-name").value.trim(),
      phone: $("#f-phone").value.trim(),
      service: serviceName($("#f-service")),
      area: $("#f-area").value.trim(),
      schedule: $("#f-schedule").value,
      date: $("#f-date").value,
      details: $("#f-details").value.trim()
    };
  }

  function buildMessage() {
    var lines = ["Hello Manoj ji, I would like to enquire about a service from Om Shri Shyam Manpower Service."];
    var data = getFormData();
    if (data.name) { lines.push("Name: " + data.name); }
    if (data.phone) { lines.push("Phone: " + data.phone); }
    if (data.service) { lines.push("Service: " + data.service); }
    if (data.area) { lines.push("Locality: " + data.area); }
    if (data.schedule) { lines.push("Schedule: " + data.schedule); }
    if (data.date) { lines.push("Start date: " + data.date); }
    if (data.details) { lines.push("Details: " + data.details); }
    return lines.join("\n");
  }

  function updateWhatsAppLink() {
    $("#wa-continue").href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(buildMessage());
  }

  var form = $("#enquiry-form");
  $all("input, select, textarea", form).forEach(function (field) {
    field.addEventListener("input", updateWhatsAppLink);
    field.addEventListener("change", updateWhatsAppLink);
  });

  function setError(input, errorId, message) {
    var error = document.getElementById(errorId);
    error.textContent = message;
    if (message) { input.setAttribute("aria-invalid", "true"); } else { input.removeAttribute("aria-invalid"); }
  }

  var today = new Date();
  var iso = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");
  $("#f-date").min = iso;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var nameInput = $("#f-name");
    var phoneInput = $("#f-phone");
    var status = $("#form-status");
    var ok = true;

    setError(nameInput, "f-name-err", nameInput.value.trim() ? "" : "Please enter your name.");
    if (!nameInput.value.trim()) { ok = false; }

    var phoneMsg = "";
    if (!phoneInput.value.trim()) { phoneMsg = "Please enter your mobile number."; }
    else if (!validPhone(phoneInput.value)) { phoneMsg = "Enter a valid 10-digit mobile number."; }
    setError(phoneInput, "f-phone-err", phoneMsg);
    if (phoneMsg) { ok = false; }

    if (!ok) {
      status.className = "form-status is-error";
      status.textContent = "Please fix the highlighted fields.";
      (nameInput.getAttribute("aria-invalid") ? nameInput : phoneInput).focus();
      return;
    }

    /* This sample site has no server yet. To store enquiries, post the form
       data to a backend here, then show the message below on success. */
    status.className = "form-status is-ok";
    status.textContent = "Thank you. Your enquiry is ready. Tap Continue on WhatsApp to send it to Manoj Kumar.";
    form.dispatchEvent(new CustomEvent("enquiry:ready", { detail: getFormData() }));
    updateWhatsAppLink();
  });

  /* Quick strip at the top of the page: carries its details into the main form */
  $("#quick-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var phone = $("#q-phone");
    var msg = $("#quick-msg");
    if (!validPhone(phone.value)) {
      msg.style.color = "var(--maroon)";
      msg.textContent = "Please enter a valid 10-digit mobile number so we can call you back.";
      phone.setAttribute("aria-invalid", "true");
      phone.focus();
      return;
    }
    phone.removeAttribute("aria-invalid");
    $("#f-phone").value = phone.value.trim();
    $("#f-area").value = $("#q-area").value.trim();
    if ($("#q-service").value !== "") {
      $("#f-service").value = $("#q-service").value;
      setService($("#q-service").value, $("#q-service"));
    }
    msg.style.color = "var(--teal)";
    msg.textContent = "Thank you. Please add your name below and send your enquiry.";
    updateWhatsAppLink();
    $("#contact").scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(function () { $("#f-name").focus({ preventScroll: true }); }, 450);
  });

  updateWhatsAppLink();
})();
