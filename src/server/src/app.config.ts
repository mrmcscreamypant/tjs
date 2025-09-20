import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";

import basicAuth from "express-basic-auth";

const basicAuthMiddleware = basicAuth({
    // list of users and passwords
    users: {
        "admin": "admin",
    },
    // sends WWW-Authenticate header, which will prompt the user to fill
    // credentials in
    challenge: true,

} satisfies basicAuth.BasicAuthMiddlewareOptions);

/**
 * Import your Room files
 */
import { Battle } from "./rooms/Battle";

export default config({

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('battle', Battle);

    },

    initializeExpress: (app) => {
        app.get("hello_world", (req, res) => {
            res.send("It's time to kick ass and chew bubblegum!");
        });

        if (process.env.NODE_ENV !== "production") {
            app.use("/", playground());
        }

        /**
         * Use @colyseus/monitor
         * It is recommended to protect this route with a password
         * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
         */
        app.use("/monitor", basicAuthMiddleware, monitor());
    },


    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});