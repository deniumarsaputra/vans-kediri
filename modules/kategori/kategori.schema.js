const { responses } = require("../common.schema");

const data = {
  type: "object",
  properties: {
    _id: { type: "string", description: "_id kategori" },
    name: { type: "string", description: "name kategori" }
  },
};

module.exports = {
  get: {
    tags: ["Kategori"],
    summary: "Ambil Semua Data Kategori",
    description: "Endpoint untuk mengambil semua data kategori",
    querystring: {
      name: {
        type: "string",
        description: "Query untuk melakukan search berdasarkan nama",
      },
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
    tags: ["Kategori"],
    summary: "Ambil Detail Data Kategori Berdasarkan ID",
    description: "Endpoint untuk mengambil detail data kategori",
    params: {
      type: "object",
      properties: { id: { type: "string", description: "Id kategori" } },
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
    tags: ["Kategori"],
    summary: "Tambah Data Kategori",
    description: "Endpoint untuk menambah data kategori",
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", description: "name kategori" },
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
    tags: ["Kategori"],
    summary: "Update Data Kategori Berdasarkan ID",
    description: "Endpoint untuk update data kategori",
    params: {
      type: "object",
      properties: { id: { type: "string", description: "Id Kategori" } },
    },
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", description: "name kategori" },
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
    tags: ["Kategori"],
    summary: "Hapus Data Kategori Berdasarkan ID",
    description: "Endpoint untuk hapus data kategori",
    params: {
      type: "object",
      properties: { id: { type: "string", description: "Id Kategori" } },
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
