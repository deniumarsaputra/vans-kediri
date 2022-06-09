const { responses } = require("../common.schema");

const data = {
  type: "object",
  properties: {
    _id: { type: "string", example: "_id user" },
    fristname: {type: "string", example: "nama depan user"},
    lastname: {type: "string", example: "nama belakang user"},
    username: { type: "string", example: "username user" },
    email: { type: "string", example: "email user" },
    nohp: {type: "string", example: "nohp user"},
    password: { type: "string", example: "password user" },
    isActive: { type: "boolean", example: "status user" },
  },
};

module.exports = {
  get: {
    tags: ["Mobile User"],
    summary: "Ambil Semua Data Mobile User",
    description: "Endpoint untuk mengambil semua data mobile user",
    querystring: {
      username: {
        type: "string",
        description: "Query untuk melakukan search berdasarkan nama",
      },
      status: {
        type: "string",
        description: "Query untuk filter berdasarkan status mobile user",
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
    tags: ["Mobile User"],
    summary: "Ambil Detail Data Mobile User Berdasarkan ID",
    description: "Endpoint untuk mengambil detail data mobile user",
    params: {
      type: "object",
      properties: { id: { type: "string", description: "Id Mobile User" } },
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
    tags: ["Mobile User"],
    summary: "Update Data Mobile User Berdasarkan ID",
    description: "Endpoint untuk update data mobile user",
    params: {
      type: "object",
      properties: { id: { type: "string", description: "Id Mobile User" } },
    },
    body: {
      type: "object",
      required: ["fristname","lastname","username", "email", "password","nohp","status"],
      properties: {
        fristname: {type: "string", example: "frisname user"},
        lastname: {type: "string", example: "lastname user"},
        username: { type: "string", example: "username user" },
        email: { type: "string", example: "email user" },
        nohp: {type: "string", example: "nohp user"},
        password: { type: "string", example: "password user" },
        status: { type: "boolean", example: "status user" },
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
    tags: ["Mobile User"],
    summary: "Hapus Data Mobile User Berdasarkan ID",
    description: "Endpoint untuk hapus data mobile user",
    params: {
      type: "object",
      properties: { id: { type: "string", description: "Id Mobile User" } },
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
