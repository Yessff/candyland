const nav = document.querySelector('.navbar');
const header = document.querySelector('.top-header');

    window.addEventListener('scroll', function(){
        nav.classList.toggle('active', window.scrollY > 0);
        header.classList.toggle('active', window.scrollY > 0);
    });



const menuButton = document.querySelector('.nav-links > li > a'); // Enlaza al menú
const dropdown = document.querySelector('.dropdown');
let isMenuOpen = false;

menuButton.addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el enlace funcione si no tiene que redirigir
    isMenuOpen = !isMenuOpen; // Alterna el estado de apertura
    dropdown.style.display = isMenuOpen ? 'block' : 'none'; // Muestra o esconde el menú
});


document.addEventListener('click', function(event) {
    if (!menuButton.contains(event.target) && !dropdown.contains(event.target)) {
        isMenuOpen = false; // Cierra el menú
        dropdown.style.display = 'none'; // Asegura que el menú esté cerrado
    }
});

