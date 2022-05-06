<script setup lang="ts">
import { ref } from 'vue';
import { Submission } from 'xlorpaste';
import NProgress from 'nprogress';
import { AdminBox } from '../../components/codebox';
import { list } from '../../logic/client';
import { preSetup } from '../../logic/highlight';

const subs = ref<Submission[]>([]);

NProgress.start();
Promise.all([list(), preSetup()]).then(([result]) => {
  subs.value.push(...result);
  NProgress.done();
});
</script>

<template>
  <h2>所有代码</h2>
  <admin-box v-for="(sub, index) in subs" :key="index" :sub="sub" class="mt-4"></admin-box>
</template>
