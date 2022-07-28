import { FetchSubmission } from './types';
import { dim, bold } from 'kolorist';

export function printSubmission(sub: FetchSubmission, option = { raw: true }) {
  if (!option.raw && process.stdout.isTTY && typeof process.stdout.getWindowSize === 'function') {
    prettyPrint(sub);
  } else {
    console.log(sub.body);
  }
}

function prettyPrint(sub: FetchSubmission) {
  const size = process.stdout.getWindowSize();

  const lines = sub.body.split(/\r\n|\n\r|\n|\r/);
  const lineCount = lines.length;
  const prefixCount = Math.ceil(Math.log10(lineCount));

  const Lwidth = prefixCount + 2;
  const Rwidth = size[0] - Lwidth - 1;
  const print = (
    prefix: (len: number) => void,
    split: string,
    suffix: (len: number) => void,
    color?: (text: string) => string
  ) => {
    const text = [prefix(Lwidth), split, suffix(Rwidth)].join('');
    if (color) {
      console.log(color(text));
    } else {
      console.log(text);
    }
  };

  print(
    (len) => '─'.repeat(len),
    '┬',
    (len) => '─'.repeat(len),
    dim
  );
  print(
    (len) => ' '.repeat(len),
    dim('│'),
    () => ` Token: ${bold(sub.token)}.${sub.lang}`
  );
  print(
    (len) => '─'.repeat(len),
    '┼',
    (len) => '─'.repeat(len),
    dim
  );

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const width = Rwidth - 1;
    print(
      (len) => dim(String(i + 1).padStart(len - 1) + ' '),
      dim('│'),
      () => ' ' + line.slice(0, width)
    );
    for (let i = width; i < line.length; i += width) {
      print(
        (len) => ' '.repeat(len),
        dim('│'),
        () => ' ' + line.slice(i, i + width)
      );
    }
  }

  print(
    (len) => '─'.repeat(len),
    '┴',
    (len) => '─'.repeat(len),
    dim
  );
}
