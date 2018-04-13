import Koa from 'koa';

import _ from 'koa-route';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';

import inProduction from './inProduction';

const APP_KEY = Symbol.for('hasnite.core.app');

const globalSymbols = Object.getOwnPropertySymbols(global);
const hasApp = (globalSymbols.indexOf(APP_KEY) > -1);

if (!hasApp) {
  const version = require('../package.json').version;
  const environment = inProduction ? 'production' : 'development';

  const App = new Koa();

  App.use(bodyParser());
  App.use(json({ pretty: !inProduction, param: inProduction ? 'pretty' : undefined }));

  App.use(_.get(
    '/',
    async ctx => {
      if (environment === 'development') {
        ctx.body = { version, environment };
      } else {
        ctx.body = { version };
      }
    }
  ));

  (<any>global)[APP_KEY] = App;
}

export default <Koa>(<any>global)[APP_KEY];