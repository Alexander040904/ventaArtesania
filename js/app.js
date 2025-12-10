import { db, collection, getDocs, addDoc } from "./firebase.js";

window.addEventListener("DOMContentLoaded", () => {

const contenedor = document.getElementById("contenedor-artesanias");
const form = document.getElementById("form-artesania");

// 🔹 Obtener artesanías desde Firestore
async function obtenerArtesanias() {
  const ref = collection(db, "artesanias");
  const snapshot = await getDocs(ref);
  const artesanias = [];

  snapshot.forEach((doc) => {
    artesanias.push({ id: doc.id, ...doc.data() });
  });

  return artesanias;
}

// 🔹 Mostrar las tarjetas
function mostrarArtesanias(artesanias) {
  contenedor.innerHTML = "";
  artesanias.forEach((art) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4");
    card.innerHTML = `
      <div class="card shadow-sm h-100">
        <img src="${art.imagen}" class="card-img-top" alt="${art.nombre}">
        <div class="card-body">
          <h5 class="card-title">${art.nombre}</h5>
          <p class="card-text text-success fw-bold">$${art.precio} MXN</p>
          <p class="card-text"><i class="bi bi-envelope"></i> ${art.email}</p>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

// 🔹 Guardar nueva artesanía en Firestore
async function agregarArtesania(e) {
  e.preventDefault();

  const nueva = {
    nombre: form.nombre.value.trim(),
    precio: parseFloat(form.precio.value),
    email: form.email.value.trim(),
    imagen: form.imagen.value.trim(),
  };

  try {
    await addDoc(collection(db, "artesanias"), nueva);
    alert("✅ Artesanía agregada correctamente");

    form.reset();
    cargarArtesanias(); // Recargar lista
  } catch (err) {
    console.error("❌ Error al agregar:", err);
    alert("Error al guardar la artesanía");
  }
}

// 🔹 Cargar todo
async function cargarArtesanias() {
  const artesanias = await obtenerArtesanias();
  mostrarArtesanias(artesanias);
}

// Eventos
form.addEventListener("submit", agregarArtesania);
cargarArtesanias();
});

