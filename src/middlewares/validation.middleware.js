const categoriasValidas = ["hardware", "software", "red", "cuenta", "otro"];
const impactosValidos = ["bajo", "medio", "alto"];
const urgenciasValidas = ["baja", "media", "alta"];
const estadosValidos = ["pendiente", "en proceso", "resuelto"];

function correoValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

function validarDatosTicket(datos, parcial = false) {
  const errores = [];
  const camposObligatorios = [
    "nombreSolicitante",
    "correo",
    "categoria",
    "descripcion",
    "impacto",
    "urgencia",
    "tiempoEstimado"
  ];

  if (!parcial) {
    camposObligatorios.forEach((campo) => {
      if (datos[campo] === undefined || datos[campo] === "") {
        errores.push(`El campo ${campo} es obligatorio`);
      }
    });
  }

  if (datos.correo !== undefined && !correoValido(datos.correo)) {
    errores.push("El formato del correo no es válido");
  }

  if (datos.categoria !== undefined && !categoriasValidas.includes(datos.categoria)) {
    errores.push("La categoría no es válida");
  }

  if (datos.impacto !== undefined && !impactosValidos.includes(datos.impacto)) {
    errores.push("El impacto no es válido");
  }

  if (datos.urgencia !== undefined && !urgenciasValidas.includes(datos.urgencia)) {
    errores.push("La urgencia no es válida");
  }

  if (datos.estado !== undefined && !estadosValidos.includes(datos.estado)) {
    errores.push("El estado no es válido");
  }

  if (datos.tiempoEstimado !== undefined && (isNaN(Number(datos.tiempoEstimado)) || Number(datos.tiempoEstimado) < 0)) {
    errores.push("El tiempo estimado debe ser un número válido");
  }

  return errores;
}

function validateTicket(req, res, next) {
  const errores = validarDatosTicket(req.body);

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  next();
}

function validateTicketUpdate(req, res, next) {
  const errores = validarDatosTicket(req.body, true);

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  next();
}

module.exports = {
  validateTicket,
  validateTicketUpdate
};
