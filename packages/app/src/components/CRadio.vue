<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    disabled?: boolean;
    name?: string;
    value?: string;
  }>(),
  {
    modelValue: '',
    disabled: false
  }
);
const emit = defineEmits<{ (...args: any): void }>();
const model = useVModel(props, 'modelValue', emit, { passive: true });
</script>

<template>
  <label
    class="c-radio inline-flex items-center select-none cursor-pointer hover:c-radio-hover c-disabled:c-disabled"
    :checked="model === value || null"
    :disabled="disabled || null"
  >
    <input
      v-model="model"
      type="radio"
      class="absolute op0 peer"
      :disabled="disabled"
      :name="name"
      :value="value"
      @keypress.enter="model = value ?? ''"
    />
    <span
      class="c-transition c-radio-box c-checked:c-radio-box-checked peer-active:c-active-base peer-focus-visible:c-focus-base"
    >
      <div class="c-transition c-radio-inner c-checked:c-radio-inner-checked" />
    </span>
    <span><slot /></span>
  </label>
</template>
