const { responses } = require("../common.schema");

const data = {
  type: "object",
  properties: {
    _id: { type: "string", description: "_id produk" },
    kode: {type: "string", description: "kode produk"},
    name: {type: "string", description: "nama produk"},
    price: {type: "number", description: "harga produk"},
    stock: {type: "number", description:  "stok produk"},
    categori: {type: "object", properties: {_id: {type: "string", description: "id kategori"}, name: {type: "string", description: "nama kategori"}}},
    description: {type: "string", description: "deskripsi produk"},
    tags: {type: "string", description:"tag produk"},
    photos: {type: "object", properties: {p1: {type: "string", description: "photo 1"}, p2: {type: "string", description: "photo 2"}, p3: {type: "string", description: "photo3"}}},
    realease: {type: "boolean", description: "status produk"}
  },
};

module.exports = {
  get: {
    tags: ["Produk"],
    summary: "Ambil Semua Data Produk",
    description: "Endpoint untuk mengambil semua data produk",
    querystring: {
      kode: {
        type: "string",
        description: "Query untuk melakukan search berdasarkan nama",
      },
      categori: {
          type: "string",
          description: "Query untuk filter berdasarkan kategori",
      },
      status: {
          type: "string",
          description: "Query untuk filter berdasarkan status realease produk"
      }
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          ...responses.success200.properties,
          result: {
            type: "object",
            properties: {
              data: {
                type: "array",
                items: { data },
              },
            },
          },
        },
      },
      401: responses.error401,
    },
  },

  getById: {
    tags: ["Produk"],
    summary: "Ambil Detail Data Produk Berdasarkan ID",
    description: "Endpoint untuk mengambil detail data produk",
    params: {
      type: "object",
      properties: { id: { type: "string", description: "Id produk" } },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          ...responses.success200.properties,
          result: { data },
        },
      },
      401: responses.error401,
    },
  },

  post: {
    tags: ["Produk"],
    summary: "Tambah Data Produk",
    description: "Endpoint untuk menambah data produk",
    body: {
      type: "object",
      required: ["kode","name","price","stock", "categori", "description", "tags", "photos"],
      properties: {
        kode: { type: "string", description: "kode produk" },
        name: { type: "string", description: "nama produk "},
        price: { type: "string", description: "harga produk"},
        stock: { type: "string", description: "stok produk"},
        categori: {type: "string", description: "kategori produk"},
        description: {type: "string", description: "deskripsi produk"},
        tags: {type: "string", description: "tag produk"},
        photos: {type: "object", properties: {p1: {type: "string", description:"photo produk 1"}, p2: {type: "string", description:"photo produk 2"}, p3: {type: "string", description: "photo produk 3"}}}
      },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          ...responses.success200.properties,
          result: { data },
        },
      },
      401: responses.error401,
    },
  },

  put: {
    tags: ["Produk"],
    summary: "Update Data Produk Berdasarkan ID",
    description: "Endpoint untuk update data produk",
    params: {
      type: "object",
      properties: { id: { type: "string", description: "Id Produk" } },
    },
    body: {
        type: "object",
        required: ["kode","name","price","stock", "categori", "description", "tags", "photos"],
        properties: {
          kode: { type: "string", description: "kode produk" },
          name: { type: "string", description: "nama produk "},
          price: { type: "string", description: "harga produk"},
          stock: { type: "string", description: "stok produk"},
          categori: {type: "string", description: "kategori produk"},
          description: {type: "string", description: "deskripsi produk"},
          tags: {type: "string", description: "tag produk"},
          status: {type: "string", description: "status realease produk"},
          photos: {type: "object", properties: {p1: {type: "string", description:"photo produk 1"}, p2: {type: "string", description:"photo produk 2"}, p3: {type: "string", description: "photo produk 3"}}}
        },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          ...responses.success200.properties,
        },
      },
      401: responses.error401,
    },
  },

  deletes: {
    tags: ["Produk"],
    summary: "Hapus Data Produk Berdasarkan ID",
    description: "Endpoint untuk hapus data produk",
    params: {
      type: "object",
      properties: { id: { type: "string", description: "Id Produk" } },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          ...responses.success200.properties,
        },
      },
      401: responses.error401,
    },
  },
};
