let token = "";

const loginForm = document.getElementById("loginForm");
const ticketForm = document.getElementById("ticketForm");
const cargarTickets = document.getElementById("cargarTickets");
const listaTickets = document.getElementById("listaTickets");
const loginMensaje = document.getElementById("loginMensaje");
const ticketMensaje = document.getElementById("ticketMensaje");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const respuesta = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      usuario: document.getElementById("usuario").value,
      password: document.getElementById("password").value
    })
  });

  const datos = await respuesta.json();

  if (respuesta.ok) {
    token = datos.token;
    loginMensaje.textContent = "Inicio de sesión correcto";
  } else {
    loginMensaje.textContent = datos.mensaje || "Acceso no autorizado";
  }
});

ticketForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const ticket = {
    nombreSolicitante: document.getElementById("nombreSolicitante").value,
    correo: document.getElementById("correo").value,
    categoria: document.getElementById("categoria").value,
    descripcion: document.getElementById("descripcion").value,
    impacto: document.getElementById("impacto").value,
    urgencia: document.getElementById("urgencia").value,
    tiempoEstimado: Number(document.getElementById("tiempoEstimado").value),
    estado: document.getElementById("estado").value
  };

  const respuesta = await fetch("/tickets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(ticket)
  });

  const datos = await respuesta.json();

  if (respuesta.ok) {
    ticketMensaje.textContent = `Ticket creado con prioridad ${datos.prioridad}`;
    ticketForm.reset();
    listarTickets();
  } else {
    ticketMensaje.textContent = datos.mensaje || (datos.errores ? datos.errores.join(", ") : "Error al crear ticket");
  }
});

cargarTickets.addEventListener("click", listarTickets);

async function listarTickets() {
  const respuesta = await fetch("/tickets");
  const tickets = await respuesta.json();

  listaTickets.innerHTML = "";

  tickets.forEach((ticket) => {
    const contenedor = document.createElement("div");
    contenedor.innerHTML = `
      <h3>${ticket.nombreSolicitante}</h3>
      <p><strong>ID:</strong> ${ticket.id}</p>
      <p><strong>Correo:</strong> ${ticket.correo}</p>
      <p><strong>Categoría:</strong> ${ticket.categoria}</p>
      <p><strong>Descripción:</strong> ${ticket.descripcion}</p>
      <p><strong>Impacto:</strong> ${ticket.impacto}</p>
      <p><strong>Urgencia:</strong> ${ticket.urgencia}</p>
      <p><strong>Tiempo estimado:</strong> ${ticket.tiempoEstimado} horas</p>
      <p><strong>Estado:</strong> ${ticket.estado}</p>
      <p><strong>Prioridad calculada:</strong> ${ticket.prioridad}</p>
      <button onclick="actualizarEstado('${ticket.id}', 'en proceso')">En proceso</button>
      <button onclick="actualizarEstado('${ticket.id}', 'resuelto')">Resuelto</button>
      <button onclick="eliminarTicket('${ticket.id}')">Eliminar</button>
      <hr>
    `;
    listaTickets.appendChild(contenedor);
  });
}

async function actualizarEstado(id, estado) {
  const respuesta = await fetch(`/tickets/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ estado })
  });

  if (respuesta.ok) {
    listarTickets();
  } else {
    const datos = await respuesta.json();
    alert(datos.mensaje || "Error al actualizar ticket");
  }
}

async function eliminarTicket(id) {
  const respuesta = await fetch(`/tickets/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (respuesta.ok) {
    listarTickets();
  } else {
    const datos = await respuesta.json();
    alert(datos.mensaje || "Error al eliminar ticket");
  }
}
