import Tiziweet from "../models/Tiziweet.js";

export const getTiziweets = async (request, reply) => {
  const tiziweets = await Tiziweet.find({}).sort({ createdAt: -1 });
  reply.send(tiziweets);
};

export const createTiziweet = async (request, reply) => {
  const tiziweet = new Tiziweet({
    author: request.body.author,
    content: request.body.content,
  });
  await tiziweet.save();
  request.io.emit("tiziweet", tiziweet);
  reply.send(tiziweet);
};

export const like = async (request, reply) => {
  const tiziweet = await Tiziweet.findById(request.params.id);
  tiziweet.set({ likes: tiziweet.likes + 1 });
  await tiziweet.save();
  request.io.emit("like", tiziweet);
  reply.send(tiziweet);
};
