const fs = require("fs");
const path = require("path");

const ticketsPath = path.join(__dirname, "../data/tickets.json");

function leerTickets() {
  const datos = fs.readFileSync(ticketsPath, "utf8");
  return JSON.parse(datos);
}

function guardarTickets(tickets) {
  fs.writeFileSync(ticketsPath, JSON.stringify(tickets, null, 2));
}

function calcularPrioridad(ticket) {
  const puntajeImpacto = {
    bajo: 1,
    medio: 2,
    alto: 3
  };

  const puntajeUrgencia = {
    baja: 1,
    media: 2,
    alta: 3
  };

  const impacto = puntajeImpacto[ticket.impacto];
  const urgencia = puntajeUrgencia[ticket.urgencia];
  const bonusCategoria = ticket.categoria === "red" || ticket.categoria === "cuenta" ? 1 : 0;
  const bonusTiempo = Number(ticket.tiempoEstimado) > 4 ? 1 : 0;
  const puntajeTotal = impacto + urgencia + bonusCategoria + bonusTiempo;

  if (puntajeTotal <= 3) return "Baja";
  if (puntajeTotal <= 5) return "Media";
  if (puntajeTotal === 6) return "Alta";
  return "Crítica";
}

function listarTickets() {
  return leerTickets();
}

function obtenerTicketPorId(id) {
  const tickets = leerTickets();
  return tickets.find((ticket) => ticket.id === id);
}

function crearTicket(datos) {
  const tickets = leerTickets();

  const nuevoTicket = {
    id: Date.now().toString(),
    nombreSolicitante: datos.nombreSolicitante,
    correo: datos.correo,
    categoria: datos.categoria,
    descripcion: datos.descripcion,
    impacto: datos.impacto,
    urgencia: datos.urgencia,
    tiempoEstimado: Number(datos.tiempoEstimado),
    estado: datos.estado || "pendiente",
    prioridad: "",
    fechaCreacion: new Date().toISOString()
  };

  nuevoTicket.prioridad = calcularPrioridad(nuevoTicket);
  tickets.push(nuevoTicket);
  guardarTickets(tickets);

  return nuevoTicket;
}

function actualizarTicket(id, datos) {
  const tickets = leerTickets();
  const index = tickets.findIndex((ticket) => ticket.id === id);

  if (index === -1) {
    return null;
  }

  const ticketActualizado = {
    ...tickets[index],
    ...datos
  };

  if (datos.tiempoEstimado !== undefined) {
    ticketActualizado.tiempoEstimado = Number(datos.tiempoEstimado);
  }

  ticketActualizado.prioridad = calcularPrioridad(ticketActualizado);
  tickets[index] = ticketActualizado;
  guardarTickets(tickets);

  return ticketActualizado;
}

function eliminarTicket(id) {
  const tickets = leerTickets();
  const index = tickets.findIndex((ticket) => ticket.id === id);

  if (index === -1) {
    return false;
  }

  tickets.splice(index, 1);
  guardarTickets(tickets);

  return true;
}

module.exports = {
  listarTickets,
  obtenerTicketPorId,
  crearTicket,
  actualizarTicket,
  eliminarTicket,
  calcularPrioridad
};
