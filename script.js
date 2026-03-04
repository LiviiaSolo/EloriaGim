// Mobilne menu
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const toggleIcon = navToggle.querySelector('i');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show-menu');

    if(navMenu.classList.contains('show-menu')){
        toggleIcon.classList.remove('ri-menu-line');
        toggleIcon.classList.add('ri-close-line');
    } else {
        toggleIcon.classList.remove('ri-close-line');
        toggleIcon.classList.add('ri-menu-line');
    }
});

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        toggleIcon.classList.remove('ri-close-line');
        toggleIcon.classList.add('ri-menu-line');
    });
});



// bmi Calculator

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



// scroll Animations

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.3
});

observer.observe(document.querySelector('.home__data'));
observer.observe(document.querySelector('.home__images'));

document.querySelectorAll('.home__triangle').forEach(triangle => {
    observer.observe(triangle);
});
