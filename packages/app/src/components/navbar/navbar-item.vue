<template>
  <component
    :is="tag"
    class="navbar-item text-base dark:text-gray-400 px-[0.75rem] py-[0.5rem]"
    flex="~"
    select-none
    cursor-pointer
    rounded
    hover="bg-gray-100 dark:bg-gray-500"
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
