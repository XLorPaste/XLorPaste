<script setup lang="ts">
import type { UploadResponse } from 'xlorpaste';

import Qrcode from '@chenfengyuan/vue-qrcode';

import CButton from '~/components/c-button.vue';

const props = defineProps<{ sub: UploadResponse }>();
const { sub } = toRefs(props);

const tokenURL = window.origin + '/' + sub.value.token;

const copyToken = async () => {
  await window.navigator.clipboard.writeText(sub.value.token);
};
const copyURL = async () => {
  await window.navigator.clipboard.writeText(tokenURL);
};
const copyDelete = async () => {
  await window.navigator.clipboard.writeText(sub.value.delete);
};

const showQrcode = ref(false);
</script>

<template>
  <div class="rounded bg-light-400 p-8">
    <h2 mb4>上传成功</h2>
    <p mb4>
      <span>您分享的代码 </span>
      <span class="font-bold font-mono">Token</span>
      <span> 是 </span>
      <router-link class="font-mono" :to="{ name: 'View', params: { token: sub.token } }">{{
        sub.token
      }}</router-link>
      <span>.</span>
    </p>
    <p mb4>您现在可以</p>
    <ul list-initial pl6 mb4>
      <li>
        <span
          >在导航栏输入 <span class="font-bold font-mono">Token </span>
          <span class="text-brand font-mono">{{ sub.token }}</span></span
        >
        <c-button padding="px-2 py-1" class="md:ml-2 text-xs" success @click="copyToken"
          >复制 Token</c-button
        >
      </li>
      <li>
        <span
          >访问代码链接
          <a class="font-mono" :href="tokenURL" target="_blank">{{ tokenURL }}</a></span
        >
        <c-button padding="px-2 py-1" class="md:ml-2 text-xs" success @click="copyURL"
          >复制链接</c-button
        >
      </li>
      <li>
        <div class="cursor-pointer text-brand select-none" @click="showQrcode = !showQrcode">
          生成二维码
        </div>
        <qrcode
          v-show="showQrcode"
          class="mt-2"
          :value="tokenURL"
          :options="{ width: 120 }"
        ></qrcode>
      </li>
    </ul>
    <p class="mb4 flex items-center">
      <span i-mdi-alert class="text-red-500" />
      <span class="ml-2"
        >您也可以使用
        <span class="text-brand font-mono cursor-pointer" @click="copyDelete">{{
          sub.delete
        }}</span>
        删除这份代码.</span
      >
    </p>
    <slot></slot>
  </div>
</template>
