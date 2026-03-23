const menuBtn = document.getElementById("menuBtn");
const siteNav = document.getElementById("siteNav");
const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");
const revealElements = document.querySelectorAll(".reveal");
const filterButtons = document.querySelectorAll(".filter-btn");
const hairCards = document.querySelectorAll(".hair-card");
const styleModal = document.getElementById("styleModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const detailButtons = document.querySelectorAll(".detail-btn");

if (menuBtn && siteNav) {
  menuBtn.addEventListener("click", () => {
    siteNav.classList.toggle("open");
  });
}

if (bookingForm && bookingMessage) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const payload = Object.fromEntries(formData.entries());
    localStorage.setItem("salonBooking", JSON.stringify(payload));

    bookingMessage.textContent = `Thank you, ${payload.fullName}. Your appointment request is received. We will contact you shortly.`;
    bookingForm.reset();
  });
}

if (filterButtons.length > 0 && hairCards.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";

      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      hairCards.forEach((card) => {
        const matches = filter === "all" || card.dataset.length === filter;
        card.style.display = matches ? "block" : "none";
      });
    });
  });
}

if (styleModal && modalClose && modalTitle && modalText && detailButtons.length > 0) {
  const details = {
    "Layer Cut": "Best for long hair with soft volume. Works beautifully with blow dry styling.",
    "Step Cut": "Creates visible levels and texture. Great for thick and medium-to-long hair.",
    "Bob Cut": "A polished short style that frames the jawline with elegance and easy maintenance.",
    "Pixie Cut": "A bold short style, perfect for sharp facial features and modern looks.",
    "U Cut": "Rounded shape at the back for fullness while keeping long length graceful.",
    "V Cut": "Pointed finish at the back, ideal for sleek long hair with dramatic flow.",
    "Feather Cut": "Light feathered ends for movement and bounce with a natural finish.",
    "Straight Cut": "Minimal and classic one-length look, ideal for neat and healthy ends.",
    "Curly Hair Cut": "Specialized shape-by-curl technique for better curl definition and balance.",
    "Bangs / Fringe Cut": "Face-framing fringe options including curtain, side-swept, and blunt styles.",
  };

  detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const styleName = button.dataset.style || "Style";
      modalTitle.textContent = styleName;
      modalText.textContent = details[styleName] || "A premium style tailored to your hair type and face shape.";
      styleModal.classList.add("open");
      styleModal.setAttribute("aria-hidden", "false");
    });
  });

  modalClose.addEventListener("click", () => {
    styleModal.classList.remove("open");
    styleModal.setAttribute("aria-hidden", "true");
  });

  styleModal.addEventListener("click", (event) => {
    if (event.target === styleModal) {
      styleModal.classList.remove("open");
      styleModal.setAttribute("aria-hidden", "true");
    }
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

revealElements.forEach((item) => revealObserver.observe(item));
