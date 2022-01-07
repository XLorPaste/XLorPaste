<script setup lang="ts">
import { ref } from 'vue';
import IconUpload from '~icons/mdi/cloud-upload';
import CButton from '../components/c-button.vue';
import { CSelect } from '../components/select';
import { upload } from '../logic/client';

const body = ref('');
const lang = ref('cpp');
const submit = async () => {
  const sub = await upload(lang.value, body.value);
  console.log(sub);
};
</script>

<template>
  <div>
    <div class="mb-4 flex">
      <div class="inline-flex items-center mr-4">
        <label for="lang" class="font-bold mr-2">语言 </label>
        <c-select name="lang" id="lang">
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
          <option value="json">JSON</option>
        </c-select>
      </div>
      <c-button success @click="submit"><IconUpload class="mr-2" /> 提交</c-button>
    </div>
    <div class="flex mb-4">
      <textarea
        ref="elBody"
        name="area-body"
        id="area-body"
        rows="15"
        class="font-mono text-lg flex-1 border-1 border-light-900 rounded px-3 py-2 outline-none focus:border-blue-300"
        @keydown.tab.prevent="() => {}"
        @keydown.ctrl.enter="submit"
        @keydown.ctrl.s.prevent="submit"
        v-model="body"
      ></textarea>
    </div>
    <div>
      <c-button success @click="submit"><IconUpload class="mr-2" /> 提交</c-button>
    </div>
  </div>
</template>
