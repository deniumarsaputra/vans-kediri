//Depedency
const Boom = require("@hapi/boom");

//Model
const sysUser = require("../sysUser/sysUser.model");

//Helper
const {loginz} = require('./auth.schema')

async function routes(fastify, opts) {
  //Authentication Login
  fastify.post("/login", {schema: loginz}, async (req, reply) => {
    try {
      const { email, password } = req.body;
      const loginz = await sysUser
        .findOne({ $and: [{ email: email }, { statusDelete: false }] })
        .lean();
      if (!loginz) {
        return reply.failed("Email tidak terdaftar", 401);
      } else {
        if (loginz.password == password) {
          if (loginz.isActive == false) {
            return reply.failed("Akun anda sedang di non aktifkan", 401);
          } else {
            reply.success("Berhasil melakukan login", loginz);
          }
        } else {
          return reply.failed("Password salah", 401);
        }
      }
    } catch (err) {
      throw Boom.boomify(err);
    }
  });
}

module.exports = routes;
