//Depedency
const Boom = require('@hapi/boom')

//Model
const sysUser = require('./sysUser.model')

//Schema
const {get, getById, post, put, deletes} = require('./sysUser.schema')

async function routes(fastify, opts){
    //Tambah Data System User (Admin)
    fastify.post("/sysUser", {schema: post}, async(req, reply) =>{
        try {
            const {username, email, password} = req.body
            const cekSystemUser = await sysUser.findOne({$and: [{email: email}, {statusDelete: false}]}).lean()
            if(!cekSystemUser){
                const dataSystemUser = await sysUser.create({
                    username: username,
                    email: email,
                    password: password
                })
                reply.success("Berhasil menambah system user baru", dataSystemUser)
            }else{
                return reply.failed("Email sudah terdaftar harap gunakan email lain", 400)
            }
            
        } catch (err) {
            throw Boom.boomify(err)
        }
    })

    //Tampilkan Data System User
    fastify.get("/sysUser", {schema: get}, async (req, reply) => {
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

            const dataSystemUser = await sysUser.find({$and: [ search, filter ,{statusDelete: false}]}, "-password -statusDelete")
            if(!dataSystemUser){
                return reply.failed("Gagal menampilkan data system user", 400)
            }else{
                reply.success("Berhasil menampilkan data system user", dataSystemUser)
            }
        } catch (err) {
            throw Boom.boomify(err)
        }
    })

    //Tampilkan Detail Data System User Berdasarkan ID
    fastify.get("/sysUser/:id", {schema: getById}, async (req, reply) => {
        try {
            const dataSystemUser = await sysUser.findOne({_id: req.params.id}, "-statusDelete").lean()
            if(!dataSystemUser){
                return reply.failed("Gagal menampilkan data", 400)
            }else{
                reply.success("Berhasil menampilkan data", dataSystemUser)
            }
        } catch (err) {
            throw Boom.boomify(err)
        }
    })

    //Update Data System User
    fastify.put("/sysUser/:id", {schema: put}, async (req, reply) => {
        try {
            const {username, email, password, status} = req.body
            const cekData = await sysUser.findOne({_id: req.params.id}, "_id").lean()
            if(!cekData){
                return reply.failed("Id system user tidak ditemukan", 400)
            }else{
                await sysUser.updateOne({_id: req.params.id}, {
                    username: username,
                    email: email,
                    password: password,
                    isActive: status
                })
                reply.success("Berhasil mengupdate data")
            }
        } catch (err) {
            throw Boom.boomify(err)
        }
    })

    //Hapus data system user
    fastify.delete("/sysUser/:id", {schema: deletes}, async (req, reply) => {
        try {
            const cekData = await sysUser.findOne({_id: req.params.id}, "_id").lean()
            if(!cekData){
                return reply.failed("Id system user tidak ditemukan", 400)
            }else{
                await sysUser.updateOne({_id: req.params.id}, {
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