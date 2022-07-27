<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    disabled?: boolean;
  }>(),
  {
    modelValue: false,
    disabled: false
  }
);
const emit = defineEmits<{ (...args: any): void }>();
const checked = useVModel(props, 'modelValue', emit, { passive: true });
</script>

<template>
  <label
    class="c-checkbox inline-flex items-center select-none hover:c-checkbox-hover c-disabled:c-disabled"
    :checked="checked || null"
    :disabled="disabled || null"
  >
    <input
      v-model="checked"
      type="checkbox"
      class="absolute op0 peer"
      :disabled="disabled"
      @keypress.enter="checked = !checked"
    />
    <span
      class="c-transition c-checkbox-box c-checked:c-checkbox-box-checked peer-active:c-active-base peer-focus-visible:c-focus-base"
    >
      <div
        class="c-icon c-transition c-checkbox-icon transform scale-0 op0 c-checked:op100 c-checked:scale-100"
      />
    </span>
    <span><slot /></span>
  </label>
</template>
