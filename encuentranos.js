function mostrarMensaje(event) {
    event.preventDefault(); 
    const nombre = document.getElementById('name').value;
    const mensajeDiv = document.createElement('div');
    mensajeDiv.innerHTML = `<p>Mensaje enviado, Nos contactaremos lo antes posible.</p>`;
    mensajeDiv.style.color = 'green'; 
    mensajeDiv.style.marginTop = '10px';
    document.getElementById('contacto').appendChild(mensajeDiv); 
  
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
}
