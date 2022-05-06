import type { NitroErrorHandler } from 'nitropack';

export default <NitroErrorHandler>function (error, event) {
  event.res.setHeader('content-type', 'application/json');
  event.res.end(
    JSON.stringify({
      status: 'FAILED',
      message: error.message ?? 'Unknown Error'
    })
  );
};
