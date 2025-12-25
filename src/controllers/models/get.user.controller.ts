import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";




// get all
export async function getAllUsersController(
req: FastifyRequest,
reply: FastifyReply
) {
    
try { 
const users = await req.server.mongo.db.collection("users").find({}).toArray();
    

return reply.status(StatusCodes.OK).send({
    message: "Users get Succesfully",
    data: {
        users
    }
});
} catch (error: any) {
    console.log(error)

    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Users get error",
        error: error.message
    });
}
}

// get by cpf 
export async function getUserByCpfController(
req: FastifyRequest,
reply: FastifyReply
) {
    
    const { cpf } = req.params as { cpf: string }
    try {
        
        const users = await req.server.mongo.db.collection("users").findOne({ cpf });
        return reply.status(StatusCodes.OK).send({
            message: "User fatched successfully",
            data: {
                users
            }
        });


    } catch (error: any) {
        console.log(error)

        return reply.status(StatusCodes.NOT_FOUND).send({
            message: "User not found",
            error: error.message
        });
    }



}