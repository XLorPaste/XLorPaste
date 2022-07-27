<script setup lang="ts">
import type { Submission } from 'xlorpaste';

import NProgress from 'nprogress';

import { list } from '~/logic/client';
import { preSetup } from '~/logic/highlight';

import { AdminBox } from '~/components/codebox';

const subs = ref<Submission[]>([]);
const page = ref(0);
const pageSize = 10;

const placeholder = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | undefined = undefined;
watch(placeholder, (placeholder) => {
  if (placeholder) {
    observer = new IntersectionObserver(([dom]) => {
      if (dom?.isIntersecting) {
        if ((page.value + 1) * pageSize === subs.value.length) {
          page.value++;
        }
      }
    }, {});
    observer.observe(placeholder);
  }
});
onUnmounted(() => {
  observer?.disconnect();
});

watchEffect(async () => {
  NProgress.start();
  // Collect page as dep, avoid async call
  const curPage = page.value;
  await preSetup();
  subs.value.push(...(await list(curPage * pageSize, pageSize)));
  NProgress.done();
});
</script>

<route>
{
  name: 'Admin',
  meta: {
    title: '管理'
  }
}
</route>

<template>
  <div>
    <h2>所有代码</h2>
    <admin-box v-for="(sub, index) in subs" :key="index" :sub="sub" class="mt-4"></admin-box>
    <div v-if="subs.length > 0" class="relative">
      <div ref="placeholder" class="absolute top-[-18rem]"></div>
    </div>
  </div>
</template>
