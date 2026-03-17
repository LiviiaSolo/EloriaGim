console.log("JS loaded");

//  Mobile menu 
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const toggleIcon = navToggle.querySelector('i');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show-menu');
    toggleIcon.classList.toggle('ri-menu-line');
    toggleIcon.classList.toggle('ri-close-line');
});

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        toggleIcon.classList.remove('ri-close-line');
        toggleIcon.classList.add('ri-menu-line');
    });
});

//  BMI Calculator 
const form = document.getElementById("bmi-form");
const weightInput = document.getElementById("bmi-weight");
const heightInput = document.getElementById("bmi-height");
const result = document.getElementById("bmi-result");
const button = form.querySelector(".bmi__button");
let calculated = false;

form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (calculated) {
        form.reset();
        result.textContent = "";
        button.innerHTML = 'Vypočítať <i class="ri-arrow-right-line"></i>';
        calculated = false;
        return;
    }
    const weight = weightInput.value;
    const height = heightInput.value / 100;
    if (!weight || !height) {
        result.textContent = "Prosím, zadajte obe hodnoty.";
        return;
    }
    const bmi = (weight / (height * height)).toFixed(1);
    result.textContent = "Váš BMI: " + bmi;
    button.textContent = "Vymazať";
    calculated = true;
});



// ================= PROGRAM DATA =================
const programData = {
  flex: {
    title: "Flex Muscle",
    duration: "45 min",
    difficulty: "Intermediate",
    intensity: "Medium",
    trainer: { name: "Adrian Valen", photo: "images/trainers/adrian.png" },
    pricing: [200, 350, 500]
  },
  cardio: {
    title: "Cardio Exercise",
    duration: "30 min",
    difficulty: "Beginner–Intermediate",
    intensity: "High",
    trainer: { name: "Lia Marková", photo: "images/trainers/lia.png" },
    pricing: [150, 300, 450]
  },
  yoga: {
    title: "Basic Yoga",
    duration: "60 min",
    difficulty: "Beginner",
    intensity: "Low",
    trainer: { name: "Elena Schneider", photo: "images/trainers/elena.png" },
    pricing: [140, 200, 350]
  },
  weight: {
    title: "Weight Lifting",
    duration: "50 min",
    difficulty: "Advanced",
    intensity: "High",
    trainer: { name: "Dorian Kral", photo: "images/trainers/dorian.png" },
    pricing: [200, 330, 460]
  }
};

let selectedProgram = null;

// ================= UPDATE PRICING =================
function updatePricing(program) {
  const pricingCards = document.querySelectorAll(".pricing__card");

  pricingCards.forEach((card, i) => {
    card.querySelector(".pricing__number").textContent =
      program.pricing[i] + " €";

    card.classList.remove("pricing__card-active");
  });

  document.querySelector(".pricing .section__title").textContent =
    `Packages for ${program.title}`;
}

// ================= SELECT PROGRAM =================
document.querySelectorAll(".program__select").forEach(btn => {
  btn.addEventListener("click", () => {

    // reset all buttons
    document.querySelectorAll(".program__select").forEach(b => {
      b.innerHTML = 'Vybrať program <i class="ri-arrow-right-line"></i>';
    });

    // current button active
    btn.textContent = "Selected ✓";

    const card = btn.closest(".program__card");
    const key = card.dataset.program;

    selectedProgram = programData[key];

    // scroll to pricing
    document.getElementById("pricing").scrollIntoView({
      behavior: "smooth"
    });

    updatePricing(selectedProgram);
  });
});

// ================= MODAL =================
const purchaseModal = document.getElementById("purchaseModal");
const purchaseProgramTitle = document.getElementById("purchaseProgramTitle");
const purchasePackageTitle = document.getElementById("purchasePackageTitle");
const purchasePrice = document.getElementById("purchasePrice");
const confirmPurchase = document.getElementById("confirmPurchase");

// ================= BUY BUTTON =================
document.querySelectorAll(".pricing__buy").forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();

    const card = this.closest(".pricing__card");
    const packageIndex = parseInt(this.dataset.package);

    // ak vybraný program
    if (selectedProgram) {
      purchaseProgramTitle.textContent = selectedProgram.title;
      purchasePrice.textContent =
        "Cena: " + selectedProgram.pricing[packageIndex] + " €";
    } 
    // ak NIE JE vybraná
    else {
      purchaseProgramTitle.textContent = "Vlastný tréning";
      purchasePrice.textContent =
        card.querySelector(".pricing__number").textContent;
    }

    // názov balíka
    purchasePackageTitle.textContent =
      card.querySelector(".pricing__title").textContent;

    // otvorené modálne okno
    purchaseModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
});

// ================= CLOSE MODAL =================
purchaseModal.querySelector(".modal__close").onclick = () => {
  purchaseModal.style.display = "none";
  document.body.style.overflow = "auto";
};

window.addEventListener("click", e => {
  if (e.target === purchaseModal) {
    purchaseModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    purchaseModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// ================= CONFIRM PURCHASE =================
confirmPurchase.addEventListener("click", () => {

  alert("Platba úspešná");

  // zatvoriť modálne okno
  purchaseModal.style.display = "none";
  document.body.style.overflow = "auto";

  // resetovať program
  selectedProgram = null;

  // tlačidlá návratu
  document.querySelectorAll(".program__select").forEach(btn => {
    btn.innerHTML = 'Vybrať program <i class="ri-arrow-right-line"></i>';
  });
});

