<script setup lang="ts">
import Readme from '~README.md';
import 'github-markdown-css';
</script>

<route>
{
  name: 'Help',
  meta: {
    title: '帮助'
  }
}
</route>

<template>
  <div>
    <Readme />
  </div>
</template>
