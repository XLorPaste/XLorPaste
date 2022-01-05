<script setup lang="ts">
import { ref } from 'vue';

const body = ref('');
const handleTab = () => {};
</script>

<template>
  <div class="flex">
    <textarea
      ref="elBody"
      name="area-body"
      id="area-body"
      rows="15"
      class="font-mono text-lg flex-1 rounded p-2 outline-none focus:border-blue-300"
      @keydown.tab.prevent="handleTab"
      v-model="body"
    ></textarea>
  </div>
</template>
