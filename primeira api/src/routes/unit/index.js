import express from "express";
import unitRoutes from "./unitRoutes.js";


const routes = (app) => {
    app.use(
        express.json(),
        unitRoutes
    )
}

export default routes;
