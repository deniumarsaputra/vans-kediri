const _omit = require("lodash.omit")
const moment = require("moment-timezone")
moment.tz.setDefault("Asia/Jakarta")

module.exports = (fastify, log ) =>{
    fastify.addHook("onResponse", (req, reply, done) =>{
        const logging = {
            "user-agent": req.headers["user-agent"],
            complete: req.raw.complete,
            aborted: req.raw.aborted,
            params: req.params,
            query: req.query,
            headers: req.headers,
            body: _omit(req.body, "password"),
            rt: reply.getResponseTime(),
            time: moment().format("YYYY-MM-DD HH:mm:ss")
        }
        req.log.lvl(logging)
        done()
    })
}