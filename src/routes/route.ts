import { FastifyRequest, FastifyReply, type FastifyInstance } from "fastify";
import { defineRoutes } from "#server";
import { createUserController, deleteUserController, getAllUsersController, getUserByCpfController, updateUserController } from "../controllers/index";



export default defineRoutes((app) => {
    app.get("/", async () => {
        return {
            message: "hello world!"
        }
});


// create user
app.post("/user", createUserController);

// get users
app.get("/users/:cpf", getUserByCpfController);
app.get("/users", getAllUsersController);

// update users
app.put("/users/:cpf", updateUserController);

// delete users
app.delete("/users/:cpf", deleteUserController);


});