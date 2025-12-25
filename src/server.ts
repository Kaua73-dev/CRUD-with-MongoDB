import fastify, {FastifyRequest, type FastifyInstance } from "fastify"
import { mongoPlugin } from "./config/mongo";
import autoload from "@fastify/autoload";
import path from "node:path";
import ck from "chalk";




export async function starServer() {
const app = fastify();


app.addHook("onRoute", route => {
    if(route.method != "HEAD" && route.method != "OPTIONS"){
           console.log(`${ck.yellow(route.method)} ${ck.blue(route.path)}`);
    }
});

await app.register(mongoPlugin);

app.register(autoload, {
    dir: path.join(path.resolve(), "src/routes"),
    routeParams: true
})


const port = Number(process.env.PORT ?? 3900);

try {
    
await app.listen({port, host: "0.0.0.0"});
console.log(ck.green(`${ck.underline("Fastify")} server listen on ${port}`));


} catch (error) {
    console.error(`Failed connection ${error}`),
    process.exit(1);

}
};


export type RouteHandler = (app: FastifyInstance ) => any;
export function defineRoutes(handler: RouteHandler){
    return function(app: FastifyInstance,_opts: any, done: () => void){
        handler(app),
        done();
    }
}


starServer().catch((error) => {
    console.log(`error start server ${error}`)
    process.exit(1);
});