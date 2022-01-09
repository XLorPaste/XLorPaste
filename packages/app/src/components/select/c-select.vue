<script setup lang="ts">
defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const handleSelect = (event: any) => {
  emit('update:modelValue', event.target.value);
};
</script>

<template>
  <div class="select relative">
    <select
      @change="handleSelect"
      class="pl-2 pr-8 py-2 cursor-pointer block w-full outline-none rounded border border-1 border-[#dbdbdb] appearance-none"
    >
      <slot></slot>
    </select>
  </div>
</template>
