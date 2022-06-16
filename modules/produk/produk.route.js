//Depedency
const Boom = require("@hapi/boom");

//Model
const Produk = require("./produk.model");

//Helper
const {get, getById, post, put, deletes} = require('./produk.schema')

async function routes(fastify, opts) {
  fastify.post("/produk", {schema: post}, async (req, reply) => {
    try {
      const { kode, name, price, categori, description, tags } =
        req.body;
      const photos = {
        p1: req.body.photos.p1,
        p2: req.body.photos.p2,
        p3: req.body.photos.p3,
      };
      const cekProduk = await Produk.findOne({
        $and: [{ kode: kode }, { statusDelete: false }],
      }).lean();
      if (!cekProduk) {
        const saveProduk = await Produk.create({
          kode: kode,
          name: name,
          price: price,
          categori: categori,
          description: description,
          tags: tags,
          photos: photos,
        });
        reply.success("Berhasil menambahkan produk baru", saveProduk);
      } else {
        return reply.failed("Kode Produk Sudah Ada", 400);
      }
    } catch (err) {
      throw Boom.boomify(err);
    }
  });

  fastify.get("/produk", {schema: get}, async (req, reply) => {
    try {
      //Search Berdasarkan Kode
      const search = {};
      if (req.query.kode) {
        search.kode = { $regex: req.query.kode };
      }

      //Filter Berdaskan Status Produk
      const filterRelease = {};
      if (req.query.status) {
        filterRelease.realease = req.query.status;
      }

      //Filter Berdasarkan Kategori
      const filterCategori = {};
      if (req.query.categori) {
        filterCategori.categori = req.query.categori;
      }

      const dataProduk = await Produk.find(
        {
          $and: [
            search,
            filterRelease,
            filterCategori,
            { statusDelete: false },
          ],
        },
        "-statusDelete"
      )
        .lean()
        .populate("categori", "name");
      if (!dataProduk) {
        return reply.failed("Gagal menampilkan data produk", 400);
      } else {
        reply.success("Berhasil menampilkan data produk", dataProduk);
      }
    } catch (err) {
      throw Boom.boomify(err);
    }
  });

  fastify.get("/produk/:id", {schema: getById}, async (req, reply) => {
    try {
      const dataProduk = await Produk.findOne(
        { _id: req.params.id },
        "-statusDelete"
      )
        .lean()
        .populate("categori", "name");
      if (!dataProduk) {
        return reply.failed("Gagal menampilkan detail produk", 400);
      } else {
        reply.success("Berhasil menampilkan detail produk", dataProduk);
      }
    } catch (err) {
      throw Boom.boomify(err);
    }
  });

  fastify.put("/produk/:id", {schema: put}, async (req, reply) => {
    try {
      const { kode, name, price, categori, description, tags, status } =
        req.body;
      const photos = {
        p1: req.body.photos.p1,
        p2: req.body.photos.p2,
        p3: req.body.photos.p3,
      };

      const cekProduk = await Produk.findOne(
        { _id: req.params.id },
        "_id"
      ).lean();
      if (!cekProduk) {
        return reply.failed("Id produk tidak ditemukan", 400);
      } else {
        await Produk.updateOne(
          { _id: req.params.id },
          {
            kode: kode,
            name: name,
            price: price,
            categori: categori,
            description: description,
            tags: tags,
            photos: photos,
            realease: status,
          }
        );
        reply.success("Berhasil mengupdate data produk");
      }
    } catch (err) {
      throw Boom.boomify(err);
    }
  });

  fastify.delete("/produk/:id", {schema: deletes}, async (req, reply) => {
    try {
      const cekProduk = await Produk.findOne(
        { _id: req.params.id },
        "_id"
      ).lean();
      if (!cekProduk) {
        return reply.failed("Id produk tidak ditemukan", 400);
      } else {
        await Produk.updateOne(
          { _id: req.params.id },
          {
            statusDelete: true,
          }
        );
        reply.success("Berhasil menghapus data produk");
      }
    } catch (err) {
      throw Boom.boomify(err);
    }
  });
}

module.exports = routes;
