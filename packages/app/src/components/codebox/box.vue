<script setup lang="ts">
import { toRefs, ref, watch, computed } from 'vue';
import { FetchSubmission } from 'xlorpaste';
import { highlight } from '../../logic/highlight';

const props = defineProps<{ sub: FetchSubmission; footer?: boolean }>();
const { sub } = toRefs(props);

const code = ref('');

watch(
  sub,
  (sub) => {
    highlight(sub.lang, sub.body).then((html) => (code.value = html));
  },
  { immediate: true }
);

const copy = async () => {
  await navigator.clipboard.writeText(sub.value.body);
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
    <div
      class="px-4 py-4 <md:px-2 font-mono flex justify-between items-center"
      style="border-bottom: 1px solid rgb(235, 238, 245)"
    >
      <div class="<md:text-sm">
        <span :class="[sub.lang !== 'md' ? 'ml-token' : 'ml-md', '<md:text-xs']"></span>
        <span class="font-bold">Token </span>
        <router-link :to="{ name: 'View', params: { token: sub.token } }">{{
          sub.token
        }}</router-link>
        <span class="font-bold ml-4">语言 </span>
        <span>{{ sub.lang }}</span>
      </div>
      <div><a class="px-2 py-2 cursor-pointer" @click="copy">复制</a></div>
    </div>

    <div class="px-4 py-4 overflow-x-auto <md:text-xs <md:p-2" v-html="code"></div>

    <div
      v-if="footer"
      class="p-4 font-mono flex justify-between items-center"
      style="border-top: 1px solid rgb(235, 238, 245)"
    >
      <div :class="[sub.lang !== 'md' ? 'ml-token' : 'ml-md', '<md:text-xs']">
        <slot name="footer"></slot>
      </div>
    </div>

    <div class="hidden-measure font-mono <md:text-xs" ref="measure">{{ line + 1 }}</div>
  </div>
</template>

<style>
.code-box {
  border: 1px solid rgb(235, 238, 245);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  tab-size: 2;
}

.shiki {
  margin: 0;
  background-color: white !important;
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
