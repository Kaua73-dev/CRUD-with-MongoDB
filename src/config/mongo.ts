import { FastifyInstance } from "fastify";
import fp from "fastify-plugin"
import { MongoClient } from "mongodb"





export async function mongoPlugin(app: FastifyInstance) {
const client = new MongoClient(process.env.MONGO_URI!);
await client.connect();

 app.decorate("mongo", {
    client, 
    db: client.db(process.env.MONGO_DB_NAME!)
 });

    console.log('mongo conectado')
}

export default fp(mongoPlugin)