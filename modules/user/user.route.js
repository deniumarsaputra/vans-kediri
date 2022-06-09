//Depedency
const Boom = require('@hapi/boom')

//Model
const User = require('./user.model')

//Helper
const {get, getById, put, deletes} = require('./user.schema')

async function routes(fastify, opts){

    //Tampilkan Semua Data User Mobile
    fastify.get("/user", {schema: get}, async (req, reply) => {
        try {
            //Search Berdasarkan Nama
            const search = {}
            if(req.query.username){
                search.username = { $regex : req.query.username }
            }

            //Filter Berdaskan Status Active User
            const filter = {}
            if(req.query.status){
                filter.isActive = req.query.status
            }

            const dataUser = await User.find({$and: [ search, filter ,{statusDelete: false}]}, "-password -statusDelete")
            if(!dataUser){
                return reply.failed("Gagal menampilkan data user mobile", 400)
            }else{
                reply.success("Berhasil menampilkan data user mobile", dataUser)
            }
        } catch (err) {
            throw Boom.boomify(err)
        }
    })

    //Tampilkan Detail Data User Mobile Berdasarkan ID
    fastify.get("/user/:id", {schema: getById}, async (req, reply) => {
        try {
            const dataUser = await User.findOne({_id: req.params.id}, "-statusDelete").lean()
            if(!dataUser){
                return reply.failed("Gagal menampilkan data", 400)
            }else{
                reply.success("Berhasil menampilkan data", dataUser)
            }
        } catch (err) {
            throw Boom.boomify(err)
        }
    })

    //Update Status dan Password User Mobile Berdasarkan ID
    fastify.put("/user/:id", {schema: put}, async (req, reply) => {
        try {
            const {fristname, lastname, username, email, nohp, status } = req.body
            const cekData = await User.findOne({_id: req.params.id}, "_id").lean()
            if(!cekData){
                return reply.failed("Id user mobile tidak ditemukan", 400)
            }else{
                await User.updateOne({_id: req.params.id}, {
                    fristname: fristname,
                    lastname: lastname,
                    username: username,
                    email: email,
                    nohp: nohp,
                    isActive: status
                })
                reply.success("Berhasil mengupdate data")
            }
        } catch (err) {
            throw Boom.boomify(err)
        }
    })

    //Delete User Mobile
    fastify.delete("/user/:id", {schema: deletes}, async (req, reply) => {
        try {
            const cekData = await User.findOne({_id: req.params.id}, "_id").lean()
            if(!cekData){
                return reply.failed("Id user mobile tidak ditemukan", 400)
            }else{
                await User.updateOne({_id: req.params.id}, {
                    statusDelete: true
                })
                reply.success("Berhasil menghapus data")
            }
        } catch (err) {
            throw Boom.boomify(err)
        }
    })
}

module.exports = routes