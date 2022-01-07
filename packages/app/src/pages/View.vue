<script setup lang="ts">
import { reactive, toRefs, watch, Ref } from 'vue';
import { useRoute } from 'vue-router';
import { fetch } from '../logic/client';

const route = useRoute();
const { token } = toRefs(reactive(route.params));

watch(
  token as Ref<string>,
  async (token) => {
    const sub = await fetch(token);
    console.log(sub);
  },
  { immediate: true }
);
</script>

<template>
  {{ token }}
</template>
