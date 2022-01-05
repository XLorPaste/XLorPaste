<template>
  <button
    :class="[
      'button',
      'inline-flex',
      'justify-center',
      'items-center',
      'rounded',
      'border',
      'border-1',
      'border-[#dbdbdb]',
      'outline-none',
      'cursor-pointer',
      'select-none',
      colorClass,
      padding || 'px-3 py-2'
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue';

const props = defineProps<{
  padding?: string;
  primary?: boolean;
  info?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
}>();

const { primary, info, success, warning, danger } = toRefs(props);

const colorClass = computed(() =>
  primary?.value
    ? 'is-primary'
    : info?.value
    ? 'is-info'
    : success?.value
    ? 'is-success'
    : warning?.value
    ? 'is-warning'
    : danger?.value
    ? 'is-danger'
    : undefined
);
</script>

<style>
.button.is-success,
.button.is-primary {
  color: white;
  border: transparent;
  background-color: #48c78e;
}

.button.is-info {
  color: white;
  border: transparent;
  background-color: #209cee;
}

.button.is-warning {
  border: transparent;
  background-color: #ffe08a;
}

.button.is-danger {
  color: white;
  border: transparent;
  background-color: #f14668;
}
</style>
