'use strict';

const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');
const HapiReactViews = require('hapi-react-views');
const Inert = require('@hapi/inert');
const path = require('path');

require('dotenv').config();


require('@babel/register')({
    presets: ['@babel/preset-react', '@babel/preset-env']
});


const main = async function () {

    const server = Hapi.Server({
        host: 'localhost',
        port: process.env.PORT || 3000
    });

    await server.register(Vision);
    await server.register(Inert);

    server.views({
        engines: {
            jsx: HapiReactViews
        },
        relativeTo: __dirname,
        path: 'pages',
        compileOptions: {
            renderMethod: 'renderToString',
            layoutPath: path.join(__dirname, 'pages'),
            layout: 'layout'
        }
    });

    server.route({
        method: 'GET',
        path: '/assets/client.js',
        handler: {
            file: path.join(__dirname, './public/client.js')
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            const context = { title: 'Formulario para Pago de Horas Extras - Hypernova Labs' };
            context.state = `window.state = ${JSON.stringify(context)};`;

            return h.view('app', context);
        }
    });

    await server.start();

    console.log(`Server is listening at ${server.info.uri}`);
};

main();