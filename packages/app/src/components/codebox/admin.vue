<script setup lang="ts">
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import { Submission } from 'xlorpaste';
import CodeBox from './box.vue';

const props = defineProps<{ sub: Submission }>();

const timestamp = format(parseISO(props.sub.timestamp), 'yyyy-MM-dd HH:mm:ss');

const copyDelete = async () => {
  await window.navigator.clipboard.writeText(props.sub.delete);
};
</script>

<template>
  <code-box :sub="sub" footer>
    <template #footer>
      <div>
        <div><span class="font-bold">创建时间</span> {{ timestamp }}</div>
        <div>
          <span class="font-bold">删除</span>
          <span class="text-brand cursor-pointer" @click="copyDelete">{{ sub.delete }}</span>
        </div>
      </div>
    </template>
  </code-box>
</template>
