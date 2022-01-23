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
        <div><span class="font-bold">创建时间 </span>{{ timestamp }}</div>
        <div>
          <span class="font-bold">删除 </span>
          <span class="text-brand cursor-pointer" @click="copyDelete">{{ sub.delete }}</span>
        </div>
        <div v-if="sub.author">
          <span v-if="sub.author.ip">
            <span class="font-bold">IP </span>
            <a :href="`https://ip.tool.chinaz.com/${sub.author.ip}`" target="_blank">{{
              sub.author.ip
            }}</a>
          </span>
          <span v-if="sub.author.latitude && sub.author.longitude">
            <span class="font-bold"> 位置 </span>
            <a
              :href="`https://uri.amap.com/marker?position=${sub.author.longitude},${sub.author.latitude}`"
              target="_blank"
              >{{ sub.author.longitude }}, {{ sub.author.latitude }}</a
            >
          </span>
        </div>
      </div>
    </template>
  </code-box>
</template>
