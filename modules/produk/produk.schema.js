const { responses } = require("../common.schema");

const data = {
  type: "object",
  properties: {
    _id: { type: "string", example: "_id produk" },
    kode: {type: "string", example: "kode produk"},
    name: {type: "string", example: "nama produk"},
    price: {type: "number", example: "harga produk"},
    stock: {type: "number", example:  "stok produk"},
    categori: {type: "object", properties: {_id: {type: "string", example: "id kategori"}, name: {type: "string", example: "nama kategori"}}},
    description: {type: "string", example: "deskripsi produk"},
    tags: {type: "string", example:"tag produk"},
    photos: {type: "object", properties: {p1: {type: "string", example: "photo 1"}, p2: {type: "string", example: "photo 2"}, p3: {type: "string", example: "photo3"}}},
    realease: {type: "boolean", example: "status produk"}
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
        kode: { type: "string", example: "kode produk" },
        name: { type: "string", example: "nama produk "},
        price: { type: "string", example: "harga produk"},
        stock: { type: "string", example: "stok produk"},
        categori: {type: "string", example: "kategori produk"},
        description: {type: "string", example: "deskripsi produk"},
        tags: {type: "string", example: "tag produk"},
        photos: {type: "object", properties: {p1: {type: "string", example:"photo produk 1"}, p2: {type: "string", example:"photo produk 2"}, p3: {type: "string", example: "photo produk 3"}}}
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
          kode: { type: "string", example: "kode produk" },
          name: { type: "string", example: "nama produk "},
          price: { type: "string", example: "harga produk"},
          stock: { type: "string", example: "stok produk"},
          categori: {type: "string", example: "kategori produk"},
          description: {type: "string", example: "deskripsi produk"},
          tags: {type: "string", example: "tag produk"},
          status: {type: "string", example: "status realease produk"},
          photos: {type: "object", properties: {p1: {type: "string", example:"photo produk 1"}, p2: {type: "string", example:"photo produk 2"}, p3: {type: "string", example: "photo produk 3"}}}
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
