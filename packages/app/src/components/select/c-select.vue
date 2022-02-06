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
      class="pl-2 pr-8 py-2 cursor-pointer block w-full rounded border border-1 border-[#dbdbdb]"
    >
      <slot></slot>
    </select>
  </div>
</template>

<style>
select {
  appearance: none;
  padding: 0.75rem 1rem;
  vertical-align: middle;
  color: var(--text-light-1);
  font-weight: normal;
  background-color: transparent;
  outline: none;
}

select::-ms-expand {
  border: 0;
  background-color: transparent;
}
</style>
