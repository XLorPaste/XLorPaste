<script setup lang="ts">
import type { FetchSubmission } from 'xlorpaste';

import NProgress from 'nprogress';

import { useClient } from '~/logic/client';
import { CodeBox } from '~/components/codebox';

const route = useRoute();
const router = useRouter();

const sub = ref<FetchSubmission | null>(null);

const { fetch } = useClient();

watch(
  () => route.params.token as string,
  async (token: string | null) => {
    try {
      NProgress.start();
      if (!!token) {
        const data = await fetch(token);

        sub.value = data;
      } else {
        throw new Error('token is empty');
      }
    } catch (error) {
      setTimeout(() => router.push({ name: 'Home' }), 0);
    } finally {
      NProgress.done();
    }
  },
  { immediate: true }
);
</script>

<route>
{
  name: 'View',
  meta: {
    title: '代码'
  }
}
</route>

<template>
  <div v-if="!!sub">
    <code-box :sub="sub" />
  </div>
</template>
