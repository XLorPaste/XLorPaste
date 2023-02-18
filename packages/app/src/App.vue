<script setup lang="ts">
import { version } from '~build/package';
import { abbreviatedSha } from '~build/info';

import { getAdminKey } from './logic/admin';
import CRadio from './components/CRadio.vue';
import { Navbar, NavbarItem } from './components/navbar';
import { GlobalSettingsKey } from './composables';

const router = useRouter();
const searchInput = ref('');

const isDark = useDark();
provide('vueuse-color-scheme', isDark);
const toggleDark = useToggle(isDark);

const search = async () => {
  if (searchInput.value === '') return;
  await router.push({ name: 'View', params: { token: searchInput.value.trim() } });
  searchInput.value = '';
};

const settings = reactive({ tabwidth: '2' });
const GlobalSettings = useLocalStorage('global-settings', settings);
const tabwidth = ref(GlobalSettings.value.tabwidth);
watch(tabwidth, (tabwidth) => {
  // Why this is shallowRef?
  GlobalSettings.value = { tabwidth };
});
provide(GlobalSettingsKey, GlobalSettings);
</script>

<template>
  <Navbar>
    <template #brand>
      <NavbarItem
        tag="router-link"
        :to="{ name: 'Home' }"
        font-mono
        font-bold
        text-xl
        class="text-$text-light-1"
        >XLorPaste</NavbarItem
      >
    </template>
    <template #start>
      <NavbarItem>
        <div class="flex relative font-mono lt-md:w-full">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="代码 Token"
            autocomplete="off"
            class="px-2 py-2 text-xs text-base focus-border-blue-300"
            rounded-md
            outline-none
            flex="1"
            border="1 base"
            v-model="searchInput"
            @keypress.enter="search"
          />
        </div>
      </NavbarItem>
    </template>
    <template #end>
      <span class="nav-btn" relative>
        <span icon-btn i-carbon-settings lt-md:text-sm text-base cursor-pointer></span>
        <div
          class="nav-dropdown"
          hidden
          absolute
          top="1.5rem"
          right="-13"
          lt-md:right="-400%"
          w60
          h="200px"
          pt2
          p4
          z-20
        >
          <div rounded-2 bg-base bg-op-100 border="1 base" w-full h-full p4>
            <div pb2 mb2 font-bold border="b-1 base" select-none>
              <p flex="~ gap1" items-center><span i-carbon-settings></span>设置</p>
            </div>
            <div font-mono>
              <div>
                <div font-bold mb1>Tab 宽度</div>
                <div flex="~ gap2" items-center>
                  <c-radio name="tabwidth" v-model="tabwidth" value="2" c="green-600 dark:green-300"
                    >2个</c-radio
                  >
                  <c-radio name="tabwidth" v-model="tabwidth" value="4" c="green-600 dark:green-300"
                    >4个</c-radio
                  >
                  <span select-none>空格</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </span>
      <span>
        <button
          icon-btn
          i-carbon-sun
          dark:i-carbon-moon
          lt-md:text-sm
          text-base
          @click="toggleDark()"
        />
      </span>
    </template>
  </Navbar>

  <div class="md:px-10 lt-md:px-[1.75rem] pt-6 main-view">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>

  <footer class="mt-4 px-1 py-4 text-sm">
    <div class="text-center text-gray-400">
      <div class="flex justify-center font-mono h-4 my-1">
        <a
          v-if="!abbreviatedSha"
          class="inline-block"
          :href="`https://github.com/XLorPaste/XLorPaste`"
          target="_blank"
          flex="~"
          items-center
        >
          <span i-mdi-github mr1 class="text-black dark:text-white"></span>
          <span>XLorPaste: {{ version }}</span>
        </a>
        <a
          v-else
          class="inline-block"
          :href="`https://github.com/XLorPaste/XLorPaste/tree/${abbreviatedSha}`"
          target="_blank"
          flex="~"
          items-center
        >
          <span i-mdi-github mr1 class="text-black dark:text-white"></span>
          <span>XLorPaste: {{ abbreviatedSha }}</span>
        </a>
      </div>

      <p class="font-mono my-1">
        <span v-if="getAdminKey()"><router-link :to="{ name: 'Admin' }">管理</router-link> | </span>
        <router-link :to="{ name: 'Help' }">帮助</router-link> |
        <a href="https://upptime.xlorpaste.cn/" target="_blank" rel="noopener noreferrer">状态</a>
        |
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer"
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

/* @media (min-width: 1024px) {
  } */
.nav-btn:hover .nav-dropdown,
.nav-dropdown:hover {
  @apply !block transition;
}
</style>
