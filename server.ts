import { renderModuleFactory } from '@angular/platform-server';
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

const { AppServerModuleNgFactory } = require('./dist/ssr-workshop-server/main');

import * as express from 'express';
import { readFileSync } from 'fs';
import { enableProdMode } from './node_modules/@angular/core';

enableProdMode();

const app = express();
const indexHtml = readFileSync(__dirname + '/dist/ssr-workshop/index.html', 'utf-8').toString();


app.get('*.*', express.static(__dirname + '/dist/ssr-workshop', {
   maxAge: '5y'
}));

app.route('*').get((req, res) => {

   renderModuleFactory(AppServerModuleNgFactory, {
       document: indexHtml,
       url: req.url
   })
       .then(html => res.status(200).send(html))
       .catch(err => {
           console.log(err);
           res.sendStatus(500);
       });


});


app.listen(4200, () => {
   console.log('express running on port 4200');
});

