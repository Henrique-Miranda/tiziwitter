export function socketiomiddleware(request, reply, done) {
  request.io = request.server.io;
  done();
}
