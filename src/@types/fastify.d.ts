import "fastify"
import { Db, MongoClient } from "mongodb"


declare module "fastify" {
    interface FastifyInstance {
        mongo: {
            client: MongoClient,
            db: Db
        }
    }
    
    interface FastifyRequest {
        server: FastifyInstance
    }
}