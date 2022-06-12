const { responses } = require("../common.schema");

const data = {
  type: "object",
  properties: {
    _id: { type: "string", description: "_id user" },
    username: { type: "string", description: "username user" },
    email: { type: "string", description: "email user" },
    password: { type: "string", description: "password user" },
    isActive: { type: "boolean", description: "status user" },
  },
};

module.exports = {
  get: {
    tags: ["System User"],
    summary: "Ambil Semua Data System User",
    description: "Endpoint untuk mengambil semua data system user",
    querystring: {
      username: {
        type: "string",
        description: "Query untuk melakukan search berdasarkan nama",
      },
      status: {
        type: "string",
        description: "Query untuk filter berdasarkan status system user",
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
    tags: ["System User"],
    summary: "Ambil Detail Data System User Berdasarkan ID",
    description: "Endpoint untuk mengambil detail data system user",
    params: {
      type: "object",
      properties: { id: { type: "string", description: "Id System User" } },
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
    tags: ["System User"],
    summary: "Tambah Data System User",
    description: "Endpoint untuk menambah data system user",
    body: {
      type: "object",
      required: ["username", "email", "password"],
      properties: {
        username: { type: "string", description: "username user" },
        email: { type: "string", description: "email user" },
        password: { type: "string", description: "password user" },
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
    tags: ["System User"],
    summary: "Update Data System User Berdasarkan ID",
    description: "Endpoint untuk update data system user",
    params: {
      type: "object",
      properties: { id: { type: "string", description: "Id System User" } },
    },
    body: {
      type: "object",
      required: ["username", "email", "password"],
      properties: {
        username: { type: "string", description: "username user" },
        email: { type: "string", description: "email user" },
        password: { type: "string", description: "password user" },
        status: { type: "boolean", description: "status user" },
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
    tags: ["System User"],
    summary: "Hapus Data System User Berdasarkan ID",
    description: "Endpoint untuk hapus data system user",
    params: {
      type: "object",
      properties: { id: { type: "string", description: "Id System User" } },
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
