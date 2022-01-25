import { cac } from 'cac';
import { green, lightBlue, lightRed } from 'kolorist';

import { version } from '../package.json';
import { CliOption } from './types';
import { client } from './client';
import { printSubmission } from './print';
import { getExt, readCode } from './upload';

const cli = cac('xlorpaste');

const xlorpaste = client();

cli
  .command('<token>')
  .option('--raw, -r', 'Display raw code')
  .action(async (token: string, option: CliOption) => {
    const sub = await xlorpaste.fetch(token);
    printSubmission(sub, option);
  });

cli
  .command('up [file]')
  .option('-l, --lang, --language <language>', 'Language')
  .action(async (file: string | undefined, { language }: { language?: string }) => {
    const body = await readCode(file);
    const sub = await xlorpaste.upload(language ?? getExt(file), body);
    console.log(`Link   ${lightBlue(`https://xlorpaste.cn/view/${sub.token}`)}`);
    console.log(`Token  ${green(sub.token)}`);
    console.log(`Delete ${lightRed(sub.delete)}`);
  });

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
