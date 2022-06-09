const { app } = require("./config")
const logger = require("pino")(app.logger)

const fastify = require("fastify")({logger, trustProxy: app.trushProxy})

require("./core/plugins")(fastify)
require("./core/logging")(fastify, logger)
require("./core/database")()
require("./core/responses")(fastify)

fastify.get("/", async () => ({Welcome : "API-DASHBOARD WORLD"}))

//Route
fastify.register(require("./modules/sysUser/sysUser.route"))
fastify.register(require("./modules/auth/auth.route"))
fastify.register(require("./modules/kategori/kategori.route"))
fastify.register(require("./modules/user/user.route"))
fastify.register(require("./modules/produk/produk.route"))

const start = async () => {
    try {
        await fastify.listen(app.port)
        console.log(`Run localhost:${app.port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()