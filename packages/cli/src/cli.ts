import { cac } from 'cac';
import { lightRed } from 'kolorist';
import { version } from '../package.json';

const cli = cac('xlorpaste');

cli.command('<token>').action(async () => {});

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
