<script setup lang="ts">
import type { UploadResponse } from 'xlorpaste';

import { upload } from '~/logic/client';
import { CSelect } from '~/components/select';

import CButton from '~/components/c-button.vue';

import Response from './components/Response.vue';

const body = ref('');
const lang = ref('cpp');
const sub = ref<UploadResponse | null>(null);
const submit = async () => {
  if (body.value.length === 0) {
    // Cannot submit empty code
    return;
  }
  const data = await upload(lang.value, body.value);
  sub.value = data;
  body.value = '';
};

const rows =
  window.innerWidth >= 768
    ? Math.max(10, Math.floor((window.innerHeight - 320) / 16 / window.devicePixelRatio))
    : 10;
</script>

<route>
{
  name: 'Home',
  meta: {
    title: '上传'
  }
}
</route>

<template>
  <div v-if="!sub">
    <div class="mb-4 flex">
      <div class="inline-flex items-center mr-4">
        <label for="lang" class="font-bold mr-2">语言 </label>
        <c-select name="lang" id="lang" v-model="lang">
          <option value="text">纯文本</option>
          <option value="cpp" selected>C++</option>
          <option value="md">Markdown</option>
          <option value="c">C</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="json">JSON</option>
          <option value="yaml">Yaml</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </c-select>
      </div>
      <c-button success @click="submit"><span i-mdi-cloud-upload class="mr-2" />上传</c-button>
    </div>
    <div class="flex mb-4">
      <textarea
        ref="elBody"
        name="area-body"
        id="area-body"
        :rows="rows"
        class="font-mono text-base flex-1 border-1 border-light-900 rounded px-3 py-2 outline-none focus:border-blue-300"
        @keydown.tab.prevent="() => {}"
        @keydown.ctrl.enter="submit"
        @keydown.ctrl.s.prevent="submit"
        v-model="body"
        autofocus
      ></textarea>
    </div>
    <div>
      <c-button success @click="submit"><span i-mdi-cloud-upload class="mr-2" />上传</c-button>
    </div>
  </div>
  <div v-else>
    <Response :sub="sub">
      <c-button @click="sub = null" info>返回</c-button>
    </Response>
  </div>
</template>
