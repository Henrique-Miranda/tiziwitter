import { fastify } from "fastify";
import socketio from "fastify-socket.io";
import formbody from "@fastify/formbody";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  getTiziweets,
  createTiziweet,
  like,
} from "./controllers/TiziweetController.js";
import { socketiomiddleware } from "./middlewares/sockeio.js";
import cors from "@fastify/cors";
dotenv.config();

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("Connected!");
});
const server = fastify({ logger: true });
await server.register(cors, {
  origin: "*",
  methods: ["GET", "POST"],
});
server.register(formbody);
server.register(socketio, {
  cors: {
    origin: "*",
  },
});

server.get("/", async (request, reply) => {
  server.io.emit("hello fom socket", console.log("hello from socket"));
  reply.header("Access-Control-Allow-Origin", "*");
  return reply.send({ status: "Server running..." });
});

server.get(
  "/tiziweets",
  {
    onRequest: [socketiomiddleware],
  },
  getTiziweets
);
server.post("/tiziweets", { onRequest: [socketiomiddleware] }, createTiziweet);
server.post("/like/:id", { onRequest: [socketiomiddleware] }, like);

server.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server listening at ${address}`);
});
