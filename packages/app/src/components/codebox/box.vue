<script setup lang="ts">
import { toRefs } from 'vue';
import { Submission } from 'xlorpaste';

const props = defineProps<{ sub: Submission }>();
const { sub } = toRefs(props);
</script>

<template>
  <div class="border rounded bg-blue-50">
    <div class="p-2" style="border-bottom: 1px solid black">
      <span>Token: {{ sub.token }}</span>
    </div>
    <div class="p-2">{{ sub.body }}</div>
  </div>
</template>
