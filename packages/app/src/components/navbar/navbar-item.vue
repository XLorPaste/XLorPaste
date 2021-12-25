<template>
  <component
    :is="tag"
    class="navbar-item flex select-none cursor-pointer rounded px-[0.75rem] py-[0.5rem] hover:(bg-gray-100 text-blue-500)"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
defineProps({
  tag: {
    type: String,
    default: 'a'
  }
});
</script>

<style>
.navbar-item {
  color: var(--text-light-1);
}
</style>
