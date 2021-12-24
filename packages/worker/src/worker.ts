type Return = Object | string | Response;

type Handler = (req: Request) => Return | Promise<Return>;

export class Worker {
  private routes: Route[] = []

  async handle(req: Request): Promise<Response> {
    for (const route of this.routes) {
      if (route.test(req)) {
        const result = await route.handle(req);
        if (typeof result === 'string') {
          return new Response(result, {
            headers: { 'content-type': 'text/plain' },
          })
        } else if (result instanceof Response) {
          return result;
        } else {
          return new Response(JSON.stringify(result), {
            headers: { 'content-type': 'application/json' }
          })
        }
      }
    }
    return new Response('404 - Not Found', {
      status: 404,
      headers: { 'content-type': 'text/plain' },
    });
  }

  get(url: string | RegExp, handler: Handler) {
    const get = (req: Request) => req.method === 'GET'
    const match = (req: Request) => {
      const reqUrl = new URL(req.url);
      if (typeof url === 'string') {
        return url === reqUrl.pathname;
      } else {  
        const match = url.exec(reqUrl.pathname);
        return !!match && match[0] === reqUrl.pathname;
      }
    }
    this.routes.push(new Route([get, match], handler));
  }

  post(url: string | RegExp, handler: Handler) {
    const post = (req: Request) => req.method === 'POST';
    const match = (req: Request) => {
      const reqUrl = new URL(req.url);
      if (typeof url === 'string') {
        return url === reqUrl.pathname;
      } else {
        const reqUrl = new URL(req.url);
        const match = url.exec(reqUrl.pathname);
        return !!match && match[0] === reqUrl.pathname;
      }
    }
    this.routes.push(new Route([post, match], handler));
  }
}

export class Route {
  constructor(private conditions: Array<(req: Request) => boolean>, private handler: Handler) {}

  test(req: Request) {
    return this.conditions.every(cond => cond(req));
  }

  handle(req: Request) {
    return this.handler(req);
  }
}
