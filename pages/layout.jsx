'use strict';

import { TextField } from '@material-ui/core';
import React from 'react';


export default function Layout({title, state, children}) {
    return (
            <html>
                <head>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    <title>{ title }</title>
                </head>
                <body>
                    <div id="app-mount"
                        dangerouslySetInnerHTML={{ __html: children }}
                    />
                    <script id="app-state"
                        dangerouslySetInnerHTML={{ __html: state }}
                    />
                    <script src="/assets/client.js" />
                </body>
            </html>
    )
}

