'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const next = require('next');
const { overTimeWork } = require('./handlers/excel/overtimework');
const { pathWrapper, nextHandlerWrapper } = require('./next-wrapper')
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const server = Hapi.Server({
    host: '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 3000,
    routes: {
      cors: true
    },
    debug: { request: ['error'] }
});

const main = async function () {

    await server.register(Inert);

    await app.prepare()
    
      server.route({
        method: 'GET',
        path: '/_next/{p*}' /* next specific routes */,
        handler: nextHandlerWrapper(app)
      })

      server.route({
        method: 'POST',
        path: '/excel/overtimework',
        handler: overTimeWork
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