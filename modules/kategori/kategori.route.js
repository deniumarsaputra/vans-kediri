//Depedency
const Boom = require("@hapi/boom");

//Model
const Kategori = require("./kategori.model");

//Schema
const {get, getById, post, put, deletes} = require('./kategori.schema')

async function routes(fastify, opts) {
  //Tambah Data Kategori
  fastify.post("/kategori", {schema: post}, async (req, reply) => {
    try {
      const { name } = req.body;
      const cekKategori = await Kategori.findOne({$and: [{ name: name }, {statusDelete: false}]}).lean();
      if (!cekKategori) {
        const dataKategori = await Kategori.create({
          name: name,
        });
        reply.success("Berhasil menambah kategori baru", dataKategori);
      } else {
        return reply.failed("Kategori sudah ada", 400);
      }
    } catch (err) {
      throw Boom.boomify(err);
    }
  });

  //Tampilkan Semua Data Kategori
  fastify.get("/kategori", {schema: get}, async (req, reply) => {
    try {
      const search = {};
      if (req.query.name) {
        search.name = { $regex: req.query.name };
      }

      const dataKategori = await Kategori.find(
        { $and: [search, { statusDelete: false }] },
        "-statusDelete"
      ).lean();
      if (!dataKategori) {
        return reply.failed("Gagal menampilkan data", 400);
      } else {
        reply.success("Berhasil menampilkan data", dataKategori);
      }
    } catch (err) {
      throw Boom.boomify(err);
    }
  });

  //Tampilkan detail data kategori
  fastify.get("/kategori/:id", {schema: getById}, async (req, reply) => {
    try {
      const dataKategori = await Kategori.findOne(
        { _id: req.params.id },
        "-statusDelete"
      ).lean();
      if (!dataKategori) {
        return reply.failed("Gagal menampilkan data", 400);
      } else {
        reply.success("Berhasil menampilkan data", dataKategori);
      }
    } catch (err) {
      throw Boom.boomify(err);
    }
  });

  //Update Data Kategori
  fastify.put("/kategori/:id", {schema: put}, async (req, reply) => {
    try {
      const { name } = req.body;
      const cekData = await Kategori.findOne(
        { _id: req.params.id },
        "_id"
      ).lean();
      if (!cekData) {
        return reply.failed("Id Kategori tidak ditemukan", 400);
      } else {
        const cekSama = await Kategori.findOne({ name: name }).lean();
        if (cekSama) {
          return reply.failed(
            "Gagal mengupdate data karena name sudah ada",
            400
          );
        } else {
          await Kategori.updateOne(
            { _id: req.params.id },
            {
              name: name,
            }
          );
          reply.success("Berhasil mengupdate data");
        }
      }
    } catch (err) {
      throw Boom.boomify(err);
    }
  });

  //Delete Data Kategori
  fastify.delete("/kategori/:id", {schema: deletes}, async (req, reply) => {
      try {
          const cekData = await Kategori.findOne({_id: req.params.id}, "_id").lean()
          if(!cekData){
              return reply.failed("Id kategori tidak ditemukan", 400)
          }else{
              await Kategori.updateOne({_id: req.params.id},{
                  statusDelete: true
              })
              reply.success("Berhasil menghapus data")
          }
      } catch (err) {
          throw Boom.boomify(err)
      }
  })
}

module.exports = routes;
