// ⏰ Reloj en tiempo real
function actualizarReloj() {
  const ahora = new Date();
  const hora = ahora.toLocaleTimeString('es-CL');
  document.getElementById('reloj').textContent = hora;
}
setInterval(actualizarReloj, 1000);
actualizarReloj();

// 📥 Función para agregar artículos por sección (con formulario fijo)
function mostrarFormulario(tipo) {
  document.getElementById('formulario-noticia').classList.remove('d-none');
  document.getElementById('tipo-noticia').value = tipo;
  document.getElementById('formulario-noticia').scrollIntoView({ behavior: 'smooth' });
}

// 🚀 Lógica del formulario de nuevas noticias (común para general/deporte/negocios)
document.addEventListener('DOMContentLoaded', function () {
  const formNoticia = document.getElementById('form-noticia');
  if (formNoticia) {
    formNoticia.addEventListener('submit', function (e) {
      e.preventDefault();

      const tipo = document.getElementById('tipo-noticia').value;
      const titulo = document.getElementById('titulo').value.trim();
      const contenido = document.getElementById('contenido').value.trim();
      const imagen = document.getElementById('imagen').files[0];

      if (!titulo || !contenido || !imagen) {
        alert("Por favor completa todos los campos.");
        return;
      }

      const lector = new FileReader();
      lector.onload = function () {
        const nuevaCard = document.createElement('div');
        nuevaCard.className = 'col-md-4 mb-4';
        nuevaCard.innerHTML = `
          <div class="card h-100">
            <img src="${lector.result}" class="card-img-top" alt="Noticia">
            <div class="card-body">
              <h6 class="text-muted">${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h6>
              <h5 class="card-title">${titulo}</h5>
              <p class="card-text">${contenido}</p>
              <a href="#" class="btn btn-outline-dark btn-sm mt-3 disabled">Leer más</a>
            </div>
          </div>`;
        
         const contenedor = document.getElementById(`contenedor-${tipo}`);
    contenedor.appendChild(nuevaCard);

    formNoticia.reset();
    document.getElementById('formulario-noticia').classList.add('d-none');

    actualizarContador(tipo);
  };
  alert("¡La noticia ha sido agregada correctamente!");

  lector.readAsDataURL(imagen);
});
 }
});

// Iniciar contadores al cargar
document.addEventListener('DOMContentLoaded', function () {
  actualizarContador('general');
  actualizarContador('deporte');
  actualizarContador('negocios');
});

// Contador de artículos
function actualizarContador(tipo) {
  const contenedor = document.getElementById(`contenedor-${tipo}`);
  const contador = document.getElementById(`contador-${tipo}`);

  if (contenedor && contador) {
    const cantidad = contenedor.querySelectorAll('.card').length;
    contador.textContent = cantidad;
  }
}

// 📥 Contacto
const formContacto = document.getElementById('formulario-contacto');
if (formContacto) {
  formContacto.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !mensaje) {
      alert("Por favor completa todos los campos.");
      return;
    }

    alert(`¡Gracias, ${nombre}! Tu mensaje ha sido enviado correctamente.`);
    this.reset();
  });
}