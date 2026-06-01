const express = require("express");
const path = require("path");
const authRoutes = require("./routes/auth.routes");
const ticketRoutes = require("./routes/ticket.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/login", authRoutes);
app.use("/tickets", ticketRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
