const express = require('express');
const app = require('./app');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const conectarDB = require('./config/db'); // ⬅️ Agrega esto

const PORT = process.env.PORT || 3000;

// 🔧 Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de Proyectos y Tareas",
      version: "1.0.0",
      description: "Documentación de la API del proyecto final",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Proyecto: {
          type: "object",
          properties: {
            nombreProyecto: { type: "string" },
            descripcion: { type: "string" },
            fechaInicio: { type: "string", format: "date" },
            fechaFin: { type: "string", format: "date" },
            costo: { type: "number" },
            estado: { type: "string", enum: ["Iniciado", "Completado", "Cancelado"] },
            tareas: {
              type: "array",
              items: { $ref: "#/components/schemas/Tarea" }
            }
          }
        },
        Tarea: {
          type: "object",
          properties: {
            nombreTarea: { type: "string" },
            descripcion: { type: "string" },
            fechaEntrega: { type: "string", format: "date" },
            completado: { type: "boolean" }
          }
        }
      }
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ✅ Conectar a MongoDB con archivo externo
conectarDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
});
