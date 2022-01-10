import { cac } from 'cac';
import { green, lightRed } from 'kolorist';
import { version } from '../package.json';
import { client } from './client';

const cli = cac('xlorpaste');

const xlorpaste = client();

cli.command('<token>').action(async (token: string) => {
  const sub = await xlorpaste.fetch(token);
  console.log(sub.body);
});

cli.command('up [file]').action(async () => {});

cli.command('rm <token>').action(async (token: string) => {
  const ok = await xlorpaste.remove(token);
  if (ok) {
    console.log(green('OK'));
  } else {
    console.log(lightRed('Fail'));
  }
});

cli.help();

cli.version(version);

async function bootstrap() {
  try {
    cli.parse(process.argv, { run: false });
    await cli.runMatchedCommand();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(lightRed('Error: ') + error.message);
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

bootstrap();
