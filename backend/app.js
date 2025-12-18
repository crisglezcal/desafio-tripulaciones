
const express = require("express");
const crypto = require('crypto');
const cowsay = require("cowsay");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const cookieParser = require('cookie-parser'); 
const morgan = require("./middlewares/morgan");
const error404 = require("./middlewares/error404");
const app = express();
require("dotenv").config();
const rateLimit = require("express-rate-limit"); // Ciberseguridad
const timeout = require("connect-timeout"); // Ciberseguridad

// Ciberseguridad (Helmet)
app.use( 
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      fontSrc: ["'self'"],
      connectSrc: ["'self'"]
    }
  })
);

app.use(helmet.noSniff());

// Cookie Parser
app.use(cookieParser());

// Cors configurado para Cookies
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
  exposedHeaders: ['X-New-Access-Token'] 
}));

// Middlewares 
app.use(express.json());
// Ciberseguridad (Timeout)
app.use(timeout('10s'));
app.use((req, res, next) => {
  if (!req.timedout) next();
});

// Morgan
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

//Swagger
const { swaggerUi, swaggerSpec } = require("./config/swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Rutas
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const hrRoutes = require("./routes/hrRoutes");
const mktRoutes = require("./routes/mktRoutes");
const chatRoutes = require("./routes/chatRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/mkt", mktRoutes);
app.use("/api/chat", chatRoutes);

// Ruta para refresh token
app.post('/api/refresh', (req, res) => {
  res.json({ message: 'Refresh endpoint' });
});

// Ruta base de comprobación
app.get("/api", (req, res) => {
  // Mostrar estado de cookies (solo para debug)
  console.log('Cookies recibidas:', req.cookies);
  res.send("Backend funcionando correctamente");
});

//Producción (React build)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist", "index.html")
    );
  });
}

// Manejo de rutas no encontradas
app.use(error404);
// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor funcionando en puerto ${port}`);
  console.log(
    cowsay.say({
      text: `App funcionando en http://localhost:${port}/api`,
      f: "owl",
    })
  );
});