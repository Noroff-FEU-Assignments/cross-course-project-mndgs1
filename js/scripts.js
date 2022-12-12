const menuBars = document.querySelector(".header__hamburger");

menuBars.addEventListener("click", (e) => {
    const nav = document.querySelector("nav");

    if (menuBars.innerHTML === `<i class="fa-solid fa-x fa-2x"></i>`) {
        menuBars.innerHTML = `<i class="fa-solid fa-bars fa-2x">`;
        nav.style.display = "none";
    } else {
        menuBars.innerHTML = `<i class="fa-solid fa-x fa-2x"></i>`;
        nav.style.display = "block";
    }
});
