type Return = Object | string | Response;

type Handler = (ctx: Context) => Return | Promise<Return>;

export class Context extends Request {
  query: Record<string, string> = {}

  params: Record<string, string> = {}

  constructor(req: Request) {
    super(req);
  }
}

export class Worker {
  private routes: Route[] = []

  async handle(req: Request): Promise<Response> {
    for (const route of this.routes) {
      const ctx = new Context(req);
      if (route.test(ctx)) {
        const result = await route.handle(ctx);
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
    return new Response(JSON.stringify({
      status: '404',
      message: 'Not Found'
    }), {
      status: 404,
      headers: { 'content-type': 'application/json' },
    });
  }

  get(url: string, handler: Handler) {
    const get = (req: Request) => req.method === 'GET'
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
      return `(?<${text.slice(1)}>[a-zA-Z0-9_]+)`
    })
    const reg = new RegExp(`^${pat}$`);

    return (ctx: Context) => {
      const url = new URL(ctx.url);
      const path = url.pathname;
      const result = reg.exec(path);
      if (result !== null && result[0] === path) {
        if (!!result.groups) {
          ctx.params = { ...result.groups }
        }
        for (const key of url.searchParams.keys()) {
          ctx.query[key] = url.searchParams.get(key) ?? '';
        }
        return true;
      } else {
        return false;
      }
    }
  }

  test(ctx: Context) {
    return this.conditions.every(cond => cond(ctx));
  }

  handle(ctx: Context) {
    return this.handler(ctx);
  }
}
