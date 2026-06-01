const express = require("express");
const ticketController = require("../controllers/ticket.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { validateTicket, validateTicketUpdate } = require("../middlewares/validation.middleware");

const router = express.Router();

router.get("/", ticketController.listarTickets);
router.get("/:id", ticketController.obtenerTicketPorId);
router.post("/", authMiddleware, validateTicket, ticketController.crearTicket);
router.put("/:id", authMiddleware, validateTicketUpdate, ticketController.actualizarTicket);
router.delete("/:id", authMiddleware, ticketController.eliminarTicket);

module.exports = router;
