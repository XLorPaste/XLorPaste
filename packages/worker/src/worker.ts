type Return = string | Object | Response;

type Handler = (ctx: Context) => Return | Promise<Return>;

export class Context extends Request {
  query: Record<string, string> = {};

  params: Record<string, string> = {};

  constructor(req: Request) {
    super(req);
  }
}

export class Worker {
  private static readonly corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
    'Access-Control-Max-Age': '86400'
  };

  private routes: Route[] = [
    new Route([(req: Request) => req.method === 'OPTIONS'], async (req: Request) => {
      let headers = req.headers;
      if (
        headers.get('Origin') !== null &&
        headers.get('Access-Control-Request-Method') !== null &&
        headers.get('Access-Control-Request-Headers') !== null
      ) {
        return new Response(null, {
          headers: {
            ...Worker.corsHeaders,
            'Access-Control-Allow-Headers': req.headers.get('Access-Control-Request-Headers')!
          }
        });
      } else {
        return new Response(null, {
          headers: {
            Allow: 'GET, HEAD, POST, OPTIONS'
          }
        });
      }
    })
  ];

  async handle(req: Request): Promise<Response> {
    for (const route of this.routes) {
      const ctx = new Context(req);
      if (route.test(ctx)) {
        const result = await route.handle(ctx);
        return Worker.makeResponse(result);
      }
    }
    return new Response(
      JSON.stringify({
        status: '404',
        message: 'Not Found'
      }),
      {
        status: 404,
        headers: { 'content-type': 'application/json' }
      }
    );
  }

  private static makeResponse(body: Return) {
    if (typeof body === 'string') {
      return new Response(body, {
        headers: { 'content-type': 'text/plain', ...Worker.corsHeaders }
      });
    } else if (body instanceof Response) {
      return body;
    } else {
      return new Response(JSON.stringify(body), {
        headers: { 'content-type': 'application/json', ...Worker.corsHeaders }
      });
    }
  }

  get(url: string, handler: Handler) {
    const get = (req: Request) => req.method === 'GET';
    const match = Route.match(url);
    this.routes.push(new Route([get, match], handler));
  }

  post(url: string, handler: Handler) {
    const post = (req: Request) => req.method === 'POST';
    const match = Route.match(url);
    this.routes.push(new Route([post, match], handler));
  }
}

export class Route {
  constructor(private conditions: Array<(ctx: Context) => boolean>, private handler: Handler) {}

  static match(_pat: string) {
    const pat = _pat.replace(/:[a-zA-Z_][a-zA-Z0-9_]*/g, (text) => {
      return `(?<${text.slice(1)}>[a-zA-Z0-9_]+)`;
    });
    const reg = new RegExp(`^${pat}$`);

    return (ctx: Context) => {
      const url = new URL(ctx.url);
      const path = url.pathname;
      const result = reg.exec(path);
      if (result !== null && result[0] === path) {
        if (!!result.groups) {
          ctx.params = { ...result.groups };
        }
        for (const key of url.searchParams.keys()) {
          ctx.query[key] = url.searchParams.get(key) ?? '';
        }
        return true;
      } else {
        return false;
      }
    };
  }

  test(ctx: Context) {
    return this.conditions.every((cond) => cond(ctx));
  }

  handle(ctx: Context) {
    return this.handler(ctx);
  }
}
