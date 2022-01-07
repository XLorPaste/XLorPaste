<script setup lang="ts">
import { reactive, toRefs, watch, ref, Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Submission } from 'xlorpaste';
import { fetch } from '../logic/client';
import { CodeBox } from '../components/codebox';

const route = useRoute();
const router = useRouter();

const { token } = toRefs(reactive(route.params));
const sub = ref<Submission | null>(null);

watch(
  token as Ref<string>,
  async (token) => {
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
