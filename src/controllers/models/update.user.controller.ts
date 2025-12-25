import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { userCreateSchema } from "schema/user.schema";






export async function updateUserController(
req: FastifyRequest,
reply: FastifyReply
) {
   

    const { cpf } = req.params as { cpf: string } 
    try {
        
        
        const data = userCreateSchema.partial().parse(req.body);


        const update = await req.server.mongo.db.collection("users")
        .updateOne({ cpf }, {$set: data});


        if(update.matchedCount === 0){
            return reply.status(StatusCodes.NOT_FOUND).send({
                message: "User not found"
            });
        }

        return reply.status(StatusCodes.OK).send({
            message: "User update successfully",
            data: {
                update
            }
        })

    } catch (error: any) {
        console.log(error)

        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: "Error update user",
            error: error.message
        });
    }



}