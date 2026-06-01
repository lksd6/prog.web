const ticketService = require("../services/ticket.service");

function listarTickets(req, res, next) {
  try {
    const tickets = ticketService.listarTickets();
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
}

function obtenerTicketPorId(req, res, next) {
  try {
    const ticket = ticketService.obtenerTicketPorId(req.params.id);

    if (!ticket) {
      return res.status(404).json({ mensaje: "Ticket no encontrado" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
}

function crearTicket(req, res, next) {
  try {
    const nuevoTicket = ticketService.crearTicket(req.body);
    res.status(201).json(nuevoTicket);
  } catch (error) {
    next(error);
  }
}

function actualizarTicket(req, res, next) {
  try {
    const ticketActualizado = ticketService.actualizarTicket(req.params.id, req.body);

    if (!ticketActualizado) {
      return res.status(404).json({ mensaje: "Ticket no encontrado" });
    }

    res.status(200).json(ticketActualizado);
  } catch (error) {
    next(error);
  }
}

function eliminarTicket(req, res, next) {
  try {
    const eliminado = ticketService.eliminarTicket(req.params.id);

    if (!eliminado) {
      return res.status(404).json({ mensaje: "Ticket no encontrado" });
    }

    res.status(200).json({ mensaje: "Ticket eliminado" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listarTickets,
  obtenerTicketPorId,
  crearTicket,
  actualizarTicket,
  eliminarTicket
};
