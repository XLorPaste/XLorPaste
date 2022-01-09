<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Submission } from 'xlorpaste';
import { fetch } from '../logic/client';
import { CodeBox } from '../components/codebox';

const route = useRoute();
const router = useRouter();

const sub = ref<Submission | null>(null);

watch(
  () => route.params.token as string,
  async (token: string) => {
    try {
      const data = await fetch(token);
      sub.value = data;
    } catch (error) {
      setTimeout(() => router.push({ name: 'Home' }), 3000);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div v-if="!!sub">
    <code-box :sub="sub" />
  </div>
</template>
