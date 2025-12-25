import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { userCreateSchema } from "schema/user.schema";





export async function deleteUserController(
req: FastifyRequest,
reply: FastifyReply


) {
    
const { cpf } = req.params as {cpf: string}

try {
    
    
const deleteUser =  await req.server.mongo.db.collection("users")
.deleteOne({ cpf });

if(deleteUser.deletedCount === 0){
    return reply.status(StatusCodes.NOT_FOUND).send({
        message: "User not found"
    });
}

return reply.status(StatusCodes.OK).send({
    message: "User delete successfully!"
});

} catch (error: any) {
    console.log(error)

    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Error delete user",
        error: error.message
    });


}



}