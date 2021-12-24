type Return = string | Object | Response;

type Handler = (ctx: Context) => Return | Promise<Return>;

export interface Context extends Request {
  origin: string;

  path: string;

  params: Record<string, string>;

  query: Record<string, string>;
}

function makeContext(req: Request) {
  const ctx: Context = req as Context;
  const url = new URL(req.url);
  ctx.origin = req.headers.get('origin') ?? url.origin;
  ctx.path = url.pathname;
  ctx.params = {};
  ctx.query = {};
  for (const key of url.searchParams.keys()) {
    ctx.query[key] = url.searchParams.get(key) ?? '';
  }
  return ctx;
}

export class Worker {
  private routes: Route[] = [
    new Route([(req: Request) => req.method === 'OPTIONS'], async (req: Request) => {
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
        'Access-Control-Max-Age': '86400'
      };
      const headers = req.headers;
      if (
        headers.get('Access-Control-Request-Method') !== null &&
        headers.get('Access-Control-Request-Headers') !== null
      ) {
        return new Response(null, {
          headers: {
            ...corsHeaders,
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
      const ctx = makeContext(req);
      if (route.test(ctx)) {
        const result = await route.handle(ctx);
        return Worker.makeResponse(ctx, result);
      }
    }
    return Worker.makeResponse(
      makeContext(req),
      {
        status: '404',
        message: 'Not Found'
      },
      { status: 404 }
    );
  }

  private static makeResponse(
    ctx: Context,
    body: Return,
    options: { status: number } = { status: 200 }
  ) {
    if (typeof body === 'string') {
      return new Response(body, {
        status: options.status,
        headers: {
          'content-type': 'text/plain',
          'Access-Control-Allow-Origin': ctx.origin,
          Vary: 'Origin'
        }
      });
    } else if (body instanceof Response) {
      if (!body.headers.get('Access-Control-Allow-Origin')) {
        // Skip options
        body.headers.set('Access-Control-Allow-Origin', ctx.origin);
        body.headers.set('Vary', 'Origin');
      }
      return body;
    } else {
      return new Response(JSON.stringify(body), {
        status: options.status,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': ctx.origin,
          Vary: 'Origin'
        }
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
