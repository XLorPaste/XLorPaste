<script setup lang="ts">
import { ref } from 'vue';
import IconGithub from '~icons/mdi/github';
import { Navbar, NavbarItem } from './components/navbar';

const searchInput = ref('');

const version = __VERSION__;
</script>

<template>
  <Navbar>
    <template #brand>
      <NavbarItem tag="router-link" :to="{ name: 'Home' }" class="font-mono font-bold text-xl"
        >XLorPaste</NavbarItem
      >
    </template>
    <template #start>
      <NavbarItem>
        <div class="flex relative font-mono <md:w-full">
          <input
            type="text"
            name="contest_search"
            id="contest_search"
            placeholder="代码 Token"
            class="flex-1 text-lg px-2 py-1 outline-none rounded-md border-1 border-light-900 focus:(border-blue-300)"
            v-model="searchInput"
          />
        </div>
      </NavbarItem>
    </template>
  </Navbar>

  <div class="md:px-8 <md:px-4 py-4 main-view">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>

  <footer class="px-1 py-6">
    <div class="text-center text-gray-400">
      <div class="flex items-center justify-center my-2 font-mono">
        <div class="mr-2">
          <a class="text-$text-light-1" href="https://github.com/" target="_blank"
            ><icon-github class="align-middle"></icon-github
          ></a>
        </div>
        <div>
          <a
            class="block text-left"
            :href="`https://github.com/XLorPaste/XLorPaste`"
            target="_blank"
          >
            XLorPaste: {{ version }}</a
          >
        </div>
      </div>

      <p class="mt-2 font-mono">
        <a href="https://github.com/XLorPaste/XLorPaste/blob/master/LICENSE" target="_blank">MIT</a>
        Licensed | Copyright © 2021
        <a href="https://xlor.cn" target="_blank">XLor</a>
      </p>
    </div>
  </footer>
</template>

<style>
@media (min-width: 768px) {
  html,
  body,
  #app {
    height: 100%;
    min-height: 100%;
  }
  .main-view {
    min-height: calc(100% - 14rem);
  }
}

.fade-enter-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from {
  opacity: 0;
}
</style>
