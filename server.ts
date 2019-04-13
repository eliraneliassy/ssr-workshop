
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import { renderModuleFactory } from '@angular/platform-server';
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/ssr-workshop-server/main');

import * as express from 'express';
import { readFileSync } from 'fs';
import { enableProdMode } from './node_modules/@angular/core';
import { AotCompiler } from '@angular/compiler';

enableProdMode();

const app = express();

const distFoler = __dirname + '/dist/ssr-workshop';

app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
}));

app.set('view engine', 'html');

app.set('views', __dirname + '/dist/ssr-workshop');


app.get('*.*', express.static(distFoler, {
    maxAge: '1y'
}));


app.get('*', (req, res) => {
    res.render('index', { req });
});

app.listen(4200, () => {
    console.log('express running on port 4200');
});

