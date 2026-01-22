import { fastify} from 'fastify'
import cors from '@fastify/cors'
import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';

async function start() {
    const server = fastify();

    await server.register(cors, {
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });

    const database = process.env.DATABASE_URL 
        ? new DatabasePostgres() 
        : new DatabaseMemory()

    //Metodo GET (busca), POST (criação), PUT (alteração), DELETE (apagar)
    //POST https://localhost:3333/videos
    //PUT https://localhost:3333/videos/66(ID)

    server.post('/videos', async (request, reply) => {
        const { title, description, duration } = request.body

        await database.create({
            title,
            description,
            duration,
        })

        return reply.status(201).send()
    })

    server.get('/videos', async (request) => {
        const search = request.query.search

         const videos = await database.list(search)

        return videos
    })

    server.put('/videos/:id', async (request, reply) => {
        const videoID = request.params.id
        const { title, description, duration } = request.body

        await database.update(videoID, {
            title,
            description,
            duration,
        })

        return reply.status(204).send()
    })

    server.delete('/videos/:id', async (request, reply) => {
        const videoID = request.params.id

        await database.delete(videoID)

        return reply.status(204).send()
    })

    await server.listen({
        port: process.env.PORT ?? 3333,
        host: '0.0.0.0',
    })

    console.log('Servidor rodando na porta', process.env.PORT ?? 3333)
}

start().catch(console.error)