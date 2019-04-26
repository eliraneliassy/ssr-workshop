import * as functions from 'firebase-functions';
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { renderModuleFactory } from '@angular/platform-server';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as express from 'express';
import { readFileSync } from 'fs';
import { enableProdMode } from '@angular/core';

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./main');

enableProdMode();

const app = express();

const indexHtml = readFileSync(__dirname + '/index.html', 'utf-8').toString();

app.get('*.*', express.static(__dirname + '/dist', {
    maxAge: '1y'
}));

app.route('*').get((req, res) => {

    console.log(req.url);

    renderModuleFactory(AppServerModuleNgFactory, {
        document: indexHtml,
        url: req.url,
        extraProviders: [
            provideModuleMap(LAZY_MODULE_MAP)
        ]
    }).then(html => {
        res.status(200).send(html);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });

});

exports.ssrApp = functions.https.onRequest(app);
