const { responses } = require("../common.schema");

const data = {
  type: "object",
  properties: {
    _id: { type: "string", example: "_id user" },
    username: { type: "string", example: "username user" },
    email: { type: "string", example: "email user" },
  },
};

module.exports = {
    loginz: {
        tags: ["Authentication"],
        summary: "Validasi login pengguna dashboard",
        description: "Endpoint untuk melakukan validasi login pengguna dashboard",
        body: {
            type: "object",
            required: ["email","password"],
            properties: {
                email: {type: "string", example: "email system user"},
                password: {type: "string", example: "password system user"}
            }
        },
        response: {
            200: {
                description: "Successful response",
                type: "object",
                properties: {
                    ...responses.success200.properties,
                    result: {type: "object", properties: {data}}
                }
            },
            401: responses.error401
        }
    }
}
