import _ from 'koa-route';
import App from './App';

export default class Controller { }

export function controllerDecorator(path: string) {
  return <T extends {new(...args:any[]):{}}>(constructor: T) => {
    const prototype = constructor.prototype;
    for (const key in prototype) {
      const route = prototype[key];
      if (typeof route === 'function' && typeof route.method === 'string' && typeof route.path === 'string') {
        const method = (<string>route.method).toUpperCase();
        const formattedPath = `/${path}/${route.path}`;
        switch(method) {
          case 'GET':
            App.use(_.get(formattedPath, route));
            break;
          case 'POST':
            App.use(_.post(formattedPath, route));
            break;
          default:
            console.warn(`Unknown method '${method}' at route '${key}'`);
        }
      }
    }
  }
}

export function controllerMethodDecorator(method: string, path: string) {
  return (target: Controller, propertyKey: string, descriptor: PropertyDescriptor) => {
    const controllerMethod = (<any>target)[propertyKey];
    controllerMethod.method = method;
    controllerMethod.path = path;
  }
}