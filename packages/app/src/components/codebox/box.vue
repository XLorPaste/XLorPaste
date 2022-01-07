<script setup lang="ts">
import { toRefs, ref } from 'vue';
import { Submission } from 'xlorpaste';
import { highlight } from '../../logic/highlight';

const props = defineProps<{ sub: Submission }>();
const { sub } = toRefs(props);

const code = ref('');
highlight(sub.value.lang, sub.value.body).then((html) => (code.value = html));
</script>

<template>
  <div class="code-box rounded-lg" v-if="code.length > 0">
    <div class="px-4 py-4 font-mono" style="border-bottom: 1px solid rgb(235, 238, 245)">
      <span>Token: {{ sub.token }}</span>
    </div>
    <div class="px-2 py-4" v-html="code"></div>
  </div>
</template>

<style>
.code-box {
  border: 1px solid rgb(235, 238, 245);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.shiki {
  margin: 0;
}

.shiki code {
  counter-reset: step;
  counter-increment: step 0;
}

.shiki code .line::before {
  content: counter(step);
  counter-increment: step;
  width: 1rem;
  margin-right: 1rem;
  display: inline-block;
  text-align: right;
  color: rgba(115, 138, 148, 0.4);
}
</style>
