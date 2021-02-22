'use strict';

const Hapi = require('@hapi/hapi');
const next = require('next')
const { pathWrapper, nextHandlerWrapper } = require('./next-wrapper')
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const server = Hapi.Server({
    host: 'localhost',
    port: parseInt(process.env.PORT, 10) || 3000
});

const main = async function () {

    await app.prepare()
    
      server.route({
        method: 'GET',
        path: '/_next/{p*}' /* next specific routes */,
        handler: nextHandlerWrapper(app),
      })
    
      server.route({
        method: '*',
        path: '/{p*}' /* catch all route */,
        handler: nextHandlerWrapper(app),
      })

    try {
        await server.start();
        console.log(`Server is listening at ${server.info.uri}`);
    } catch (error) {
        console.log('Error starting server')
        console.log(error)
    }
};

main();