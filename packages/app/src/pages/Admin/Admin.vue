<script setup lang="ts">
import { ref } from 'vue';
import { Submission } from 'xlorpaste';
import { AdminBox } from '../../components/codebox';
import { list } from '../../logic/client';
import { preSetup } from '../../logic/highlight';

const subs = ref<Submission[]>([]);

Promise.all([list(), preSetup()]).then(([result]) => subs.value.push(...result));
</script>

<template>
  <h2>所有代码</h2>
  <admin-box v-for="(sub, index) in subs" :key="index" :sub="sub" class="mt-4"></admin-box>
</template>
