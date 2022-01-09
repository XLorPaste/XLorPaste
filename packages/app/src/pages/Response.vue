<script setup lang="ts">
import { toRefs } from 'vue';
import { Submission } from 'xlorpaste';

const props = defineProps<{ sub: Submission }>();
const { sub } = toRefs(props);
</script>

<template>
  <p>
    <span class="font-bold">Token </span>
    <router-link :to="{ name: 'View', params: { token: sub.token } }">{{ sub.token }}</router-link>
  </p>
</template>
