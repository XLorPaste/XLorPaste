<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import IconGithub from '~icons/mdi/github';
import { Navbar, NavbarItem } from './components/navbar';

const version = __VERSION__;
const router = useRouter();
const searchInput = ref('');

const search = async () => {
  await router.push({ name: 'View', params: { token: searchInput.value } });
  searchInput.value = '';
};
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
            name="search"
            id="search"
            placeholder="代码 Token"
            autocomplete="off"
            class="flex-1 px-2 py-2 rounded-md border-1 border-light-900 outline-none focus:border-blue-300"
            v-model="searchInput"
            @keypress.enter="search"
          />
        </div>
      </NavbarItem>
    </template>
  </Navbar>

  <div class="md:px-10 <md:px-[1.75rem] pt-6 main-view">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>

  <footer class="mt-4 px-1 py-4 text-sm">
    <div class="text-center text-gray-400">
      <div class="flex items-center justify-center font-mono h-4 my-1">
        <a class="text-$text-light-1 inline-block mr-2" href="https://github.com/" target="_blank"
          ><icon-github class="align-middle"></icon-github
        ></a>
        <a
          class="inline-block block"
          :href="`https://github.com/XLorPaste/XLorPaste`"
          target="_blank"
        >
          XLorPaste: {{ version }}</a
        >
      </div>

      <p class="font-mono my-1">
        <a
          href="https://github.com/XLorPaste/XLorPaste/blob/master/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          >MIT</a
        >
        Licensed |
        <a href="https://upptime.xlorpaste.cn/" target="_blank" rel="noopener noreferrer">Status</a>
        |
        <a href="http://www.miitbeian.gov.cn" target="_blank" rel="noopener noreferrer"
          >苏ICP备19000844号</a
        >
      </p>

      <p class="font-mono my-1">
        <span>© 2021 </span>
        <a href="https://github.com/yjl9903" target="_blank">XLor</a>
        <span> All rights reserved</span>
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
