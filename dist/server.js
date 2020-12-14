"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const express = require("express");
const path_1 = require("path");
routing_controllers_1.useContainer(typedi_1.Container);
class MyApp {
    constructor() { }
    start() {
        const opts = {
            routePrefix: '/api',
            cors: true,
            classTransformer: true,
            controllers: [`${__dirname}/api/controllers/*.ts`, `${__dirname}/api/controllers/*.js`],
        };
        return routing_controllers_1.createExpressServer(opts);
    }
}
const PORT = process.env.PORT || 3000;
new MyApp()
    // .dbConfig()
    .start()
    .use(express.static(path_1.join(__dirname, 'api/public')))
    .get('*', (req, res, next) => {
    console.log(`express:req from ${req.originalUrl}`);
    console.log(`express:req type ${req.method}`);
    next();
})
    .listen(PORT, () => console.log(`Listening at http://localhost:${PORT}/`));
