const nav = document.querySelector('.navbar');
const header = document.querySelector('.top-header');

    window.addEventListener('scroll', function(){
        nav.classList.toggle('active', window.scrollY > 0);
        header.classList.toggle('active', window.scrollY > 0);
    });



const menuButton = document.querySelector('.nav-links > li > a');
const dropdown = document.querySelector('.dropdown');
let isMenuOpen = false;

menuButton.addEventListener('click', function(event) {
    event.preventDefault(); 
    isMenuOpen = !isMenuOpen; 
    dropdown.style.display = isMenuOpen ? 'block' : 'none'; 
});


document.addEventListener('click', function(event) {
    if (!menuButton.contains(event.target) && !dropdown.contains(event.target)) {
        isMenuOpen = false; 
        dropdown.style.display = 'none'; 
    }
});

