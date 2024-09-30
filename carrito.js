let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    const cartData = sessionStorage.getItem('cart'); // Cambiar localStorage por sessionStorage
    cart = cartData ? JSON.parse(cartData) : [];
    updateCartDisplay(); // Actualizar la visualización del carrito al cargar
    updateCartCount(cart.reduce((total, item) => total + item.quantity, 0)); // Actualizar contador al cargar

    // Event listeners para los botones "Agregar al Carrito"
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const name = button.getAttribute("data-name");
            const price = parseFloat(button.getAttribute("data-price"));
            const image = button.getAttribute("data-image");
            addToCart(name, price, image);
        });
    });
});


function addToCart(name, price, image) {
    const existingProductIndex = cart.findIndex(item => item.name === name);
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity++; // Si el producto ya existe, incrementar la cantidad
    } else {
        cart.push({ name, price, image, quantity: 1 }); // Si no existe, agregarlo al carrito
    }
    sessionStorage.setItem('cart', JSON.stringify(cart)); // Guardar el carrito en sessionStorage
    updateCartDisplay();
    updateCartCount(cart.reduce((total, item) => total + item.quantity, 0)); // Actualizar el contador
}


function updateCartDisplay() {
    const cartItemsContainer = document.querySelector("#cart-items tbody");
    if (!cartItemsContainer) return; // Verifica que el contenedor existe
    cartItemsContainer.innerHTML = ""; // Limpiar contenido existente
    let total = 0;

    cart.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" width="50"></td>
            <td>${item.name}</td>
            <td>Q${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>Q${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="remove-from-cart" data-index="${index}">Eliminar</button></td>
        `;
        cartItemsContainer.appendChild(tr);
        total += item.price * item.quantity;
    });

 
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `<td colspan="4">Total</td><td>Q${total.toFixed(2)}</td>`;
    cartItemsContainer.appendChild(totalRow);

    // Agregar event listeners para eliminar productos
    document.querySelectorAll(".remove-from-cart").forEach(button => {
        button.addEventListener("click", () => {
            const index = button.getAttribute("data-index");
            removeFromCart(index);
        });
    });
}


function removeFromCart(index) {
    cart.splice(index, 1); // Eliminar producto del carrito
    sessionStorage.setItem('cart', JSON.stringify(cart)); // Actualizar sessionStorage
    updateCartDisplay(); // Actualizar visualización
    updateCartCount(cart.reduce((total, item) => total + item.quantity, 0)); // Actualizar contador
}


function updateCartCount(count) {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.innerText = `(${count})`; // Actualizar el contador en la navbar
    }
}


function changeImage(button, direction) {
    const productImages = button.parentElement.querySelector('.product-images');
    const images = productImages.querySelectorAll('img');
    let currentIndex = Array.from(images).findIndex(img => img.style.opacity === '1');

    
    images[currentIndex].style.opacity = '0';
    
    currentIndex = (currentIndex + direction + images.length) % images.length;

   
    images[currentIndex].style.opacity = '1';
}



document.getElementById("checkout").addEventListener("click", () => {
    document.getElementById("checkout-modal").style.display = "block"; // Mostrar el modal
});

document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("checkout-modal").style.display = "none"; // Ocultar el modal
});


window.onclick = function(event) {
    const modal = document.getElementById("checkout-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};


document.getElementById("checkout-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Evitar el envío real para propósitos de demostración
    alert("Compra confirmada. ¡Gracias por tu compra!");
    document.getElementById("checkout-modal").style.display = "none"; // Ocultar el modal
});



document.getElementById("checkout-form").addEventListener("submit", () => {
    // Aquí puedes agregar cualquier lógica adicional para el proceso de pago

   
    clearCart();
});

function clearCart() {
    cart = []; // Reinicia el carrito
    sessionStorage.removeItem('cart'); // Elimina los datos del carrito en sessionStorage
    updateCartDisplay(); // Actualiza la visualización del carrito
    updateCartCount(0); // Actualiza el contador a cero
}
