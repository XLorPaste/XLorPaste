<script setup lang="ts">
import { toRefs, ref } from 'vue';
import { Submission } from 'xlorpaste';
import { highlight } from '../../logic/highlight';
import CButton from '../c-button.vue';

const props = defineProps<{ sub: Submission }>();
const { sub } = toRefs(props);

const line = sub.value.body.split('\n').length;
const width = Math.round(Math.log10(line)) + 'rem';
const code = ref('');
highlight(sub.value.lang, sub.value.body).then((html) => (code.value = html));

const copy = async () => {
  await navigator.clipboard.writeText(sub.value.body);
};
</script>

<template>
  <div class="code-box rounded-lg" v-if="code.length > 0">
    <div
      class="px-4 py-4 font-mono flex justify-between items-center"
      style="border-bottom: 1px solid rgb(235, 238, 245)"
    >
      <div class="inline-block">Token: {{ sub.token }}</div>
      <div><c-button padding="px-2 py-2" info @click="copy">复制</c-button></div>
    </div>
    <div class="px-4 py-4 overflow-x-auto" v-html="code"></div>
  </div>
</template>

<style>
.code-box {
  border: 1px solid rgb(235, 238, 245);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.shiki {
  margin: 0;
  background-color: white !important;
}

.shiki code {
  counter-reset: step;
  counter-increment: step 0;
}

.shiki code .line::before {
  content: counter(step);
  counter-increment: step;
  width: v-bind(width);
  margin-right: 1rem;
  display: inline-block;
  text-align: right;
  color: rgba(115, 138, 148, 0.4);
}
</style>
