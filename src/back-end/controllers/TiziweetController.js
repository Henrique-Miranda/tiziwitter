import Tiziweet from "../models/Tiziweet";

export const getTiziweets = async (request, reply) => {
  const tiziweets = await Tiziweet.find().sort({ createdAt: -1 });
  reply.send(tiziweets);
};

export const createTiziweet = async (request, reply) => {
  const tiziweet = new Tiziweet({
    author: request.body.author,
    content: request.body.content,
  });
  await tiziweet.save();
  reply.send(tiziweet);
};
