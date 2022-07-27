import * as wastyle from 'wastyle';
import astyleBinaryUrl from 'wastyle/dist/astyle.wasm?url';

import { CodeLanguageType } from '~/constant';

export const init = (async () => {
  try {
    await wastyle.init(astyleBinaryUrl);
  } catch (e) {
    console.error(`Failed to load code formatter:`, e);
  }
})();

export const DefaultOptions = [
  'style=java',
  'attach-namespaces',
  'attach-classes',
  'attach-inlines',
  'attach-extern-c',
  'attach-closing-while',
  'indent-col1-comments',
  'indent=spaces=2',
  'break-blocks',
  'pad-oper',
  'pad-comma',
  'pad-header',
  'unpad-paren',
  'align-pointer=name',
  'break-one-line-headers',
  'attach-return-type',
  'attach-return-type-decl',
  'convert-tabs',
  'close-templates',
  'max-code-length=100',
  'break-after-logical'
];

const SupportLanguage = {
  cpp: 'c',
  c: 'c',
  java: 'java'
};

export async function format(
  code: string,
  language: CodeLanguageType,
  options: string[] = DefaultOptions
): Promise<string> {
  if (language in SupportLanguage) {
    await init;

    const [success, result] = wastyle.format(
      code,
      `${options.join(' ').trim()} mode=${
        SupportLanguage[language as keyof typeof SupportLanguage]
      }`
    );

    if (!success) {
      console.error('Failed to format code');
      console.log(result);
      return code;
    }

    // The space in "#include <file>"
    return result.replace(/^#(include|import)[\t ]*(<|")/gm, (match, p1, p2) => `#${p1} ${p2}`);
  } else {
    return code;
  }
}
