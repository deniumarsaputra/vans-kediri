const { responses } = require("../common.schema");

const data = {
  type: "object",
  properties: {
    _id: { type: "string", description: "_id user" },
    fristname: {type: "string", description: "nama depan user"},
    lastname: {type: "string", description: "nama belakang user"},
    username: { type: "string", description: "username user" },
    email: { type: "string", description: "email user" },
    nohp: {type: "string", description: "nohp user"},
    password: { type: "string", description: "password user" },
    isActive: { type: "boolean", description: "status user" },
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
        fristname: {type: "string", description: "frisname user"},
        lastname: {type: "string", description: "lastname user"},
        username: { type: "string", description: "username user" },
        email: { type: "string", description: "email user" },
        nohp: {type: "string", description: "nohp user"},
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
