import { fastify } from "fastify";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("Connected!");
});
const server = fastify({ logger: true });

server.get("/", async (request, reply) => {
  return reply.send({ hello: "world" });
});

server.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server listening at ${address}`);
});
