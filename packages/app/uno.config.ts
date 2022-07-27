import type { RuleContext } from '@unocss/core';
import type { Theme } from '@unocss/preset-uno';

import {
  defineConfig,
  presetUno,
  presetIcons,
  presetAttributify,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';
import { parseColor } from '@unocss/preset-mini/utils';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  rules: [
    [
      /^c-(.*)$/,
      ([, body]: string[], { theme }) => {
        const color = parseColor(body, theme);
        if (color?.cssColor?.type === 'rgb' && color.cssColor.components) {
          return {
            '--ui-c-context': `${color.cssColor.components.join(',')}`
          };
        }
      }
    ],
    [
      'c-disabled',
      {
        opacity: 0.4,
        'pointer-events': 'none',
        filter: 'saturate(0)'
      }
    ]
  ],
  variants: [
    (input: string) => {
      const prefix = 'c-disabled:';
      if (input.startsWith(prefix)) {
        return {
          matcher: input.slice(prefix.length),
          selector: (input) => `[disabled] ${input}, ${input}[disabled]`
        };
      }
    },
    (input: string) => {
      const prefix = 'c-checked:';
      if (input.startsWith(prefix)) {
        return {
          matcher: input.slice(prefix.length),
          selector: (input) => `[checked] ${input}, ${input}[checked]`
        };
      }
    }
  ],
  shortcuts: {
    'navbar-flex': 'flex lt-md:flex-col items-stretch min-h-12 relative',
    'bg-base': 'bg-op-50 bg-white dark:bg-[#1a1a1a]',
    'text-base': 'text-$text-light-1 dark:text-$text-dark-1',
    'border-base': 'border-gray/20 dark:border-gray/15',
    'icon-btn': 'op30 hover:op100',

    'c-transition': 'transition-all duration-200',
    'c-focus-base': 'ring-2 ring-context/50',
    'c-active-base': 'ring-3 ring-context/10',

    // checkbox
    'c-checkbox-box':
      'border border-base w-1.1em h-1.1em mr-1 text-white flex flex-none items-center rounded-sm overflow-visible',
    'c-checkbox-box-checked': 'bg-context border-context',
    'c-checkbox-icon': 'i-carbon-checkmark',

    // radio
    'c-radio-box':
      'border border-base w-1.2em h-1.2em mr-1 text-white flex flex-none rounded-full overflow-visible',
    'c-radio-box-checked': 'border-context',
    'c-radio-inner': 'bg-context rounded-1/2 w-0 h-0 m-auto',
    'c-radio-inner-checked': 'w-0.8em h-0.8em'
  },
  theme: {
    colors: {
      context: 'rgba(var(--ui-c-context),%alpha)'
    },
    boxShadow: {
      DEFAULT: '0 0 0 0.125rem rgba(0, 0, 0, 0.1)',
      navbar: '0 2px 0 0 #f5f5f5',
      box: '0 2px 12px 0 rgb(0 0 0 / 10%)',
      success: '0 0 0 0.125em rgb(72 199 142 / 25%)',
      info: '0 0 0 0.125em rgb(32 156 238 / 25%)',
      warning: '0 0 0 0.125em rgb(255 224 138 / 25%)',
      danger: '0 0 0 0.125em rgb(241 70 104 / 25%)'
    },
    breakpoints: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px'
    }
  }
});
