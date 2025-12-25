import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes"
import { userCreateSchema } from "schema/user.schema";



export async function createUserController(
req: FastifyRequest,
reply: FastifyReply

) {

const { name, email, cpf, profession } = userCreateSchema.parse(req.body)

try {

const userExists = await req.server.mongo.db
    .collection("users")
    .findOne({ cpf })

if(userExists){
    return reply.status(StatusCodes.CONFLICT).send({
        message: "Error, cpf already exist"
    });
}


const result = await req.server.mongo.db
    .collection("users")
    .insertOne({
        name,
        email,
        cpf,
        profession,
        createdAt: new Date()
    });

const user = {
    id: result.insertedId,
    name,
    email,
    cpf,
    profession
}


return reply.status(StatusCodes.OK).send({
    message: "Successfully create user!",
    data: {
        user
    }
});

} catch (error: any) {
    console.log(error)
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Error created user",
        error: error.message
    })
}


}