<template>
  <nav class="py-2 md:px-8 lt-md:px-4 navbar-flex navbar">
    <div class="navbar-brand navbar-flex items-center bg-transparent cursor-pointer">
      <slot name="brand"></slot>
    </div>
    <div class="navbar-menu navbar-flex flex-1 lt-md:w-full">
      <div class="navbar-start justify-start items-center md:mr-auto lt-md:w-full">
        <slot name="start"></slot>
        <slot></slot>
      </div>
      <div class="lt-md:hidden navbar-end navbar-flex justify-end items-center ml-auto">
        <slot name="end"></slot>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>

<style>
.navbar {
  box-shadow: 0 2px 0 0 #f5f5f5;
}
</style>
