'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const path = require('path');
const Connection = require('./dbconfig')

const init = async () => {
    const server = Hapi.Server({
        host: 'localhost',
        port: 2000,
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'static')
            }
        }

    });

    await server.register([{
        plugin: require("hapi-geo-locate"),
        options: {
            enabledByDefault: true
        }
    },
    {
        plugin: Inert
    },
    {
        plugin: require('@hapi/vision')
    }
]);

server.views({
    engines: {
        hbs: require('handlebars')
    },
    path: path.join(__dirname, 'views'),
    layout: 'default'
})

    server.route([{
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.file('welcome.html');
        }
    },
    {
        method: 'GET',
        path: '/getUser',
        handler: async (request, h) => {
           const user = await Connection.getUser();
           return h.view('index', {user});
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: (request, h) => {
            return h.view('index', { username: request.payload.username });
        }
    },
    {
        method: 'GET',
        path: '/{any*}',
        handler: (request, h) => {
            return "<h1>Oh no! You must be lost!</h1>"
        }
    }
    ]);

    await server.start();
    console.log(`Server started on: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();