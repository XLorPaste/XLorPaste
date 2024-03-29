<script setup lang="ts">
import type { Ref } from 'vue';
import type { FetchSubmission } from 'xlorpaste';

import { useClient } from '~/logic/client';
import { CodeLanguageType } from '~/constant';
import { GlobalSettingsKey } from '~/composables';

const props = defineProps<{ sub: FetchSubmission; footer?: boolean; maxLine?: number }>();
const { sub, maxLine } = toRefs(props);

const GlobalSettings = inject(GlobalSettingsKey)!;

const isDark = inject<Ref<boolean>>('vueuse-color-scheme')!;
const [isFormat, toggleFormat] = useToggle(true);
const { format, render } = useClient();

const code = ref('');

watch(
  [sub, isFormat, isDark, GlobalSettings],
  async ([sub, isFormat, isDark]) => {
    const lang = sub.lang as CodeLanguageType;
    if (isFormat) {
      if (lang !== 'md') {
        const formatRender = render(await format(sub.body, lang), lang, isDark);
        code.value = await render(sub.body, lang, isDark);
        nextTick(async () => {
          code.value = await formatRender;
        });
      } else {
        code.value = await render(sub.body, 'md', isDark);
      }
    } else {
      if (lang !== 'md') {
        code.value = await render(sub.body, lang, isDark);
      } else {
        code.value = await render(sub.body, 'text', isDark);
      }
    }
  },
  { immediate: true }
);

const copy = async () => {
  if (isFormat.value) {
    await navigator.clipboard.writeText(
      await format(sub.value.body, sub.value.lang as CodeLanguageType)
    );
  } else {
    await navigator.clipboard.writeText(sub.value.body);
  }
};

const line = computed(() => {
  return sub.value.body.split('\n').length;
});
const measure = ref<HTMLElement | null>(null);
const width = computed(() => {
  if (measure.value) {
    return measure.value.clientWidth + 2 + 'px';
  } else {
    return '1em';
  }
});
</script>

<template>
  <div class="code-box rounded-lg" v-if="code.length > 0">
    <div class="px-4 py-4 lt-md:px-2 font-mono" flex="~" items-center border="b-1 base">
      <div lt-md="text-sm">
        <span :class="[sub.lang !== 'md' ? 'ml-token' : 'ml-md', 'lt-md:text-xs']"></span>
        <span class="font-bold">Token</span>
        <span select-none>&nbsp;</span>
        <router-link :to="{ name: 'View', params: { token: sub.token } }">{{
          sub.token
        }}</router-link>
        <span class="font-bold ml-4">语言</span>
        <span select-none>&nbsp;</span>
        <span>{{ sub.lang }}</span>
      </div>
      <div flex-auto></div>
      <div select-none lt-md="flex-col w-24 text-sm text-right mr2">
        <div md:inline>
          <a class="md:py-2 cursor-pointer" @click="() => toggleFormat()">{{
            sub.lang !== 'md'
              ? isFormat
                ? '显示源文件'
                : '显示格式化代码'
              : isFormat
              ? '显示源文件'
              : '显示渲染'
          }}</a>
        </div>
        <div md:inline>
          <a class="md:mx-4 md:py-2 cursor-pointer" @click="copy">复制</a>
        </div>
      </div>
    </div>

    <div
      :class="['px-4 py-4 overflow-x-auto lt-md:text-xs lt-md:p-2', maxLine && 'max-line']"
      v-html="code"
    ></div>

    <div
      v-if="footer"
      class="p-4 font-mono"
      flex="~"
      justify-between
      items-center
      border="t-1 base"
    >
      <div :class="[sub.lang !== 'md' ? 'ml-token' : 'ml-md', 'lt-md:text-xs']">
        <slot name="footer"></slot>
      </div>
    </div>

    <div class="hidden-measure font-mono lt-md:text-xs" ref="measure">{{ line + 1 }}</div>
  </div>
</template>

<style>
.code-box {
  @apply border-1 border-base shadow-box;
  tab-size: 2;
}

.max-line {
  max-height: calc(v-bind(maxLine) * 1em + 1em);
}

.shiki {
  margin: 0;
  background-color: white !important;
}

html.dark .shiki {
  background-color: #222 !important;
}

.markdown-body .shiki {
  background-color: var(--color-canvas-subtle) !important;
}

.shiki code {
  counter-reset: step;
  counter-increment: step 0;
}

.shiki code .line {
  height: 1em;
  line-height: 1em;
}

.ml-md {
  margin-left: 1rem;
}

.code-box .markdown-body {
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.ml-token {
  margin-left: calc(v-bind(width) + 0.5em);
}

.shiki code .line::before {
  content: counter(step);
  counter-increment: step;
  height: 1em;
  width: v-bind(width);
  line-height: 1em;
  margin-right: 0.5em;
  display: inline-block;
  text-align: right;
  color: rgba(115, 138, 148, 0.4);
}

@media (min-width: 768px) {
  .ml-token {
    margin-left: calc(v-bind(width) + 1em);
  }
  .shiki code .line::before {
    margin-right: 1em;
  }
}

.hidden-measure {
  position: absolute;
  visibility: hidden;
  height: auto;
  width: auto;
  white-space: nowrap;
}
</style>
