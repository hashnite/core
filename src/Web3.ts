import inProduction from './inProduction';

const WEB3_KEY = Symbol.for('hashnite.core.web3');

const globalSymbols = Object.getOwnPropertySymbols(global);
const hasWeb3 = (globalSymbols.indexOf(WEB3_KEY) > -1);

if (!hasWeb3) {
  const Web3 = require('web3');
  const ganache = require('ganache-cli');

  const web3 = new Web3(inProduction ? 'ws://localhost:8546' : ganache.provider());
  web3.utils = Web3.utils;

  (<any>global)[WEB3_KEY] = web3;
}

export default (<any>global)[WEB3_KEY];
